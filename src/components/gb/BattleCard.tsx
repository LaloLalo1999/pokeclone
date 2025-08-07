import React from "react";
import { HPBar } from "./HPBar";
import { PixelSprite } from "./PixelSprite";

export type BattleCardProps = {
  name: string;
  level: number;
  currentHP: number;
  maxHP: number;
  status?: string;
  spriteSrc: string;
  align?: "left" | "right";
};

export function BattleCard({ name, level, currentHP, maxHP, status = "none", spriteSrc, align = "left" }: BattleCardProps) {
  return (
    <div className={`gb-panel p-2 ${align === "right" ? "text-right" : ""}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="font-bold">{name} Lv {level}</div>
        <div className="text-xs capitalize">{status}</div>
      </div>
      <HPBar current={currentHP} max={maxHP} />
      <div className={`mt-2 ${align === "right" ? "flex justify-end" : ""}`}>
        <PixelSprite src={spriteSrc} size={96} />
      </div>
    </div>
  );
}

