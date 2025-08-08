import { describe, it, expect } from 'vitest';
import { typeEffectiveness, stabBonus } from '../../battle/typeChart';
import { ElementType } from '../../types';

describe('type effectiveness and STAB', () => {
  it('computes effectiveness multipliers', () => {
    expect(typeEffectiveness(ElementType.Fire, [ElementType.Grass])).toBe(2);
    expect(typeEffectiveness(ElementType.Electric, [ElementType.Ground])).toBe(0);
    expect(typeEffectiveness(ElementType.Grass, [ElementType.Water])).toBe(2);
    expect(typeEffectiveness(ElementType.Water, [ElementType.Fire])).toBe(2);
    expect(typeEffectiveness(ElementType.Fire, [ElementType.Fire])).toBe(0.5);
  });

  it('applies STAB when attacker shares type', () => {
    expect(stabBonus(ElementType.Fire, [ElementType.Fire])).toBe(1.5);
    expect(stabBonus(ElementType.Fire, [ElementType.Grass])).toBe(1);
  });
});
