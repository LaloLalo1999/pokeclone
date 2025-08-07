# Pokeclone

A retro, Game Boy–inspired creature battle prototype built with React, TypeScript, Vite, and Tailwind CSS. No backend—progress is saved locally via LocalStorage. Includes a lightweight battle engine, map/encounter logic, and in-game UI components.

- Stack: React 19, TypeScript 5, Vite 7, Tailwind 3
- Runtime: Bun preferred (bun.lock present); npm/pnpm also work
- Tests: Vitest (targeting game logic)
- License: MIT

## Quickstart

Using Bun (recommended):

```sh
bun install
bun run dev
```

Using npm:

```sh
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Scripts
- dev: Start Vite dev server
- build: Type-check then Vite build
- preview: Preview production build
- test: Run unit tests (Vitest)
- lint: Run ESLint

Run with `bun run <script>` or `npm run <script>`.

## Project structure
A full, auto-generated tree is maintained at docs/sourcetree.md. Highlights:

- index.html: Vite entry HTML
- tailwind.config.js, postcss.config.js: Tailwind setup
- src/main.tsx: App bootstrap
- src/App.tsx: Root component
- src/assets/gb: Fonts and SVG sprites for GB-style UI
- src/components/gb: GB-styled UI components (DialogBox, Menu, HPBar, GBBattleUI, etc.)
- src/game:
  - battle: Battle engine, type chart, experience
  - components: In-game HUD/Canvas/Dialog
  - data: Species, moves, areas, gym data
  - engine: Input, tilemap helpers
  - state: Game state (with tests)
  - rng.ts: Random utilities
  - types.ts: Shared types
- src/utils/storage.ts: LocalStorage helpers

See docs/sourcetree.md for the full directory listing and notes.

## Development
- Styling: Tailwind CSS utility classes. Global base styles in src/index.css.
- State and persistence: Keep save data in LocalStorage via src/utils/storage.ts.
- Assets: Prefer simple, original vector sprites sized for low-res/GB aesthetics (see src/assets/gb/sprites). GB font provided at src/assets/gb/fonts/gb8.woff2.
- Type-safety: Use strict TypeScript types from src/game/types.ts.
- Testing: Add unit tests for core game logic with Vitest under __tests__ directories.
- Linting: ESLint flat config (eslint.config.js). Run `bun run lint`.

## Common tasks
- Add a new species: Define in src/game/data/species.ts and provide a sprite in src/assets/gb/sprites; update typeChart if needed.
- Add a new move: Define in src/game/data/moves.ts; ensure battle/engine.ts supports its behavior.
- Tweak type effectiveness: Edit src/game/battle/typeChart.ts.
- Adjust XP/leveling: Edit src/game/battle/experience.ts.

## Contributing
PRs welcome. Keep changes small and covered by unit tests where possible. Follow existing patterns in src/components/gb and src/game.

## License
MIT
