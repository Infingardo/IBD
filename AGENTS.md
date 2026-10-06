# IBD Diagnostic Tool: instructions for Claude and Codex

Decision-support tool for the histological diagnosis of IBD: single-page HTML/JS, no build step, works offline. It does not diagnose: it formalizes the reasoning of the expert pathologist and exposes the criteria used. Keep that framing in any wording. Logic is in `engine.js`, UI in `index.html`, libraries in `vendor/`, tests in `tests/run.mjs` (`npm test`). Reference notes: `NANCY_INDEX_QUICK_GUIDE.md`, `MANIFESTO_USO.md`, `docs/`.

## Rules
- Diagnostic content (entities, criteria, cutoffs, scoring, report wording) is curated by Filippo. Change it only on his instruction or from a cited source, never from memory. If code and source disagree, report it; do not choose.
- Report wording follows Filippo's house style. Do not reword it on your own.
- Before changing anything that can alter an output: plan first, state which outputs change, add or update tests with at least one input per affected class, and run `npm test` before closing.
- After such a change, get an independent review against the agreed spec: `/verify-agent` in Claude Code, or a separate review pass against the cited source.
- Keep logic in `engine.js` separate from the UI. No fake precision: show uncertainty and equivocal results.
- Offline-first: no external script, stylesheet or fetch URLs; libraries live in `vendor/` with relative paths. On the Mac a local pre-commit hook enforces this; elsewhere check by hand. Never bypass hooks with `--no-verify`.
- No patient data in code, tests, fixtures, docs or commit messages.
- `AGENTS.md` is a copy of this file for Codex: keep the two aligned when you edit either.

## Note for Codex
- `/verify-agent` exists only in Claude Code. For the independent review, do a separate review pass against the cited source and report the result and any open items.
