import { BattleState, Creature, ElementType, ID, LearnedMove, Move, ParticipantSide, QueuedAction, StatusCondition } from "../types";
import { stabBonus, typeEffectiveness } from "./typeChart";
import { gainExperience } from "./experience";

// RNG helper with seedable fallback
function rand(): number {
  return Math.random();
}

export function isFainted(c: Creature): boolean {
  return c.currentHP <= 0;
}

export function accuracyCheck(acc: number | null): boolean {
  if (acc === null) return true;
  return rand() * 100 < acc; // 0..99.999 < acc
}

export function computeTurnPriority(attacker: Creature, move: Move): number {
  // Lower value resolves first: negative = higher priority
  const base = -(move.priority ?? 0);
  const speedTiebreaker = -attacker.stats.speed / 1000; // minor fraction to stabilize order
  // Paralysis speed drop applied here for order only
  const paralyzed = attacker.status === "paralysis";
  const effSpeed = paralyzed ? Math.floor(attacker.stats.speed / 2) : attacker.stats.speed;
  return base + -effSpeed; // higher speed => more negative => earlier
}

export function damageFormula(attacker: Creature, defender: Creature, move: Move): number {
  if (move.power == null || move.power <= 0) return 0;
  const level = attacker.level;
  const A = attacker.stats.attack;
  const D = defender.stats.defense;
  const power = move.power;
  const base = Math.floor(Math.floor((2 * level) / 5 + 2) * power * (A / Math.max(1, D)) / 50) + 2;
  const stab = stabBonus(move.type as ElementType, attacker.types);
  const typeMult = typeEffectiveness(move.type as ElementType, defender.types);
  const randMult = 0.85 + rand() * 0.15; // 0.85 - 1.0
  const total = Math.floor(base * stab * typeMult * randMult);
  return Math.max(1, total);
}

export function endTurnStatusTick(c: Creature, log: string[]): void {
  switch (c.status) {
    case "poison":
      {
        const dmg = Math.max(1, Math.floor(c.stats.hp * 0.0625));
        c.currentHP = Math.max(0, c.currentHP - dmg);
        log.push(`${c.nickname ?? "Foe"} is hurt by poison! (-${dmg})`);
      }
      break;
    // basic sleep: handled via a hidden counter stored in confusion? or temp map elsewhere
    default:
      break;
  }
}

export type TurnResolution = {
  newState: BattleState;
};

export function getActive(side: ParticipantSide): Creature {
  return side.creatures[side.activeIndex];
}

export function spendPP(creature: Creature, learned: LearnedMove): void {
  if (learned.currentPP > 0) learned.currentPP -= 1;
}

export function findMove(moveId: ID, moves: Move[]): Move | undefined {
  return moves.find((m) => m.id === moveId);
}

export function getAccuracy(move: Move, status?: StatusCondition): number | null {
  if (move.accuracy == null) return null;
  // simple paralysis accuracy drop
  const acc = status === "paralysis" ? Math.max(1, Math.floor(move.accuracy * 0.9)) : move.accuracy;
  return acc;
}

export function applyStatusInfliction(target: Creature, move: Move, log: string[]): void {
  if (!move.effectId) return;
  // Simple mapping for demo: effectId equals status name
  const effect = move.effectId as StatusCondition;
  if (target.status && target.status !== "none" && target.status !== undefined) return;
  if (["poison", "paralysis", "sleep"].includes(effect)) {
    // 30% base chance unless accuracy is null indicates sure thing
    const chance = 0.3;
    if (rand() < chance) {
      target.status = effect;
      log.push(`${target.nickname ?? "The foe"} is afflicted with ${effect}!`);
    }
  }
}

export function canAct(creature: Creature, log: string[]): boolean {
  if (creature.isFainted || creature.currentHP <= 0) return false;
  if (creature.status === "sleep") {
    // Simple 1/3 chance to wake each turn
    if (rand() < 1 / 3) {
      creature.status = "none";
      log.push(`${creature.nickname ?? "Creature"} woke up!`);
      return true;
    }
    log.push(`${creature.nickname ?? "Creature"} is fast asleep...`);
    return false;
  }
  if (creature.status === "paralysis") {
    if (rand() < 0.25) {
      log.push(`${creature.nickname ?? "Creature"} is paralyzed! It can't move!`);
      return false;
    }
  }
  return true;
}

