import { Creature, CreatureSpecies, ID, PokeballItem, Stats, ElementType } from "./types";
import { randInt, weightedPick } from "./rng";

// Basic in-memory species registry; in a full app, this would come from data files.
export const SPECIES_REGISTRY: Record<ID, CreatureSpecies> = {
  sprout: {
    id: "sprout",
    name: "Sprout",
    types: [ElementType.Grass],
    baseStats: { hp: 45, attack: 49, defense: 49, spAttack: 65, spDefense: 65, speed: 45 },
    catchRate: 255,
  },
  sparkit: {
    id: "sparkit",
    name: "Sparkit",
    types: [ElementType.Electric],
    baseStats: { hp: 35, attack: 55, defense: 40, spAttack: 50, spDefense: 50, speed: 90 },
    catchRate: 190,
  },
  flamara: {
    id: "flamara",
    name: "Flamara",
    types: [ElementType.Fire],
    baseStats: { hp: 39, attack: 52, defense: 43, spAttack: 60, spDefense: 50, speed: 65 },
    catchRate: 45,
  },
};

export type EncounterSlot = {
  speciesId: ID;
  minLevel: number;
  maxLevel: number;
  weight: number;
};

export type EncounterTable = EncounterSlot[];

// Example encounter tables by location id
export const ENCOUNTERS_BY_LOCATION: Record<string, EncounterTable> = {
  meadow: [
    { speciesId: "sprout", minLevel: 2, maxLevel: 5, weight: 60 },
    { speciesId: "sparkit", minLevel: 3, maxLevel: 6, weight: 30 },
    { speciesId: "flamara", minLevel: 2, maxLevel: 4, weight: 10 },
  ],
  cave: [
    { speciesId: "flamara", minLevel: 5, maxLevel: 8, weight: 40 },
    { speciesId: "sparkit", minLevel: 4, maxLevel: 7, weight: 20 },
    { speciesId: "sprout", minLevel: 4, maxLevel: 7, weight: 40 },
  ],
};

export function pickEncounter(locationId: string): { species: CreatureSpecies; level: number } | null {
  const table = ENCOUNTERS_BY_LOCATION[locationId];
  if (!table || table.length === 0) return null;
  const slot = weightedPick(table.map((s) => ({ value: s, weight: s.weight })));
  const level = randInt(slot.minLevel, slot.maxLevel);
  const species = SPECIES_REGISTRY[slot.speciesId];
  return { species, level };
}

// Convenience: directly get a generated wild creature for a location
export function generateEncounterForLocation(locationId: string): Creature | null {
  const pick = pickEncounter(locationId);
  if (!pick) return null;
  return generateWildCreature(pick.species, pick.level);
}

// Stat calculation (simple, Game Boy inspired but simplified)
export function calcStat(base: number, level: number): number {
  return Math.floor(((2 * base * level) / 100)) + 5;
}

export function calcHP(base: number, level: number): number {
  return Math.max(1, Math.floor(((2 * base * level) / 100)) + level + 10);
}

export function generateWildCreature(species: CreatureSpecies, level: number): Creature {
  const uid = `${species.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  // Random stat variance to make each wild creature unique (IV-like 0..5 bonus per non-HP stat)
  const baseHP = calcHP(species.baseStats.hp, level);
  const stats: Stats = {
    hp: baseHP,
    attack: calcStat(species.baseStats.attack, level) + randInt(0, 5),
    defense: calcStat(species.baseStats.defense, level) + randInt(0, 5),
    spAttack: calcStat(species.baseStats.spAttack, level) + randInt(0, 5),
    spDefense: calcStat(species.baseStats.spDefense, level) + randInt(0, 5),
    speed: calcStat(species.baseStats.speed, level) + randInt(0, 5),
  };
  const creature: Creature = {
    uid,
    speciesId: species.id,
    level,
    experience: 0,
    currentHP: stats.hp,
    stats,
    types: species.types,
    moves: [],
    status: "none",
  };
  return creature;
}

// Catch rate calculation
// Simplified formula inspired by classic games.
// Inputs:
// - target: creature with currentHP and stats.hp
// - ball: item with catchModifier (Master Ball represented with very high modifier or special id)
export function computeCatchChance(target: Creature, pokeball: PokeballItem): number {
  if (pokeball.name.toLowerCase().includes("master")) return 1; // always catch
  const species = SPECIES_REGISTRY[target.speciesId];
  const rate = species.catchRate ?? 255;
  const hp = Math.max(1, target.currentHP);
  const max = Math.max(1, target.stats.hp);
  const ballMod = Math.max(0.1, pokeball.catchModifier);
  // Status bonus
  const statusBonus = target.status === "sleep" || target.status === "freeze" ? 2 : target.status && target.status !== "none" ? 1.5 : 1;
  // Base chance roughly: higher when HP is low, higher catchRate, better ball, and status
  const base = (((3 * max - 2 * hp) * rate * ballMod) / (3 * max)) * statusBonus;
  // Normalize to 0..1 using 255 scale
  const chance = Math.max(0, Math.min(1, base / 255));
  return chance;
}

export function tryCatch(target: Creature, pokeball: PokeballItem): { caught: boolean; chance: number } {
  const p = computeCatchChance(target, pokeball);
  const roll = Math.random();
  return { caught: roll < p, chance: p };
}

