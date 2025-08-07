import { Area, tileIndex } from '../engine/tilemap';

function mapFromStrings(rows: string[]): { tiles: number[]; collisions: boolean[]; width: number; height: number } {
  const height = rows.length;
  const width = rows[0].length;
  const tiles: number[] = new Array(width * height).fill(0);
  const collisions: boolean[] = new Array(width * height).fill(false);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ch = rows[y][x];
      const i = tileIndex(x, y, width);
      switch (ch) {
        case '.': // grass
          tiles[i] = 0; break;
        case '#': // wall
          tiles[i] = 2; collisions[i] = true; break;
        case '=': // path
          tiles[i] = 1; break;
        case 'D': // door/exit (not blocked)
          tiles[i] = 3; break;
        default:
          tiles[i] = 0;
      }
    }
  }
  return { tiles, collisions, width, height };
}

const townRows = [
  '################',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====....#',
  '#......====..D.#',
  '################',
];

const routeRows = [
  '################',
  '#..............#',
  '#.##########...#',
  '#.#........#...#',
  '#.#.######..#..#',
  '#.#.#....#..#..#',
  '#...#....#..#..#',
  '#.#.#....#..#..#',
  '#.#.######..#..#',
  '#.#........#..D#',
  '#.##########...#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#D.............#',
  '################',
];

const gymRows = [
  '################',
  '#..............#',
  '#..######......#',
  '#..#....#......#',
  '#..#..D.#......#',
  '#..#....#......#',
  '#..######......#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#..............#',
  '################',
];

const town = (() => {
  const base = mapFromStrings(townRows);
  const area: Area = {
    id: 'town',
    name: 'Town',
    width: base.width,
    height: base.height,
    tiles: base.tiles as any,
    collisions: base.collisions,
    exits: [
      { to: 'route', x: 14, y: 14, spawnX: 14, spawnY: 13 },
    ],
  };
  return area;
})();

const route = (() => {
  const base = mapFromStrings(routeRows);
  const area: Area = {
    id: 'route',
    name: 'Route 1',
    width: base.width,
    height: base.height,
    tiles: base.tiles as any,
    collisions: base.collisions,
    exits: [
      { to: 'town', x: 1, y: 14, spawnX: 2, spawnY: 14 }, // left door back to town
      { to: 'gym', x: 14, y: 9, spawnX: 5, spawnY: 4 }, // right door to gym
    ],
  };
  return area;
})();

const gym = (() => {
  const base = mapFromStrings(gymRows);
  const area: Area = {
    id: 'gym',
    name: 'Gym',
    width: base.width,
    height: base.height,
    tiles: base.tiles as any,
    collisions: base.collisions,
    exits: [
      { to: 'route', x: 5, y: 4, spawnX: 13, spawnY: 9 },
    ],
  };
  return area;
})();

export const AREAS: Record<string, Area> = {
  town,
  route,
  gym,
};
