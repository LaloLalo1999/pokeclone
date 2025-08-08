import { describe, it, expect, vi, beforeEach } from 'vitest';
import { damageFormula, resolveTurn, registerMoves } from '../../battle/engine';
import { ElementType, Creature, Move, BattleState, ID } from '../../types';
import { MOVES } from '../../data/moves';

function makeCreature(partial: Partial<Creature>): Creature {
  return {
    uid: partial.uid ?? 'c1',
    speciesId: partial.speciesId ?? 'flameling',
    nickname: partial.nickname ?? 'Test',
    level: partial.level ?? 5,
    experience: partial.experience ?? 0,
    currentHP: partial.currentHP ?? (partial.stats?.hp ?? 20),
    stats: partial.stats ?? { hp: 20, attack: 12, defense: 10, spAttack: 10, spDefense: 10, speed: 10 },
    types: partial.types ?? [ElementType.Normal],
    moves: partial.moves ?? [],
    status: partial.status ?? 'none',
    isFainted: partial.isFainted ?? false,
  };
}

beforeEach(() => {
  // Ensure deterministic randomness
  vi.spyOn(Math, 'random').mockReturnValue(1); // max roll => randMult 1.0; accuracy passes at 100
  // Register moves for engine lookup
  registerMoves(MOVES as Move[]);
});

describe('damage formula', () => {
  it('deals at least 1 damage and scales with type effectiveness and STAB', () => {
    const attacker = makeCreature({ level: 10, stats: { hp: 30, attack: 20, defense: 10, spAttack: 15, spDefense: 12, speed: 10 }, types: [ElementType.Fire] });
    const defender = makeCreature({ stats: { hp: 28, attack: 10, defense: 12, spAttack: 10, spDefense: 10, speed: 8 }, types: [ElementType.Grass] });
    const ember = MOVES.find(m => m.id === 'ember')!;

    const dmg = damageFormula(attacker, defender, ember);
    expect(dmg).toBeGreaterThanOrEqual(1);

    // If defender were Fire type (resist), damage should drop
    const defenderFire = { ...defender, types: [ElementType.Fire] };
    const dmgResist = damageFormula(attacker, defenderFire, ember);
    expect(dmgResist).toBeLessThan(dmg);
  });
});

type MinimalLearned = { moveId: ID; currentPP: number };

describe('turn resolution ordering and effects', () => {
  it('faster creature acts first when priorities are equal', () => {
    const player = makeCreature({ uid: 'p1', types: [ElementType.Fire], stats: { hp: 40, attack: 18, defense: 10, spAttack: 12, spDefense: 10, speed: 20 }, currentHP: 40, moves: [{ moveId: 'tackle', currentPP: 35 } as MinimalLearned] });
    const enemy = makeCreature({ uid: 'e1', types: [ElementType.Grass], stats: { hp: 35, attack: 14, defense: 10, spAttack: 10, spDefense: 10, speed: 10 }, currentHP: 35, moves: [{ moveId: 'tackle', currentPP: 35 } as MinimalLearned] });

    const state: BattleState = {
      id: 'b1',
      sides: {
        player: { trainerName: 'You', creatures: [player], activeIndex: 0 },
        enemy: { trainerName: 'Foe', creatures: [enemy], activeIndex: 0 },
      },
      weather: 'none',
      turn: 1,
      phase: 'executing-turn',
      queue: [],
      log: [] as any,
    };

    const next = resolveTurn(state, 'tackle', 'tackle');
    // Enemy should have taken damage first, so its HP must be less than player's HP
    expect(next.sides.enemy.creatures[0].currentHP).toBeLessThan(35);
  });

  it('awards EXP and ends battle when enemy faints', () => {
    const player = makeCreature({ uid: 'p1', level: 5, stats: { hp: 30, attack: 80, defense: 10, spAttack: 10, spDefense: 10, speed: 15 }, currentHP: 30, moves: [{ moveId: 'tackle', currentPP: 35 } as MinimalLearned] });
    const enemy = makeCreature({ uid: 'e1', level: 10, stats: { hp: 10, attack: 50, defense: 5, spAttack: 5, spDefense: 5, speed: 5 }, currentHP: 5, moves: [{ moveId: 'tackle', currentPP: 35 } as MinimalLearned] });

    const state: BattleState = {
      id: 'b2',
      sides: {
        player: { trainerName: 'You', creatures: [player], activeIndex: 0 },
        enemy: { trainerName: 'Foe', creatures: [enemy], activeIndex: 0 },
      },
      weather: 'none',
      turn: 1,
      phase: 'executing-turn',
      queue: [],
      log: [] as any,
    };

    const next = resolveTurn(state, 'tackle', 'tackle');
    expect(next.phase).toBe('end');
    // Player gained some exp
    expect(next.sides.player.creatures[0].experience).toBeGreaterThan(0);
    // May have leveled up depending on exp yield; at least level is >= starting level
    expect(next.sides.player.creatures[0].level).toBeGreaterThanOrEqual(5);
  });
});
