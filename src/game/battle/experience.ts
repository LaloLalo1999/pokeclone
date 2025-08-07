import { BattleState } from "../types";

// Simple experience and leveling utilities
// XP curve: fast linear for demo: nextLevelExp = level^3 simplified scaling

export function expForLevel(level: number): number {
  return Math.floor(level * level * level * 0.5); // tuned for small numbers
}

export function gainExperience(state: BattleState, defeated: "player" | "enemy"): BattleState {
  const next: BattleState = JSON.parse(JSON.stringify(state));
  const winnerSide = defeated === "player" ? "enemy" : "player";
  const winner = next.sides[winnerSide].creatures[next.sides[winnerSide].activeIndex];
  const loser = next.sides[defeated].creatures[next.sides[defeated].activeIndex];

  // Base yield: species base stat sum as a proxy if we don't have growth tables
  const baseYield = loser.stats.attack + loser.stats.defense + loser.stats.spAttack + loser.stats.spDefense + loser.stats.speed;
  const expGain = Math.max(1, Math.floor((baseYield * loser.level) / 10));

  winner.experience += expGain;
  next.log.push(`${winner.nickname ?? winner.speciesId} gained ${expGain} EXP!`);

  // Level up loop
  while (winner.level < 100 && winner.experience >= expForLevel(winner.level + 1)) {
    winner.level += 1;
    // Simple stat increases
    winner.stats.attack += 2;
    winner.stats.defense += 2;
    winner.stats.spAttack += 2;
    winner.stats.spDefense += 2;
    winner.stats.speed += 2;
    winner.stats.hp += 4;
    winner.currentHP += 4;
    next.log.push(`${winner.nickname ?? winner.speciesId} grew to Lv. ${winner.level}!`);
  }

  return next;
}

