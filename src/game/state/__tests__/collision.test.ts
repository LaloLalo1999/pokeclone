import { describe, it, expect } from 'vitest';
import { AREAS } from '../../data/areas';
import { createWorld, tryStartMove, updateWorld } from '../gameState';

describe('collision and movement', () => {
  it('prevents moving into walls', () => {
    const world = createWorld(AREAS, 'town', 1, 1);
    // wall is at y=0
    tryStartMove(world, 'up');
    updateWorld(world, 1);
    expect(world.player.x).toBe(1);
    expect(world.player.y).toBe(1);
  });

  it('allows moving on path and grass', () => {
    const world = createWorld(AREAS, 'town', 2, 2);
    tryStartMove(world, 'down');
    updateWorld(world, 0.2);
    updateWorld(world, 1);
    expect(world.player.x).toBe(2);
    expect(world.player.y).toBe(3);
  });

  it('transitions between areas on exit tiles', () => {
    const world = createWorld(AREAS, 'town', 14, 13);
    tryStartMove(world, 'down');
    updateWorld(world, 1);
    expect(world.currentAreaId).toBe('route');
  });
});
