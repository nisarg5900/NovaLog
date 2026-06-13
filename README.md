# Idea Tracker

A single-page idea tracker (cards / table / kanban views, tags, statuses) with cloud sync via Supabase. Works on any device — open the URL, sign in, and your ideas follow you.

## Stack

- **Frontend:** one HTML file (`index.html`), no build step
- **Backend:** Supabase (Postgres + Auth) — free tier is plenty
- **Hosting:** GitHub Pages (free) or any static host

## Setup

### 1. Create a Supabase project

1. Go to https://supabase.com → New project.
2. Project Settings → API: copy the **Project URL** and **anon public** key.
3. SQL editor → New query → paste contents of `schema.sql` → Run.
4. Authentication → Providers: confirm **Email** is enabled. To skip the email confirmation step during testing, turn off "Confirm email" under Authentication → Sign in / Up.

### 2. Configure the app

```bash
cp config.example.js config.js
# edit config.js, paste in your URL + anon key
```

`config.js` is gitignored — it stays on your machine and on the deployed host.

### 3. Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

Sign up with email + password on first run. Your existing seed ideas will be pushed to the cloud on first login.

### 4. Deploy

**GitHub Pages:**
- Repo → Settings → Pages → Source: `main` branch, `/` root → Save.
- Your `config.js` is gitignored, so upload it via the GitHub web UI directly to `main` (or commit it on a deploy branch you don't push elsewhere).
- Visit `https://<you>.github.io/<repo>/`.

The anon key is safe to expose — RLS policies in `schema.sql` ensure each user only sees their own row.

## Data model

The whole app state (`{ideas, tags, statuses, view, dark, …}`) is stored as a single `jsonb` blob per user in the `idea_tracker_state` table. Writes are debounced ~800ms so editing feels instant. Local state is also cached in `localStorage` for fast reloads.
