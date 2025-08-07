import React, { useMemo, useState } from "react";
import { BattleState, ID } from "../game/types";
import { resolveTurn, registerMoves } from "../game/battle/engine";

// Basic transition CSS classes are expected to be handled by Tailwind
// e.g., animate-pulse or transition-opacity

type Props = {
  state: BattleState;
  onStateChange: (s: BattleState) => void;
  // Provide static move data at mount
  movesData: { id: ID; name: string }[];
};

export default function BattleView({ state, onStateChange, movesData }: Props) {
  // Register moves once
  useMemo(() => {
    registerMoves(
      movesData.map((m) => ({
        id: m.id,
        name: m.name,
        type: state.sides.player.creatures[state.sides.player.activeIndex].types[0],
        category: "physical",
        power: 40,
        accuracy: 95,
        pp: 35,
        maxPP: 35,
      })) as any
    );
  }, [movesData]);

  const [selected, setSelected] = useState<ID | null>(null);

  const player = state.sides.player.creatures[state.sides.player.activeIndex];
  const enemy = state.sides.enemy.creatures[state.sides.enemy.activeIndex];

  function handleChoose(moveId: ID) {
    setSelected(moveId);
    // For demo, enemy picks first move with PP
    const enemyMove = enemy.moves.find((m) => m.currentPP > 0)?.moveId ?? enemy.moves[0].moveId;
    const next = resolveTurn(state, moveId, enemyMove);
    onStateChange(next);
    setSelected(null);
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 text-gb-darker">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="gb-panel p-2">
            <div className="font-bold">{player.nickname ?? player.speciesId} Lv {player.level}</div>
            <div className="text-xs capitalize">{player.status ?? "none"}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="gb-panel p-2">
            <div className="font-bold">{enemy.nickname ?? enemy.speciesId} Lv {enemy.level}</div>
            <div className="text-xs capitalize">{enemy.status ?? "none"}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="gb-panel p-2 flex items-end justify-center">
          <img src="/src/assets/gb/sprites/creature_sprout.svg" className="pixelated" width={96} height={96} />
        </div>
        <div className="gb-panel p-2 flex items-end justify-center">
          <img src="/src/assets/gb/sprites/creature_ember.svg" className="pixelated" width={96} height={96} />
        </div>
      </div>

      <div className="mt-4 gb-dialog h-24 overflow-y-auto">
        {state.log.slice(-6).map((l, idx) => (
          <div key={idx}>{l.text ?? l}</div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {player.moves.map((lm, idx) => {
          const disabled = lm.currentPP <= 0 || state.phase === "end";
          return (
            <button
              key={lm.moveId}
              onClick={() => handleChoose(lm.moveId)}
              disabled={disabled}
              className={`gb-button text-left ${selected === lm.moveId ? "ring-2 ring-gb-light" : ""}`}
            >
              <div className="flex justify-between">
                <span>{movesData.find((m) => m.id === lm.moveId)?.name ?? lm.moveId}</span>
                <span className="text-xs">PP {lm.currentPP}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