export function executeMove(attacker: Creature, defender: Creature, learned: LearnedMove, move: Move, log: string[]): void {
  // spend PP
  spendPP(attacker, learned);
  if (!canAct(attacker, log)) return;
  const acc = getAccuracy(move, attacker.status);
  if (!accuracyCheck(acc)) {
    log.push(`${attacker.nickname ?? "Creature"}'s ${move.name} missed!`);
    return;
  }
  if (move.power && move.power > 0) {
    const dmg = damageFormula(attacker, defender, move);
    defender.currentHP = Math.max(0, defender.currentHP - dmg);
    log.push(`${attacker.nickname ?? "Creature"} used ${move.name}! It dealt ${dmg} damage.`);
    const typeMult = typeEffectiveness(move.type as ElementType, defender.types);
    if (typeMult >= 2) log.push("It's super effective!");
    else if (typeMult === 0) log.push("It had no effect...");
    else if (typeMult > 0 && typeMult < 1) log.push("It's not very effective...");
    if (defender.currentHP <= 0) {
      defender.isFainted = true;
      log.push(`${defender.nickname ?? "Foe"} fainted!`);
    }
  }
  applyStatusInfliction(defender, move, log);
}

export function computeOrder(state: BattleState, playerMoveId: ID, enemyMoveId: ID): QueuedAction[] {
  const player = getActive(state.sides.player);
  const enemy = getActive(state.sides.enemy);
  const playerMove = state.sides.player.creatures[state.sides.player.activeIndex].moves.find(m => m.moveId === playerMoveId)!;
  const enemyMove = state.sides.enemy.creatures[state.sides.enemy.activeIndex].moves.find(m => m.moveId === enemyMoveId)!;
  const playerBase = state.sides.player; // just for typing
  const enemyBase = state.sides.enemy;
  const moveDataLookup = (id: ID): Move | undefined => stateMovesIndex(state)[id];
  const pm = moveDataLookup(playerMoveId);
  const em = moveDataLookup(enemyMoveId);
  const pPriority = computeTurnPriority(player, pm!);
  const ePriority = computeTurnPriority(enemy, em!);
  const actions: QueuedAction[] = [
    {
      action: {
        kind: "move",
        actorSide: "player",
        actorIndex: state.sides.player.activeIndex,
        moveId: playerMoveId,
        targetSide: "enemy",
        targetIndex: state.sides.enemy.activeIndex,
      },
      priority: pPriority,
    },
    {
      action: {
        kind: "move",
        actorSide: "enemy",
        actorIndex: state.sides.enemy.activeIndex,
        moveId: enemyMoveId,
        targetSide: "player",
        targetIndex: state.sides.player.activeIndex,
      },
      priority: ePriority,
    },
  ];
  actions.sort((a, b) => a.priority - b.priority);
  return actions;
}

// Simple in-memory move index to resolve MoveId -> Move data.
// In your project, you might have a separate data module. Here we attach a lightweight registry.
const MOVE_REGISTRY: Record<ID, Move> = {} as any;
export function registerMoves(moves: Move[]) {
  for (const m of moves) MOVE_REGISTRY[m.id] = m;
}
export function stateMovesIndex(_state: BattleState): Record<ID, Move> {
  return MOVE_REGISTRY;
}

export function resolveTurn(state: BattleState, playerMoveId: ID, enemyMoveId: ID): BattleState {
  const next: BattleState = JSON.parse(JSON.stringify(state));
  next.log = [...next.log];

  const order = computeOrder(next, playerMoveId, enemyMoveId);
  for (const entry of order) {
    if (next.sides.player.creatures[next.sides.player.activeIndex].isFainted) break;
    if (next.sides.enemy.creatures[next.sides.enemy.activeIndex].isFainted) break;

    const actorSide = entry.action.actorSide === "player" ? next.sides.player : next.sides.enemy;
    const targetSide = entry.action.actorSide === "player" ? next.sides.enemy : next.sides.player;
    const actor = getActive(actorSide);
    const target = getActive(targetSide);

    const learned = actor.moves.find((lm) => lm.moveId === entry.action.moveId);
    const move = stateMovesIndex(next)[entry.action.moveId];
    if (!learned || !move) {
      next.log.push("But it failed!");
      continue;
    }
    if (learned.currentPP <= 0) {
      next.log.push(`${actor.nickname ?? "Creature"} has no PP left for ${move.name}!`);
      continue;
    }

    executeMove(actor, target, learned, move, next.log);
  }

  // End-turn residuals
  endTurnStatusTick(next.sides.player.creatures[next.sides.player.activeIndex], next.log);
  endTurnStatusTick(next.sides.enemy.creatures[next.sides.enemy.activeIndex], next.log);

  // Determine outcome
  const pOut = next.sides.player.creatures[next.sides.player.activeIndex].isFainted;
  const eOut = next.sides.enemy.creatures[next.sides.enemy.activeIndex].isFainted;

  if (eOut && !pOut) {
    // Player wins: award EXP to player's active creature
    const gained = gainExperience(next, "enemy");
    gained.phase = "end";
    gained.turn += 1;
    return gained;
  }
  if (pOut && !eOut) {
    // Enemy wins: optionally award EXP to enemy (skipped for now)
    next.phase = "end";
    next.turn += 1;
    return next;
  }

  next.turn += 1;
  return next;
}

