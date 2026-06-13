# NovaLog Changelog

All notable changes are listed here. Newest first.

## 2026-06-13 — Visual polish & install banner

- Card layout: date pinned in the head, status pushed to the right so it stays distinct from category tags
- Sync badge: now a single spinning two-arrow icon (no more duplicate ✓)
- PWA: new maskable icon variant — fills Android adaptive icon tiles correctly
- Install: prominent purple banner at the top of the sidebar (dismissable), Settings → App still keeps an install row

## 2026-06-13 — Settings, profile, signup names

- New **Settings modal** consolidates Account, Appearance, Data (Export/Import), Install, and Sign out
- **Profile** in sidebar: initials avatar (stable HSL colour), display name + @handle, settings cog on hover
- Signup form now asks for First Name / Last Name (required) and Username (optional)
- Account modal grew a "Your name" section to edit it later

## 2026-06-13 — Visual polish, theme-aware logo, shortcut fixes

- New light-mode wordmark; sidebar swaps logos with the theme
- Sync badge slimmer, with a spinning two-arrow icon
- Stats strip alignment cleaned up — number, dot, label all on one baseline
- "Expand all" hidden in Table and Kanban views (only meaningful in Cards)
- Keyboard shortcuts revamped: `Ctrl+N` and `Ctrl+Shift+R` dropped (they conflicted with browser new-tab / hard-reload). New single-key shortcuts that fire outside text fields: `N` (add idea), `R` (Resurface), `/` (search). `Ctrl+K` for search still works

## 2026-06-13 — Offline-first + Markdown export

- Service worker rewritten with stale-while-revalidate caching for the app shell
- Per-user write queue: edits made offline are stored locally and pushed automatically when connectivity returns
- Sync badge reflects offline state ("Offline — saved locally", "Syncing pending changes…")
- New **Export** modal: JSON backup, Markdown flat, Markdown grouped by tag, Markdown grouped by status

## 2026-06-13 — PWA install + keyboard shortcuts

- Web manifest + service worker = installable on Chrome, Edge, Android, iOS (via Add to Home Screen)
- App shortcuts for "New idea" and "Resurface" available from the dock / home screen
- iOS PWA meta tags so the app feels native after install
- First wave of keyboard shortcuts (since revised — see later entry)

## 2026-06-13 — Markdown rendering & Resurface

- Inline markdown in idea text everywhere: **bold**, *italic*, `code`, and `[[Idea title]]` links to other ideas
- New **Resurface** widget (sparkles button in the topbar): "On this day" (ideas written on the same calendar day in past years) + "Random pick" with shuffle

## 2026-06-13 — Cross-user data isolation

- Per-user localStorage cache (no more shared `ideaTracker_v3` key) so two accounts on the same browser can't see each other's snapshots
- Boot starts with a clean in-memory state; no pre-auth bleed possible
- Sign-out and delete-account wipe every NovaLog cache key

## 2026-06-13 — Status icons + inline editing + status dropdown

- Each status can now have an **icon** from a 16-icon Lucide-style library (circle, check, star, flag, flame, …)
- **Manage** modal supports full inline editing of tags and statuses: rename via the input, recolour via a popover, change icon via a popover
- The status pill on each card is now a **dropdown** — click to switch status. The cycle button is gone
- Stats strip, sidebar Views, By-Status filters, status row in the editor — all show the chosen icon

## 2026-06-13 — Generalisation

- Hardcoded "Used in book" / "Not yet used" replaced with neutral defaults ("Open" / "Done") for new signups
- Filtering, stats, sorting, and card borders all generic — work with any number of user-defined statuses
- "Sort by used/unused" replaced with "Group by status"
- Emojis throughout the UI swapped for crisp Lucide-style SVGs (search, menu, inbox, clock, refresh, chevrons, view-mode icons)

## 2026-06-13 — Account modal & delete

- Sidebar shows the signed-in email; click opens a real Account modal
- Change email (with confirmation link), change password, sign out, and a danger-zone delete-account button
- `delete_my_account()` Postgres function (SECURITY DEFINER, RLS-gated) wipes the user from auth.users and cascades to their idea data

## 2026-06-13 — Landing page

- Cosmic dark landing page at the repo root with story, features, how-it-works, and FAQ
- Mouse-following nebula glow, drifting starfield, scroll-triggered fades, scroll-to-top button

## 2026-06-13 — Initial release

- Rebrand to **NovaLog** with new icon and wordmark
- Repo restructured: landing at `/`, app at `/app/`
- Supabase auth (email + password + hCaptcha), Postgres + RLS, anon key committed (safe by design)
- Cards / Table / Kanban views, tags & statuses, search, sort, light/dark theme, JSON import/export
