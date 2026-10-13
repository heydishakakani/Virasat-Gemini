import 'dotenv/config';
import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(__dirname, '.cache');
const USAGE_FILE = path.join(CACHE_DIR, 'usage.json');
const ANSWERS_FILE = path.join(CACHE_DIR, 'answers.json');

const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const DAILY_LIMIT = Number(process.env.DAILY_LIMIT) || 18;
const MOCK = String(process.env.MOCK_GEMINI).toLowerCase() === 'true';
const API_KEY = process.env.GEMINI_API_KEY;
const MAX_QUESTION_CHARS = 600;
const MAX_ASSETS = 25;

const SYSTEM_PROMPT = `You are Virasat's assistant. Virasat helps Indian families work out what a deceased relative left behind (bank accounts, mutual funds, insurance, property, demat holdings) and whether a nominee is on file for each.
Rules:
- Answer in plain, calm, short language (under 180 words). Use short bullet points for steps.
- Focus on practical next steps: documents typically needed, who to approach (bank branch, AMC/RTA, insurer, sub-registrar), and what a nominee can and cannot do.
- A nominee is generally a trustee/custodian for the legal heirs, not automatically the owner. Say this where relevant.
- You are not a lawyer. For anything contested, high-value or involving a will dispute, tell the user to consult a qualified lawyer.
- Never ask for or repeat account numbers, PAN, Aadhaar or passwords.
- If asked about something unrelated to estates, assets or nominees, politely say you can only help with that.`;

fs.mkdirSync(CACHE_DIR, { recursive: true });

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}
function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
const today = () => new Date().toISOString().slice(0, 10);

function getUsage() {
  const u = readJson(USAGE_FILE, { date: today(), count: 0 });
  if (u.date !== today()) return { date: today(), count: 0 };
  return u;
}
function bumpUsage() {
  const u = getUsage();
  u.count += 1;
  writeJson(USAGE_FILE, u);
  return u;
}

function mockAnswer(question) {
  return `[mock mode - no Gemini call made]\nYou asked: "${question.slice(0, 80)}"\n- Gather the death certificate and your ID.\n- Visit each institution with the nominee form.\n- Where no nominee is on file, expect a legal-heir certificate or succession certificate.\nSet MOCK_GEMINI=false in .env to get real answers.`;
}

async function askGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Gemini returned HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
  if (!text) throw new Error('Gemini returned an empty answer.');
  return text.trim();
}

// Defence in depth: the browser already strips long numbers, but never trust the client.
const NUM_RE = /(?<!\d)\d(?:[\s-]?\d){7,}(?!\d)/g;   // 8+ digits, even if spaced (Aadhaar, phone, account)
const PAN_RE = /\b[A-Z]{5}\d{4}[A-Z]\b/gi;
export const redact = (t) => String(t).replace(NUM_RE, '[number removed]').replace(PAN_RE, '[ID removed]');

function buildPrompt(question, assets) {
  let p = `Question: ${question}`;
  if (assets.length) {
    p += `\n\nThe family's asset list (nominee = yes/no/unknown):\n` +
      assets.map(a => `- ${a.name}: nominee ${a.nominee}`).join('\n');
  }
  return p;
}

const app = express();
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/usage', (_req, res) => {
  const u = getUsage();
  res.json({ used: u.count, limit: DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - u.count), mock: MOCK });
});

app.post('/api/ask', async (req, res) => {
  const question = redact(String(req.body?.question || '').trim());
  const rawAssets = Array.isArray(req.body?.assets) ? req.body.assets.slice(0, MAX_ASSETS) : [];
  const assets = rawAssets
    .map(a => ({
      name: redact(String(a?.name || '').slice(0, 60)),
      nominee: ['yes', 'no', 'unknown'].includes(a?.nominee) ? a.nominee : 'unknown'
    }))
    .filter(a => a.name);

  if (!question) return res.status(400).json({ error: 'Please type a question.' });
  if (question.length > MAX_QUESTION_CHARS)
    return res.status(400).json({ error: `Please keep it under ${MAX_QUESTION_CHARS} characters.` });

  if (MOCK) return res.json({ answer: mockAnswer(question), cached: false, mock: true, remaining: DAILY_LIMIT - getUsage().count });

  if (!API_KEY || API_KEY === 'your_key_here')
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set. Add it to .env (see .env.example).' });

  const prompt = buildPrompt(question, assets);
  const key = crypto.createHash('sha256').update(MODEL + '\n' + prompt).digest('hex');
  const answers = readJson(ANSWERS_FILE, {});
  if (answers[key]) {
    return res.json({ answer: answers[key], cached: true, remaining: DAILY_LIMIT - getUsage().count });
  }

  const usage = getUsage();
  if (usage.count >= DAILY_LIMIT)
    return res.status(429).json({ error: `Daily AI limit reached (${DAILY_LIMIT}). It resets tomorrow.`, remaining: 0 });

  try {
    const answer = await askGemini(prompt);
    const u = bumpUsage();
    answers[key] = answer;
    writeJson(ANSWERS_FILE, answers);
    res.json({ answer, cached: false, remaining: Math.max(0, DAILY_LIMIT - u.count) });
  } catch (e) {
    if (e.status === 429) {
      // Google says we're over quota: sync local counter so we stop trying.
      writeJson(USAGE_FILE, { date: today(), count: DAILY_LIMIT });
      return res.status(429).json({ error: 'Gemini free-tier quota reached. Try again tomorrow.', remaining: 0 });
    }
    console.error('Gemini error:', e.message);
    res.status(502).json({ error: 'The AI service had a problem. Please try again.' });
  }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`Virasat running at http://localhost:${PORT}`);
    console.log(MOCK ? 'MOCK mode ON - Gemini is not called.' : `Gemini model: ${MODEL}, daily cap: ${DAILY_LIMIT}`);
  });
}
export default app;
