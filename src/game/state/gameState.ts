import { Area, getExit, isBlocked } from '../engine/tilemap';

export interface Player {
  x: number; // tile coords
  y: number;
  moving: boolean;
  pixelX: number; // for smooth movement
  pixelY: number;
  moveProgress: number; // 0..1 while moving
  facing: 'up' | 'down' | 'left' | 'right';
}

export interface World {
  areas: Record<string, Area>;
  currentAreaId: string;
  player: Player;
}

export function createWorld(areas: Record<string, Area>, startArea: string, startX: number, startY: number): World {
  return {
    areas,
    currentAreaId: startArea,
    player: {
      x: startX,
      y: startY,
      moving: false,
      pixelX: startX,
      pixelY: startY,
      moveProgress: 0,
      facing: 'down',
    },
  };
}

export function tryStartMove(world: World, dir: 'up'|'down'|'left'|'right') {
  const area = world.areas[world.currentAreaId];
  const dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
  const dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
  const nx = world.player.x + dx;
  const ny = world.player.y + dy;
  world.player.facing = dir;
  if (!isBlocked(area, nx, ny) && !world.player.moving) {
    world.player.moving = true;
    world.player.moveProgress = 0;
    world.player.x = nx;
    world.player.y = ny;
  }
}

export function updateWorld(world: World, dt: number) {
  const speed = 8; // tiles per second for interpolation
  if (world.player.moving) {
    world.player.moveProgress += dt * speed;
    if (world.player.moveProgress >= 1) {
      world.player.moveProgress = 1;
      world.player.moving = false;
      // check exit when landing on tile
      const area = world.areas[world.currentAreaId];
      const exit = getExit(area, world.player.x, world.player.y);
      if (exit) {
        world.currentAreaId = exit.to;
        world.player.x = exit.spawnX;
        world.player.y = exit.spawnY;
        world.player.pixelX = exit.spawnX;
        world.player.pixelY = exit.spawnY;
        world.player.moveProgress = 0;
        world.player.moving = false;
      }
    }
  }
  // Update pixel pos to ease towards tile center
  const pxTarget = world.player.x;
  const pyTarget = world.player.y;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, world.player.moving ? world.player.moveProgress : 1);
  world.player.pixelX = lerp(world.player.pixelX, pxTarget, 1);
  world.player.pixelY = lerp(world.player.pixelY, pyTarget, 1);
}
