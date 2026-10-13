import { test } from 'node:test';
import assert from 'node:assert/strict';

// Tests run in mock mode so they never spend Gemini quota.
process.env.MOCK_GEMINI = 'true';
process.env.GEMINI_API_KEY = 'test-key-not-real';
const { default: app } = await import('../server.js');

let server, base;
test.before(async () => {
  await new Promise(r => { server = app.listen(0, r); });
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

const post = (body) => fetch(base + '/api/ask', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
});

test('usage endpoint reports limit and mock flag', async () => {
  const u = await (await fetch(base + '/api/usage')).json();
  assert.equal(u.mock, true);
  assert.ok(u.limit > 0);
});
test('empty question is rejected', async () => {
  assert.equal((await post({ question: '   ' })).status, 400);
});
test('overlong question is rejected', async () => {
  assert.equal((await post({ question: 'x'.repeat(601) })).status, 400);
});
test('valid question returns a mock answer', async () => {
  const r = await post({ question: 'What is a nominee?', assets: [{ name: 'HDFC savings', nominee: 'yes' }] });
  assert.equal(r.status, 200);
  assert.match((await r.json()).answer, /mock mode/);
});
test('ID-like numbers are redacted before they reach the model', async () => {
  const { redact } = await import('../server.js');
  assert.equal(redact('my aadhaar is 1234 5678 9012 ok'), 'my aadhaar is [number removed] ok');
  assert.equal(redact('PAN ABCDE1234F here'), 'PAN [ID removed] here');
  assert.equal(redact('policy 12 years'), 'policy 12 years');
});
test('the site is served as one page and holds no API key', async () => {
  const html = await (await fetch(base + '/')).text();
  assert.match(html, /Virasat AI/);
  const landing = await (await fetch(base + '/js/landing.js')).text();
  assert.match(landing, /Every asset, checked for a nominee/);
  for (const body of [html, landing]) assert.doesNotMatch(body, /AIza|GEMINI_API_KEY/);
});
