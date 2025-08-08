import { describe, it, expect } from 'vitest';
import { expForLevel, gainExperience } from '../../battle/experience';
import { BattleState, ElementType } from '../../types';

function makeState(): BattleState {
  return {
    id: 'exp1',
    sides: {
      player: {
        trainerName: 'You',
        activeIndex: 0,
        creatures: [
          {
            uid: 'p1',
            speciesId: 'flameling',
            nickname: 'Hero',
            level: 1,
            experience: 0,
            currentHP: 20,
            stats: { hp: 20, attack: 10, defense: 10, spAttack: 10, spDefense: 10, speed: 10 },
            types: [ElementType.Fire],
            moves: [],
            status: 'none',
            isFainted: false,
          },
        ],
      },
      enemy: {
        trainerName: 'Foe',
        activeIndex: 0,
        creatures: [
          {
            uid: 'e1',
            speciesId: 'sprout',
            nickname: 'Foe',
            level: 10,
            experience: 0,
            currentHP: 1,
            stats: { hp: 1, attack: 50, defense: 50, spAttack: 50, spDefense: 50, speed: 50 },
            types: [ElementType.Grass],
            moves: [],
            status: 'none',
            isFainted: true,
          },
        ],
      },
    },
    weather: 'none',
    turn: 1,
    phase: 'end',
    queue: [],
    log: [] as any,
  };
}

describe('experience and leveling', () => {
  it('computes exp thresholds', () => {
    expect(expForLevel(2)).toBe(4);
    expect(expForLevel(3)).toBe(14);
  });

  it('awards exp and levels up when threshold reached', () => {
    const state = makeState();
    const next = gainExperience(state, 'enemy');
    const hero = next.sides.player.creatures[0];
    expect(hero.experience).toBeGreaterThanOrEqual(expForLevel(2));
    expect(hero.level).toBeGreaterThanOrEqual(2);
  });
});
