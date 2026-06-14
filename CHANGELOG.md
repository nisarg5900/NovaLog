# NovaLog Changelog

All notable changes are listed here. Newest first.

Versioning is **MAJOR.MINOR.PATCH** (loose SemVer for an app):
**MAJOR** = breaking data-shape changes · **MINOR** = new features · **PATCH** = fixes & polish.
Once the product is feature-complete enough to stop breaking things between versions, v1.0.0 ships.

---

## v0.7.0 — 2026-06-13
**Versioning, editor fixes, polish**

- Introduced versioning: app shows `v0.7.0` next to NovaLog in the sidebar, Settings → About links here
- Editor: removed side-by-side and fullscreen buttons (they re-mounted CodeMirror and lost unsaved text inside the modal)
- Preview overlay now opaque + properly positioned — source no longer bleeds through the rendered output
- Idea modal grown from 600 → 880 px max width so editing feels less cramped
- New quick theme toggle (sun/moon) in the topbar — no need to open Settings

## v0.6.0 — 2026-06-13
**Card layout, sync icon, install banner, changelog**

- Card layout: date pinned in the head, status pushed to the right so it stays distinct from category tags
- Sync badge: single spinning two-arrow icon (no more "Synced ✓" double-tick)
- PWA: new maskable icon variant — fills Android adaptive icon tiles correctly
- Prominent purple install banner at the top of the sidebar (dismissable); Settings → App keeps a permanent install row
- `CHANGELOG.md` + "What's new" section on the landing page

## v0.5.0 — 2026-06-13
**Settings, profile, signup names, markdown editor**

- New **Settings** modal consolidating Account, Appearance, Data, Install, Sign out
- Initials avatar in the sidebar (HSL hash from username/uid), display name + @handle, animated cog
- Signup form asks First/Last name (required) + optional Username
- Account modal grew a "Your name" section to edit it later
- Drop-in EasyMDE markdown editor with toolbar, live preview, and `Ctrl+B / Ctrl+I / Ctrl+L` shortcuts

## v0.4.0 — 2026-06-13
**Theme-aware logo, sync icon, fixed shortcuts, scroll-to-top**

- New light-mode wordmark; sidebar swaps logos with the theme
- Stats strip alignment cleaned up — number, dot, label on a single baseline
- "Expand all" hidden in Table and Kanban views (only meaningful in Cards)
- Keyboard shortcuts revamped: `Ctrl+N` and `Ctrl+Shift+R` dropped (browser conflicts). New single-key shortcuts that fire outside text fields: `N` (add idea), `R` (Resurface), `/` (search)
- Scroll-to-top FAB in the app respecting iOS safe areas

## v0.3.0 — 2026-06-13
**Offline-first, Markdown export, PWA install**

- Service worker rewritten with stale-while-revalidate caching for the app shell
- Per-user write queue: edits made offline are stored locally and pushed automatically when connectivity returns
- Sync badge reflects offline state ("Offline — saved locally", "Syncing pending changes…")
- New **Export** modal: JSON backup, Markdown flat, Markdown grouped by tag, Markdown grouped by status
- Web manifest + service worker = installable on Chrome, Edge, Android, iOS (via Add to Home Screen)
- PWA app shortcuts ("New idea", "Resurface")

## v0.2.0 — 2026-06-13
**Markdown, Resurface, status icons, inline editing**

- Inline markdown in idea text everywhere: `**bold**`, `*italic*`, `` `code` ``, and `[[Idea title]]` links between ideas
- **Resurface** widget: "On this day" + "Random pick" with shuffle
- Each status gets an **icon** from a 16-icon Lucide-style library
- **Manage** modal: full inline editing of tags and statuses — rename via input, recolour + change icon via popovers
- The status pill on each card is now a one-click dropdown (cycle button removed)
- Stats strip, sidebar Views, By-Status filters, status row in the editor — all show the chosen icon
- Cross-user data isolation: per-user localStorage cache, empty boot state, wipe on sign-out

## v0.1.0 — 2026-06-13
**Generalisation + Account modal**

- Hardcoded "Used in book" / "Not yet used" replaced with neutral defaults ("Open" / "Done") for new signups
- Filtering, stats, sorting, card borders generic — works with any number of user-defined statuses
- Sidebar email replaced by a real **Account** modal: change email (with confirmation link), change password, sign out, danger-zone delete-account
- `delete_my_account()` Postgres function (SECURITY DEFINER, RLS-gated) cascades to user data
- Emojis throughout the UI swapped for Lucide-style SVGs

## v0.0.1 — 2026-06-13
**Initial release**

- Rebrand to **NovaLog** with new icon and wordmark
- Repo restructured: landing at `/`, app at `/app/`
- Supabase auth (email + password + hCaptcha), Postgres + RLS, anon key safely committed
- Cards / Table / Kanban views, tags & statuses, search, sort, light/dark theme, JSON import/export
- Cosmic dark landing page with story, features, how-it-works, FAQ
- Mouse-following nebula glow, drifting starfield, scroll-triggered fades
