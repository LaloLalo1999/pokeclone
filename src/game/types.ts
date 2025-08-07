/*
  Core game data structures and types
  - Designed for a Vite + React + TypeScript project
  - Friendly to localStorage persistence (simple JSON-friendly types)
*/

// Basic identifiers and utility types
export type ID = string;
export type NonEmptyArray<T> = [T, ...T[]];

// Elemental typing (extend as needed)
export enum ElementType {
  Normal = "Normal",
  Fire = "Fire",
  Water = "Water",
  Grass = "Grass",
  Electric = "Electric",
  Ice = "Ice",
  Fighting = "Fighting",
  Poison = "Poison",
  Ground = "Ground",
  Flying = "Flying",
  Psychic = "Psychic",
  Bug = "Bug",
  Rock = "Rock",
  Ghost = "Ghost",
  Dragon = "Dragon",
  Dark = "Dark",
  Steel = "Steel",
  Fairy = "Fairy",
}

export type StatusCondition =
  | "none"
  | "poison"
  | "burn"
  | "paralysis"
  | "sleep"
  | "freeze"
  | "confusion";

export type MoveCategory = "physical" | "special" | "status";

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

// Moves
export interface Move {
  id: ID;
  name: string;
  type: ElementType;
  category: MoveCategory;
  // If a move is non-damaging, power can be null
  power: number | null;
  // Accuracy as percentage (0-100). null = never misses
  accuracy: number | null;
  // Current and max PP are tracked per learned move on a creature
  pp: number; // base PP when learned
  maxPP: number; // maximum PP including PP Ups, if relevant
  priority?: number; // higher executes first in turn order
  description?: string;
  // Optional effect ID or inline description for simple effects
  effectId?: ID;
  target?: "enemy" | "ally" | "self" | "all-enemies" | "all-allies";
}

// A move as it exists on a specific creature (tracks current PP)
export interface LearnedMove {
  moveId: ID;
  currentPP: number;
}

// Creature species (template)
export interface CreatureSpecies {
  id: ID;
  name: string;
  types: NonEmptyArray<ElementType>;
  baseStats: Stats;
  // Level-up learnset (level at which move becomes available)
  learnset?: Array<{ level: number; moveId: ID }>;
  catchRate?: number; // used by capture formulas
}

// A captured/owned creature
export interface Creature {
  uid: ID; // unique per creature instance
  speciesId: ID;
  nickname?: string;
  level: number;
  experience: number;
  currentHP: number;
  stats: Stats; // concrete stats at current level
  types: NonEmptyArray<ElementType>;
  moves: LearnedMove[]; // up to 4 typically
  status?: StatusCondition; // default "none"
  isFainted?: boolean;
}

// Items
export type ItemKind = "pokeball" | "potion" | "revive" | "key";

export interface ItemBase {
  id: ID;
  name: string;
  kind: ItemKind;
  description?: string;
  price?: number; // shop value
}

export interface PokeballItem extends ItemBase {
  kind: "pokeball";
  catchModifier: number; // e.g., 1, 1.5, 2
}

export interface PotionItem extends ItemBase {
  kind: "potion";
  healAmount: number; // HP restored
}

export interface ReviveItem extends ItemBase {
  kind: "revive";
  revivePercent: number; // percent of max HP restored upon revive (e.g., 0.5 or 1)
}

export interface KeyItem extends ItemBase {
  kind: "key";
}

export type Item = PokeballItem | PotionItem | ReviveItem | KeyItem;

export interface InventoryEntry {
  itemId: ID;
  quantity: number;
}

export interface Inventory {
  items: InventoryEntry[]; // array to preserve order for UI
}

// World/Map positioning
export type Facing = "up" | "down" | "left" | "right";

export interface Location {
  mapId: string;
  x: number;
  y: number;
  facing?: Facing;
}

// Player
export interface Player {
  id: ID;
  name: string;
  money: number;
  team: Creature[]; // typically 0-6
  inventory: Inventory;
  badges: string[]; // simple identifiers for now
  location: Location;
  // Optional PC storage for extra creatures
  storage?: Creature[];
}

// Battle related types
export type Weather = "none" | "rain" | "sun" | "sandstorm" | "hail";

export interface ParticipantSide {
  trainerName?: string;
  creatures: Creature[];
  activeIndex: number; // index into creatures
}

export type BattlePhase =
  | "start"
  | "awaiting-actions"
  | "executing-turn"
  | "fainted-switch"
  | "end";

export interface UseMoveAction {
  kind: "move";
  actorSide: "player" | "enemy";
  actorIndex: number; // active creature index (usually matches activeIndex)
  moveId: ID;
  targetSide: "player" | "enemy";
  targetIndex: number; // usually 0 for single battles
}

export interface UseItemAction {
  kind: "item";
  actorSide: "player" | "enemy"; // typically player
  itemId: ID;
  targetIndex?: number; // which creature on actor side
}

export interface SwitchAction {
  kind: "switch";
  actorSide: "player" | "enemy";
  toIndex: number; // index of bench creature to switch in
}

export interface RunAction {
  kind: "run";
  actorSide: "player" | "enemy";
}

export type BattleAction = UseMoveAction | UseItemAction | SwitchAction | RunAction;

export interface QueuedAction {
  action: BattleAction;
  priority: number; // computed from move priority + speed, lower resolves first or vice versa depending on engine
}

export interface TurnLogEntry {
  text: string;
}

export interface BattleState {
  id: ID;
  sides: {
    player: ParticipantSide;
    enemy: ParticipantSide;
  };
  weather: Weather;
  turn: number; // starts at 1
  phase: BattlePhase;
  queue: QueuedAction[];
  log: TurnLogEntry[];
}

// Game state management
export interface Flags {
  [key: string]: string | number | boolean | null;
}

export interface GameState {
  player: Player;
  flags: Flags;
  rngSeed?: number;
  ongoingBattle?: BattleState;
  lastSaveISO?: string; // ISO date string of last save
  version?: number; // state schema version
}

// Events for a simple reducer-driven state machine
export type GameEvent =
  | { type: "SAVE" }
  | { type: "LOAD"; payload: GameState }
  | { type: "GAIN_ITEM"; itemId: ID; quantity: number }
  | { type: "USE_ITEM"; itemId: ID; targetIndex?: number }
  | { type: "START_BATTLE"; payload: BattleState }
  | { type: "END_BATTLE" }
  | { type: "ADD_CREATURE"; payload: Creature }
  | { type: "AWARD_BADGE"; badgeId: string }
  | { type: "MOVE_PLAYER"; location: Location }
  | { type: "EARN_MONEY"; amount: number }
  | { type: "SPEND_MONEY"; amount: number };

export type GameReducer = (state: GameState, event: GameEvent) => GameState;

// Optional: localStorage helpers (types + key constants)
export const STORAGE_KEYS = {
  save: "poketsu.save",
} as const;

export interface PersistedGameState {
  key: typeof STORAGE_KEYS.save;
  state: GameState;
}

