# CLAUDE.md

Audience: developers and autonomous/AI agents contributing to this repo.
Goal: continue building a retro, Game Boy–style creature battle prototype using React + TypeScript + Vite + Tailwind. Keep it frontend-only (LocalStorage persistence).

Key facts
- Frameworks: React 19, Vite 7, Tailwind 3, TypeScript 5
- Runtime: Bun preferred (bun.lock); npm/pnpm OK
- Tests: Vitest (focus on game logic)
- Source map: see docs/sourcetree.md
- License: MIT

Conventions
- Visual style: low-res, GB-inspired UI. Use existing components in src/components/gb and sprites in src/assets/gb.
- State: Game state shapes in src/game/types.ts; central state in src/game/state/gameState.ts. Persist with src/utils/storage.ts.
- Data: Keep species/moves/areas/gym as declarative tables under src/game/data.
- Engine: Battle and map logic live under src/game/battle and src/game/engine.
- Tests: Place unit tests adjacent in __tests__ folders. Use Vitest.
- No backend calls. If data must persist, store in LocalStorage.

Setup
- bun install
- bun run dev (or npm install && npm run dev)

Common tasks
- Species: Add entry to src/game/data/species.ts; provide matching SVG under src/assets/gb/sprites.
- Move: Add to src/game/data/moves.ts; ensure handling in src/game/battle/engine.ts.
- Encounters: Update src/game/encounters.ts and area data in src/game/data/areas.ts.
- Type chart or XP: Modify src/game/battle/typeChart.ts and src/game/battle/experience.ts respectively.
- UI: Compose from src/components/gb. For new GB widgets, colocate in src/components/gb and keep props minimal and typed.

Testing
- Run all tests: bun run test
- Add tests under src/**/__tests__ with .test.ts/.tsx. Focus on deterministic logic (rng.ts supports seeding patterns).

Scripts
- dev: Vite server
- build: tsc && vite build
- preview: vite preview
- test: vitest
- lint: eslint .

Review checklist (for PRs/agents)
- Types are explicit and import from src/game/types.ts where applicable.
- No network calls or server state; persistence only via LocalStorage helpers.
- New data tables remain small and human-readable.
- Unit tests added/updated for game logic changes.
- UI follows GB style; assets are simple vectors or text with the GB font.

Pointers
- Full tree and notes: docs/sourcetree.md
- Entry points: src/main.tsx, src/App.tsx
- Battle engine core: src/game/battle/engine.ts
- State core: src/game/state/gameState.ts

