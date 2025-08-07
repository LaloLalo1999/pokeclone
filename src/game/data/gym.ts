import { BattleState, Creature, ID, LearnedMove, Move, ParticipantSide, Player } from "../types";
import { createCreature } from "./species";
import { MOVES } from "./moves";
import { registerMoves } from "../battle/engine";

export type GymLeader = {
  id: string;
  name: string;
  badgeId: string;
  team: Creature[];
  introText: string;
  victoryText: string;
};

// Helper to give a creature a moveset by move ids
function withMoves(creature: Creature, moveIds: ID[]): Creature {
  creature.moves = moveIds.map((id) => {
    const m = MOVES.find((x) => x.id === id)!;
    return { moveId: m.id, currentPP: m.pp } satisfies LearnedMove;
  });
  return creature;
}

// Register moves in engine registry once
registerMoves(MOVES);

export const FIRST_GYM_LEADER: GymLeader = {
  id: "ember_gym_leader",
  name: "Blaze",
  badgeId: "EMBER_BADGE",
  introText: "I am Blaze, the Ember Gym Leader! Show me your fighting spirit!",
  victoryText: "Impressive! You've earned the Ember Badge.",
  team: [
    withMoves(createCreature("g1", "flameling", 7), ["tackle", "ember"]),
    withMoves(createCreature("g2", "flameling", 9), ["tackle", "ember"]),
  ],
};

export function createGymBattle(playerSide: ParticipantSide, leader: GymLeader): BattleState {
  return {
    id: "gym-" + leader.id,
    sides: {
      player: { ...playerSide },
      enemy: { trainerName: leader.name, creatures: leader.team.map((c) => ({ ...c })), activeIndex: 0 },
    },
    weather: "none",
    turn: 1,
    phase: "start",
    queue: [],
    log: [],
  };
}

