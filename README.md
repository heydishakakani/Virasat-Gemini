# Virasat (Gemini edition)

Virasat prototype: landing page, a three-step search flow, results and asset detail, plus **Virasat AI**, a help panel powered by the Gemini API.
All search results are sample data until a real search service exists.
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

## Where things are

- `public/index.html`: page shell (header, footer, AI panel)
- `public/css/app.css`: colours, type and components (change the look here, top of the file)
- `public/js/app.js`: screens and navigation; `public/js/data.js`: the sample assets
- `public/media/story.mp4`: add your own video here; the "Watch our story" button plays it
- `server.js`: Gemini proxy with the daily cap, answer cache and number redaction

## Open it without a server

`npm run build:standalone` writes `standalone/virasat-landing.html` and `standalone/virasat-guided.html`, single files you can double-click (keep them in the same folder; they link to each other). Every screen works; only the Virasat AI panel needs the server running (`npm start`).

## Two designs

- `/` (`public/index.html`): the Evernote-style landing page, with the Ask Virasat box. Its buttons lead into the guided flow.
- `/guided.html` (`public/guided.html`): the newer guided flow (login, details, search, results, asset detail, Virasat AI).
