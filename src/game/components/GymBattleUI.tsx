import { useEffect, useState } from "react";
import { BattleState, ID } from "../types";
import { resolveTurn } from "../battle/engine";
import { MOVES } from "../data/moves";

// Enforces: no items; KO rules: when active faints, auto-lose (simple 1v1)
export function GymBattleUI({ initial, onEnd }: { initial: BattleState; onEnd: (result: { winner: "player" | "enemy"; state: BattleState }) => void }) {
  const [state, setState] = useState<BattleState>(initial);
  const playerActive = state.sides.player.creatures[state.sides.player.activeIndex];
  const enemyActive = state.sides.enemy.creatures[state.sides.enemy.activeIndex];

  const playerMoves = playerActive.moves.map((lm) => MOVES.find((m) => m.id === lm.moveId)!).filter(Boolean);
  const enemyMoveChoice: ID = enemyActive.moves[0]?.moveId ?? playerMoves[0]?.id ?? "tackle";

  useEffect(() => {
    if (playerActive.isFainted || enemyActive.isFainted) {
      const winner = enemyActive.isFainted && !playerActive.isFainted ? "player" : playerActive.isFainted && !enemyActive.isFainted ? "enemy" : undefined;
      if (winner) onEnd({ winner, state });
    }
  }, [state]);

  function pickMove(moveId: ID) {
    const next = resolveTurn(state, moveId, enemyMoveChoice);
    setState(next);
  }

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-xl bg-gameboy-light border-4 border-gameboy-dark rounded p-3 m-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="font-bold">{playerActive.nickname}</div>
            <div className="h-2 bg-gameboy-dark/20 rounded">
              <div className="h-2 bg-green-600 rounded" style={{ width: `${Math.max(0, Math.floor((playerActive.currentHP / playerActive.stats.hp) * 100))}%` }} />
            </div>
            <div className="text-xs">HP {playerActive.currentHP}/{playerActive.stats.hp}</div>
          </div>
          <div className="text-right">
            <div className="font-bold">{state.sides.enemy.trainerName ?? "Enemy"}</div>
            <div>{enemyActive.nickname}</div>
            <div className="h-2 bg-gameboy-dark/20 rounded">
              <div className="h-2 bg-red-600 rounded" style={{ width: `${Math.max(0, Math.floor((enemyActive.currentHP / enemyActive.stats.hp) * 100))}%` }} />
            </div>
            <div className="text-xs">HP {enemyActive.currentHP}/{enemyActive.stats.hp}</div>
          </div>
        </div>
        <div className="mt-2 border-t border-gameboy-dark/30 pt-2">
          <div className="grid grid-cols-2 gap-2">
            {playerMoves.map((m) => (
              <button key={m.id} className="border-2 border-gameboy-dark rounded px-2 py-1 hover:bg-gameboy-dark/10 disabled:opacity-50" onClick={() => pickMove(m.id)} disabled={playerActive.isFainted}>
                <div className="font-semibold">{m.name}</div>
                <div className="text-xs opacity-70">{m.type} | PP {playerActive.moves.find((lm) => lm.moveId === m.id)?.currentPP}/{m.pp}</div>
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs opacity-70">No items allowed in gym battles.</div>
        </div>
        <div className="mt-2 text-xs whitespace-pre-wrap">
          {state.log.map((l, i) => (
            <div key={i}>{typeof l === "string" ? l : (l as any).text ?? String(l)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

