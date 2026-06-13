# NovaLog

> Where ideas are born.

A quiet workspace for the half-formed ideas, lines you don't want to lose, threads you're still becoming. Tag them, revisit them, sync across every device.

**Live:** https://nisarg5900.github.io/NovaLog/
**App:** https://nisarg5900.github.io/NovaLog/app/

## Stack

- **Frontend:** static HTML/CSS/JS — no build step
- **Backend:** Supabase (Postgres + Auth)
- **Hosting:** GitHub Pages

## Repo layout

```
NovaLog/
├── index.html          ← landing page
├── app/
│   ├── index.html      ← the app itself
│   ├── config.js       ← Supabase URL + anon key (safe to commit)
│   └── config.example.js
├── assets/
│   ├── novalog-icon.svg
│   └── novalog-wordmark.svg
├── schema.sql          ← Postgres schema + RLS + delete_my_account()
└── README.md
```

## Run your own copy

1. Create a Supabase project. Settings → API: copy URL + anon key.
2. SQL editor → paste `schema.sql` → Run.
3. Authentication → Providers: confirm Email is enabled. Optionally enable hCaptcha (Auth → Captcha).
4. Edit `app/config.js` with your URL + anon key.
5. Open `app/index.html` (or serve the folder with `python -m http.server 8000`).

## Why the anon key is in the repo

Supabase anon keys are designed to ship in client code. They identify the project but grant no special access — everything is gated by Row Level Security policies in `schema.sql`. Each user can only read/write their own row in `idea_tracker_state`.

The **service role** key (which bypasses RLS) is never committed and never lives on the client.

## Deploy

GitHub Pages: Settings → Pages → Source: `main` branch, `/` root. Lands on `index.html` (the landing); app lives at `/app/`.
