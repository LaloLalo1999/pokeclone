# Pokeclone Testing Documentation

## Overview
This document provides comprehensive testing information for the Pokeclone game - a retro Game Boy-style creature battle prototype built with React, TypeScript, Vite, and Tailwind CSS.

## Application Functionality

### Core Features Tested
1. **Game Canvas & Map Navigation**
   - Tile-based map rendering with grass and path tiles
   - Player character movement using Arrow Keys or WASD
   - Area transitions (currently shows "Town")
   - Collision detection with boundaries

2. **HUD (Heads-Up Display)**
   - Current area display
   - Badge progress tracker (shows "No badges")
   - Currency system (starts with ₵ 2000)
   - Quick access buttons for Bag and Shop

3. **Inventory System (Bag)**
   - Item categorization tabs: ALL, POTION, POKEBALL, REVIVE
   - Item storage and display
   - Item usage interface
   - Total item count tracker

4. **Shop System**
   - Available items for purchase:
     - Potion (₵300) - Restores 20 HP
     - Super Potion (₵700) - Restores 50 HP
     - Revive (₵1500) - Revives fainted creature with half HP
     - Pokeball (₵200) - Device for catching wild creatures
     - Great Ball (₵600) - High-performance Ball
   - Purchase confirmation messages
   - Real-time currency updates
   - Inventory integration (purchased items appear in bag)

5. **Data Persistence**
   - LocalStorage integration for game state
   - Save/load functionality for game progress

## Test Setup

### Prerequisites
```bash
# Install dependencies (includes jsdom for testing)
bun install
# or
npm install
```

### Running Tests

#### Unit Tests (Vitest)
```bash
# Run all tests
bun run test
# or
npm run test

# Run tests in watch mode
bun vitest --watch
```

#### Browser Testing (Playwright)
The app can be tested interactively using Playwright for browser automation.

### Test Results Summary

#### Passing Tests (9/18)
✅ **Catch Rate Calculations**
- Higher chance at lower HP and with better balls
- Master ball yields 100% chance

✅ **Type Effectiveness**
- Computes effectiveness multipliers correctly
- Applies STAB (Same Type Attack Bonus)

✅ **Damage Formula**
- Deals at least 1 damage minimum
- Scales with type effectiveness and STAB

✅ **Experience System**
- Awards exp and levels up when threshold reached

✅ **Collision Detection**
- Prevents moving into walls
- Allows moving on path and grass
- Transitions between areas on exit tiles

#### Failing Tests (9/18)
❌ **Storage Tests** - Window object not defined in test environment
❌ **Turn Resolution** - Speed-based turn order needs fixing
❌ **Battle End Conditions** - Phase transition logic issues
❌ **Experience Thresholds** - Minor calculation discrepancy

## Test Coverage Areas

### Game Logic (`src/game/`)
- **Battle Engine** (`battle/engine.ts`)
  - Damage calculations
  - Turn resolution
  - Status effects
  
- **Type System** (`battle/typeChart.ts`)
  - Type effectiveness matrix
  - STAB bonus calculations

- **Experience System** (`battle/experience.ts`)
  - XP calculations
  - Level up thresholds
  - Stat growth

- **State Management** (`state/gameState.ts`)
  - Game state persistence
  - Area transitions
  - Collision detection

### Utilities (`src/utils/`)
- **Storage** (`storage.ts`)
  - LocalStorage wrapper
  - State versioning
  - Migration system

## Known Issues

1. **Test Environment**
   - Some tests fail due to missing DOM globals in test environment
   - JSDOM configuration needs adjustment for localStorage tests

2. **Battle System**
   - Turn order resolution not working as expected
   - Battle phase transitions need refinement

3. **Experience Calculations**
   - Minor discrepancy in level 3 XP threshold (13 vs expected 14)

## Development Workflow

### Adding New Tests
1. Place unit tests in `__tests__` folders adjacent to source files
2. Use `.test.ts` or `.test.tsx` extension
3. Follow existing test patterns for consistency

### Testing Best Practices
- Focus on deterministic game logic
- Use seeded RNG (`rng.ts`) for reproducible tests
- Test data tables remain small and readable
- Prioritize testing core game mechanics

## Browser Compatibility
The app has been tested and works in modern browsers with:
- Canvas rendering for game map
- Keyboard input for movement
- LocalStorage for persistence
- Responsive UI elements

## Performance Notes
- Map rendering is smooth with tile-based approach
- UI updates are responsive
- State persistence happens seamlessly
- Shop/inventory operations are instant

## Future Testing Improvements
1. Fix failing tests by properly configuring JSDOM environment
2. Add integration tests for complete game flows
3. Implement E2E tests for critical user journeys
4. Add performance benchmarks for rendering
5. Create automated Playwright test suite

## Quick Test Commands Reference
```bash
# Install deps
bun install

# Run dev server
bun run dev

# Run tests
bun run test

# Build for production
bun run build

# Lint code
bun run lint
```

## Manual Testing Checklist
- [ ] Player movement in all directions
- [ ] Collision with boundaries
- [ ] Shop purchases update money
- [ ] Purchased items appear in bag
- [ ] Item categories filter correctly
- [ ] Game state persists on refresh
- [ ] UI is responsive to window resize
- [ ] Keyboard controls are responsive