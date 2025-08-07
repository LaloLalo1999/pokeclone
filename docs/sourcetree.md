# Project source tree

This document captures the structure and key parts of the repository from the project root.

- Name: pokeclone
- Stack: React + TypeScript + Vite + Tailwind CSS (bun.lock present; can use Bun or npm/pnpm)
- Tests: Vitest configured; unit tests currently under src/game/state/__tests__

## Scripts (from package.json)
- dev: vite
- build: tsc && vite build
- lint: eslint .
- preview: vite preview
- test: vitest

## Directory tree
(Excludes common vendor/build directories like node_modules, .git, dist, build)

.
├── .gitignore
├── README.md
├── bun.lock
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   ├── gb
│   │   │   ├── fonts
│   │   │   │   └── gb8.woff2
│   │   │   └── sprites
│   │   │       ├── creature_ember.svg
│   │   │       └── creature_sprout.svg
│   │   └── react.svg
│   ├── components
│   │   ├── BattleDemo.tsx
│   │   ├── BattleView.tsx
│   │   └── gb
│   │       ├── BattleCard.tsx
│   │       ├── Demo.tsx
│   │       ├── DialogBox.tsx
│   │       ├── GBBattleUI.tsx
│   │       ├── HPBar.tsx
│   │       ├── Menu.tsx
│   │       ├── PixelSprite.tsx
│   │       └── utils.ts
│   ├── game
│   │   ├── battle
│   │   │   ├── engine.ts
│   │   │   ├── experience.ts
│   │   │   └── typeChart.ts
│   │   ├── components
│   │   │   ├── BadgeBar.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── GameCanvas.tsx
│   │   │   ├── GymBattleUI.tsx
│   │   │   └── HUD.tsx
│   │   ├── data
│   │   │   ├── areas.ts
│   │   │   ├── gym.ts
│   │   │   ├── moves.ts
│   │   │   └── species.ts
│   │   ├── engine
│   │   │   ├── input.ts
│   │   │   └── tilemap.ts
│   │   ├── state
│   │   │   ├── __tests__
│   │   │   │   └── collision.test.ts
│   │   │   └── gameState.ts
│   │   ├── encounters.ts
│   │   ├── pc.ts
│   │   ├── pcStorage.ts
│   │   ├── rng.ts
│   │   └── types.ts
│   ├── index.css
│   ├── main.tsx
│   ├── utils
│   │   └── storage.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

## Notes by path
- index.html: Vite entry HTML shell.
- tailwind.config.js + postcss.config.js: Tailwind and PostCSS configuration.
- eslint.config.js: Flat ESLint config for TypeScript/React.
- src/main.tsx: React app bootstrap and mounting.
- src/App.tsx, src/App.css: Root component and styles.
- public/: Static assets served at root.
- src/assets/gb/: Game Boy–style fonts and SVG sprite assets used for retro UI.
- src/components/: React UI components for the app-level views.
  - src/components/gb/: Game Boy–styled UI building blocks (dialog box, menu, HP bar, pixel sprite, battle UI shell).
- src/game/: Game logic and in-game UI elements.
  - battle/: Battle engine and calculations (type chart, XP).
  - components/: In-game UI overlays (HUD, dialogs, canvas, badge bar, gym battle UI).
  - data/: Static data tables (areas, gym, moves, species).
  - engine/: Core engine helpers (input handling, tilemap utilities).
  - state/: Game state container and tests; includes gameState.ts and a vitest spec for collision.
  - pc.ts, pcStorage.ts: PC storage features for creatures/inventory.
  - rng.ts: Random number helpers.
  - types.ts: Shared TypeScript types for game entities.
- src/utils/storage.ts: LocalStorage helper utilities.

## Getting started
- Install deps: bun install (or npm install)
- Dev server: bun run dev (or npm run dev)
- Build: bun run build (or npm run build)
- Test: bun run test (or npm run test)
- Lint: bun run lint (or npm run lint)

