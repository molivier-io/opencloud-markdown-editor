# Copilot / AI agent instructions (concise)

This repo is an OpenCloud web-app extension providing a Tiptap-based WYSIWYG Markdown editor.
Keep changes small and focused — the app registers with OpenCloud via an SDK and runtime assumptions are fragile.

Target files

- `src/index.ts` — app registration (`defineWebApplication`), `appInfo`, routes, `extensions`.
- `src/App.vue` — main editor UI (Tiptap config, `cmd()` helper, toolbar and editor storage).
- `src/components/*` — editor subcomponents (`Toolbar.vue`, `TableControls.vue`, etc.).
- `src/l10n/translations.json` and `l10n/translations.json` — localization sources used with `vue3-gettext`.
- `vite.config.ts`, `package.json` — build/SDK wiring and scripts.

Quick architecture

- Purpose: an OpenCloud extension that replaces the Markdown editor with a Tiptap-based WYSIWYG view.
- Entry: `src/index.ts` registers routes and application metadata consumed by the OpenCloud host.
- UI: `src/App.vue` composes the editor and toolbars; editor commands use `editor.chain().focus().<cmd>().run()` and store markdown in `editor.storage.markdown`.
- Localization: strings use `$gettext()` and must be mirrored between `src/l10n` and top-level `l10n`.

Developer workflows

- Install: `pnpm install` (pnpm v10 recommended).
- Dev build (watch): `pnpm build:w` — use for iterative builds (watch mode).
- Production build: `pnpm build` (runs `vite build`).
- Type check: `pnpm run check:types` (uses `vue-tsc`).
- Lint/format: `pnpm run lint`, `pnpm run format:check`, `pnpm run format:write`.
- Tests: `pnpm run test:unit` (vitest). Note: `package.json` sets `NODE_OPTIONS=--unhandled-rejections=throw` using POSIX syntax; on Windows shells you may need `cross-env` or set env differently.

Project-specific patterns (explicit)

- OpenCloud registration: always return `appInfo`, `routes`, and `extensions` from `defineWebApplication({ setup(args) { ... } })` in `src/index.ts`.
- File types: supported file extensions are declared in `fileExtensions()` in `src/index.ts`. To add types, pass them via `args.extraExtensions`.
- Menu items: build `Extension[]` objects and return from `extensions` — see `AppMenuItemExtension` sample in `src/index.ts`.
- Editor commands: use `editor.chain().focus().<cmd>().run()` (see `cmd()` in `src/App.vue`) and rely on `editor.storage.markdown` for serialization.
- UI strings: add translation keys to `src/l10n/translations.json` and mirror in top-level `l10n/translations.json`; components call `$gettext()`.

Integration & dependencies

- Core runtime: `@opencloud-eu/extension-sdk` and `@opencloud-eu/web-pkg` — changes affect app registration and Tailwind import.
- Editor stack: `@tiptap/*`, `tiptap-markdown`, `StarterKit`, `TaskList/TaskItem`, and Table extensions — treat editor storage/serialization as the single source of truth.

Editing guidance for agents

- Keep edits minimal and surgical. Avoid changing `vite.config.ts`/SDK wiring unless you understand OpenCloud runtime implications.
- When adding features, update `src/index.ts` routes and provide matching components under `src/`.
- For UI text, update both `src/l10n/translations.json` and top-level `l10n/translations.json`.
- Use existing component conventions: toolbar commands in `Toolbar.vue`, block components under `components/`.

If anything here is unclear or you want example diffs (routes, commands, or localization updates), tell me which change and I will produce a focused patch.
