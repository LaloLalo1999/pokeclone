import React from "react";
import { BattleState, ID } from "../../game/types";
import { registerMoves, resolveTurn } from "../../game/battle/engine";
import { BattleCard } from "./BattleCard";
import { DialogBox } from "./DialogBox";
import { Menu } from "./Menu";

export type GBBattleUIProps = {
  state: BattleState;
  onStateChange: (s: BattleState) => void;
  movesData: { id: ID; name: string }[];
};

export function GBBattleUI({ state, onStateChange, movesData }: GBBattleUIProps) {
  React.useMemo(() => {
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

  const player = state.sides.player.creatures[state.sides.player.activeIndex];
  const enemy = state.sides.enemy.creatures[state.sides.enemy.activeIndex];

  function handleChoose(moveId: ID) {
    const enemyMove = enemy.moves.find((m) => m.currentPP > 0)?.moveId ?? enemy.moves[0].moveId;
    const next = resolveTurn(state, moveId, enemyMove);
    onStateChange(next);
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 text-gb-darker font-gb">
      <div className="grid grid-cols-2 gap-4">
        <BattleCard
          name={player.nickname ?? player.speciesId}
          level={player.level}
          currentHP={player.currentHP}
          maxHP={player.stats.hp}
          status={player.status}
          spriteSrc="/src/assets/gb/sprites/creature_sprout.svg"
          align="left"
        />
        <BattleCard
          name={enemy.nickname ?? enemy.speciesId}
          level={enemy.level}
          currentHP={enemy.currentHP}
          maxHP={enemy.stats.hp}
          status={enemy.status}
          spriteSrc="/src/assets/gb/sprites/creature_ember.svg"
          align="right"
        />
      </div>

      <div className="mt-4">
        <DialogBox text={(state.log.at(-1) as any)?.text ?? "A wild battle begins!"} />
      </div>

      <div className="mt-4">
        <Menu
          columns={2}
          items={state.sides.player.creatures[state.sides.player.activeIndex].moves.map((lm) => ({
            id: String(lm.moveId),
            label: `${movesData.find((m) => m.id === lm.moveId)?.name ?? lm.moveId}  PP ${lm.currentPP}`,
            disabled: lm.currentPP <= 0,
          }))}
          onSelect={(id) => handleChoose(id as ID)}
        />
      </div>
    </div>
  );
}

