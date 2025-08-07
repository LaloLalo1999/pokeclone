import React from "react";
import { clamp } from "./utils";

export type HPBarProps = {
  current: number;
  max: number;
  className?: string;
};

export function HPBar({ current, max, className = "" }: HPBarProps) {
  const pct = clamp(Math.round((current / Math.max(1, max)) * 100), 0, 100);
  const color = pct > 50 ? "bg-gb-light" : pct > 20 ? "bg-yellow-400" : "bg-red-500";
  return (
    <div className={`gb-border h-3 w-full bg-gb-dark/40 ${className}`}>
      <div className={`${color} h-full`} style={{ width: `${pct}%` }} />
    </div>
  );
}

