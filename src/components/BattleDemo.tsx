import React from "react";
import BattleView from "./BattleView";
import { BattleState, ElementType } from "../game/types";

// Basic demo harness for manual testing inside the app
// Not wired automatically; import into a route or App to try

const demoState: BattleState = {
  id: "demo-battle",
  sides: {
    player: {
      trainerName: "You",
      activeIndex: 0,
      creatures: [
        {
          uid: "p1",
          speciesId: "Sprout",
          nickname: "Sprout",
          level: 5,
          experience: 0,
          currentHP: 20,
          stats: { hp: 20, attack: 10, defense: 8, spAttack: 9, spDefense: 8, speed: 10 },
          types: [ElementType.Grass],
          moves: [
            { moveId: "TACKLE", currentPP: 35 },
            { moveId: "VINE_WHIP", currentPP: 25 },
          ],
          status: "none",
          isFainted: false,
        },
      ],
    },
    enemy: {
      trainerName: "Rival",
      activeIndex: 0,
      creatures: [
        {
          uid: "e1",
          speciesId: "Ember",
          nickname: "Ember",
          level: 5,
          experience: 0,
          currentHP: 20,
          stats: { hp: 20, attack: 11, defense: 8, spAttack: 10, spDefense: 8, speed: 11 },
          types: [ElementType.Fire],
          moves: [
            { moveId: "SCRATCH", currentPP: 35 },
            { moveId: "EMBER", currentPP: 25 },
          ],
          status: "none",
          isFainted: false,
        },
      ],
    },
  },
  weather: "none",
  turn: 1,
  phase: "start",
  queue: [],
  log: [],
};

const moves = [
  { id: "TACKLE", name: "Tackle" },
  { id: "VINE_WHIP", name: "Vine Whip" },
  { id: "SCRATCH", name: "Scratch" },
  { id: "EMBER", name: "Ember" },
];

export default function BattleDemo() {
  const [state, setState] = React.useState<BattleState>(demoState);
  return <BattleView state={state} onStateChange={setState} movesData={moves} />;
}

