// Simple type effectiveness chart and helpers
// Covers a subset of types; extend as needed
import { ElementType } from "../types";

// Effectiveness multipliers
// 2 = super effective, 0.5 = not very effective, 0 = no effect
const chart: Partial<Record<ElementType, Partial<Record<ElementType, number>>>> = {
  [ElementType.Fire]: {
    [ElementType.Grass]: 2,
    [ElementType.Ice]: 2,
    [ElementType.Bug]: 2,
    [ElementType.Steel]: 2,
    [ElementType.Fire]: 0.5,
    [ElementType.Water]: 0.5,
    [ElementType.Rock]: 0.5,
    [ElementType.Dragon]: 0.5,
  },
  [ElementType.Water]: {
    [ElementType.Fire]: 2,
    [ElementType.Rock]: 2,
    [ElementType.Ground]: 2,
    [ElementType.Water]: 0.5,
    [ElementType.Grass]: 0.5,
    [ElementType.Dragon]: 0.5,
  },
  [ElementType.Grass]: {
    [ElementType.Water]: 2,
    [ElementType.Ground]: 2,
    [ElementType.Rock]: 2,
    [ElementType.Fire]: 0.5,
    [ElementType.Grass]: 0.5,
    [ElementType.Poison]: 0.5,
    [ElementType.Flying]: 0.5,
    [ElementType.Bug]: 0.5,
    [ElementType.Dragon]: 0.5,
    [ElementType.Steel]: 0.5,
  },
  [ElementType.Electric]: {
    [ElementType.Water]: 2,
    [ElementType.Flying]: 2,
    [ElementType.Grass]: 0.5,
    [ElementType.Electric]: 0.5,
    [ElementType.Dragon]: 0.5,
    [ElementType.Ground]: 0, // immune
  },
  [ElementType.Poison]: {
    [ElementType.Grass]: 2,
    [ElementType.Poison]: 0.5,
    [ElementType.Ground]: 0.5,
    [ElementType.Rock]: 0.5,
    [ElementType.Ghost]: 0.5,
    [ElementType.Steel]: 0,
  },
  [ElementType.Normal]: {
    [ElementType.Rock]: 0.5,
    [ElementType.Ghost]: 0,
    [ElementType.Steel]: 0.5,
  },
};

export function typeEffectiveness(moveType: ElementType, targetTypes: ElementType[]): number {
  let mult = 1;
  for (const t of targetTypes) {
    const entry = chart[moveType]?.[t];
    if (typeof entry === "number") mult *= entry;
  }
  return mult;
}

export function stabBonus(moveType: ElementType, attackerTypes: ElementType[]): number {
  return attackerTypes.includes(moveType) ? 1.5 : 1;
}

