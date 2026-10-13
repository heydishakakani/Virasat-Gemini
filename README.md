# Virasat (Gemini edition)

Virasat landing page plus an **Ask Virasat** box powered by the Gemini API.
The browser never sees your API key: it calls `POST /api/ask` on the local
Express server, and the server calls Gemini using the key from `.env`.

## Run it

```bash
npm install
cp .env.example .env      # then paste your key from https://aistudio.google.com/apikey
npm run dev               # MOCK mode: UI works, zero Gemini quota used
npm start                 # real Gemini calls
```

Open http://localhost:3000.

## Protecting the free tier (about 20 requests/day)

- `DAILY_LIMIT` (default 18) is a hard cap counted in `.cache/usage.json`.
- Identical questions are answered from `.cache/answers.json` and cost nothing.
- `MOCK_GEMINI=true` (`npm run dev`) returns canned answers. Build and style the UI in this mode.
- `npm test` always runs in mock mode.
- If Google itself returns 429, the server stops calling until the next day.

## Git workflow

- `main` stays stable and only receives verified work.
- New work goes on a branch, e.g. `feature/gemini-integration`, then is merged to `main` after you have tested it.
- `.env` and `.cache/` are git-ignored. Only `.env.example` (no real key) is committed.
- If a key is ever committed by mistake, revoke it in Google AI Studio and create a new one; deleting the commit is not enough.

## Privacy

Using Ask Virasat sends the question and the *names* of listed assets to Google Gemini.
Never type account numbers, PAN or Aadhaar into it. The FAQ on the page says the same.
