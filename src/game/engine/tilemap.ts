export type Tile = 0 | 1 | 2 | 3; // 0: grass, 1: path, 2: wall, 3: door

export interface Area {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: Tile[]; // row-major
  collisions: boolean[]; // row-major
  exits: {
    to: string;
    // tile coordinate that triggers transition
    x: number;
    y: number;
    // spawn location in destination area
    spawnX: number;
    spawnY: number;
  }[];
}

export const TILE_SIZE = 16; // pixels per tile before scaling

export function tileIndex(x: number, y: number, width: number) {
  return y * width + x;
}

export function isBlocked(area: Area, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= area.width || y >= area.height) return true;
  return area.collisions[tileIndex(x, y, area.width)];
}

export function getExit(area: Area, x: number, y: number) {
  return area.exits.find(ex => ex.x === x && ex.y === y) || null;
}
