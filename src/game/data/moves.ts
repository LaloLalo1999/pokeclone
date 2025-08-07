import { ElementType, ID, Move } from "../types";

export const MOVES: Move[] = [
  {
    id: "tackle",
    name: "Tackle",
    type: ElementType.Normal,
    category: "physical",
    power: 40,
    accuracy: 95,
    pp: 35,
    maxPP: 35,
    description: "A physical attack in which the user charges and slams into the target.",
  },
  {
    id: "ember",
    name: "Ember",
    type: ElementType.Fire,
    category: "special",
    power: 40,
    accuracy: 100,
    pp: 25,
    maxPP: 25,
    description: "The target is attacked with small flames.",
  },
  {
    id: "vinewhip",
    name: "Vine Whip",
    type: ElementType.Grass,
    category: "physical",
    power: 45,
    accuracy: 100,
    pp: 25,
    maxPP: 25,
    description: "The target is struck with slender, whiplike vines.",
  },
  {
    id: "watergun",
    name: "Water Gun",
    type: ElementType.Water,
    category: "special",
    power: 40,
    accuracy: 100,
    pp: 25,
    maxPP: 25,
    description: "The target is blasted with a forceful shot of water.",
  },
];

