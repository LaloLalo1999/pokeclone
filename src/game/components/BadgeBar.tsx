import { useEffect, useState } from "react";

export function BadgeBar() {
  const [badges, setBadges] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("player.badges");
      if (raw) setBadges(JSON.parse(raw));
    } catch {}
  }, []);
  return (
    <div className="flex gap-2 text-xs">
      {badges.length === 0 ? (
        <span className="opacity-70">No badges</span>
      ) : (
        badges.map((b) => (
          <span key={b} className="px-2 py-0.5 border-2 border-gameboy-dark rounded bg-gameboy-light">{b.replace(/_/g, " ")}</span>
        ))
      )}
    </div>
  );
}

