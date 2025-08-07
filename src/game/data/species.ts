import { Creature, CreatureSpecies, ElementType, ID, Player } from "../types";

export const SPECIES: CreatureSpecies[] = [
  {
    id: "flameling",
    name: "Flameling",
    types: [ElementType.Fire],
    baseStats: { hp: 39, attack: 52, defense: 43, spAttack: 60, spDefense: 50, speed: 65 },
  },
  {
    id: "sproutle",
    name: "Sproutle",
    types: [ElementType.Grass],
    baseStats: { hp: 45, attack: 49, defense: 49, spAttack: 65, spDefense: 65, speed: 45 },
  },
  {
    id: "aquabub",
    name: "Aquabub",
    types: [ElementType.Water],
    baseStats: { hp: 44, attack: 48, defense: 65, spAttack: 50, spDefense: 64, speed: 43 },
  },
];

export function createCreature(uid: ID, speciesId: ID, level: number): Creature {
  const species = SPECIES.find(s => s.id === speciesId)!;
  // simple stat calc: base + level scaling
  const stats = {
    hp: species.baseStats.hp + level,
    attack: species.baseStats.attack + Math.floor(level * 0.5),
    defense: species.baseStats.defense + Math.floor(level * 0.5),
    spAttack: species.baseStats.spAttack + Math.floor(level * 0.5),
    spDefense: species.baseStats.spDefense + Math.floor(level * 0.5),
    speed: species.baseStats.speed + Math.floor(level * 0.5),
  };
  return {
    uid,
    speciesId,
    nickname: species.name,
    level,
    experience: 0,
    currentHP: stats.hp,
    stats,
    types: species.types,
    moves: [],
    status: "none",
    isFainted: false,
  };
}

