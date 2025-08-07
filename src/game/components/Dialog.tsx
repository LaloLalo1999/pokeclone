import { useEffect, useState } from "react";
import { GymLeader } from "../data/gym";

export function Dialog({ text, onClose }: { text: string; onClose: () => void }) {
  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") onClose();
    }
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center">
      <div className="w-full max-w-xl bg-gameboy-light border-4 border-gameboy-dark rounded p-3 m-2 text-sm">
        <div className="whitespace-pre-wrap">{text}</div>
        <div className="text-right mt-2 opacity-70">Press Enter</div>
      </div>
    </div>
  );
}

export function VictoryDialog({ leader, onClose }: { leader: GymLeader; onClose: () => void }) {
  return <Dialog text={`${leader.name}: ${leader.victoryText}`} onClose={onClose} />;
}

