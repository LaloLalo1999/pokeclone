import { describe, it, expect } from 'vitest';
import { computeCatchChance } from '../encounters';
import { Creature, ElementType, PokeballItem } from '../types';

const makeTarget = (over: Partial<Creature> = {}): Creature => ({
  uid: 't1',
  speciesId: 'sprout',
  nickname: 'Wild',
  level: 5,
  experience: 0,
  stats: { hp: 20, attack: 10, defense: 10, spAttack: 10, spDefense: 10, speed: 10 },
  currentHP: 20,
  types: [ElementType.Grass],
  moves: [],
  status: 'none',
  isFainted: false,
  ...over,
});

const ball = (name: string, mod: number): PokeballItem => ({ id: name.toLowerCase(), name, kind: 'pokeball', catchModifier: mod });

describe('catch rate calculations', () => {
  it('gives higher chance at lower HP and with better balls', () => {
    const full = makeTarget({ currentHP: 20, stats: { hp: 20, attack: 10, defense: 10, spAttack: 10, spDefense: 10, speed: 10 } });
    const low = makeTarget({ currentHP: 1, stats: { hp: 20, attack: 10, defense: 10, spAttack: 10, spDefense: 10, speed: 10 } });

    const pokeball = ball('Poke Ball', 1);
    const great = ball('Great Ball', 1.5);

    const pFull = computeCatchChance(full, pokeball);
    const pLow = computeCatchChance(low, pokeball);
    const pGreatLow = computeCatchChance(low, great);

    expect(pLow).toBeGreaterThan(pFull);
    expect(pGreatLow).toBeGreaterThan(pLow);
  });

  it('master ball yields 100% chance', () => {
    const target = makeTarget({ currentHP: 5 });
    const master = ball('Master Ball', 1);
    expect(computeCatchChance(target, master)).toBe(1);
  });
});
