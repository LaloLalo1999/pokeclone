import { useEffect, useMemo, useState } from "react";
import { Creature, ID, ItemKind } from "../types";
import { ITEMS } from "../data/items";
import { applyItemToCreatureOutsideBattle, listItemsByKind, removeItem, loadInventory } from "../inventory";

export function InventoryUI({ onClose }: { onClose: () => void }) {
  const [kind, setKind] = useState<ItemKind | "all">("all");
  const [team, setTeam] = useState<Creature[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("player.team");
      setTeam(raw ? JSON.parse(raw) : []);
    } catch { setTeam([]); }
  }, [version]);

  const items = useMemo(() => listItemsByKind(kind === "all" ? undefined : kind), [kind, version]);

  function useItem(itemId: ID, creatureIndex?: number) {
    const item = ITEMS[itemId];
    if (!item) return;

    if (item.kind === "pokeball") {
      setMessage("You can't use that here.");
      return;
    }

    if (creatureIndex == null) {
      // Ask to choose a creature if needed
      if (team.length === 0) { setMessage("You have no creatures."); return; }
      // default to first for simplicity; optional: open a selector
      creatureIndex = 0;
    }
    const c = { ...team[creatureIndex] };
    const res = applyItemToCreatureOutsideBattle(c, itemId);
    setMessage(res.message);
    if (res.ok) {
      const newTeam = team.slice();
      newTeam[creatureIndex] = c;
      try { localStorage.setItem("player.team", JSON.stringify(newTeam)); } catch {}
      removeItem(itemId, 1);
      setVersion(v => v + 1);
    }
  }

  const inv = loadInventory();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="w-full max-w-lg bg-gameboy-light border-4 border-gameboy-dark rounded p-3">
        <div className="flex items-center justify-between">
          <div className="font-bold">Bag</div>
          <button className="px-2 py-1 border-2 border-gameboy-dark rounded" onClick={onClose}>Close</button>
        </div>
        <div className="mt-2 flex gap-2 text-xs">
          {(["all","potion","pokeball","revive"] as const).map(k => (
            <button key={k} className={`border px-2 py-1 rounded ${kind===k? 'bg-gameboy-dark/10' : ''}`} onClick={()=>setKind(k as any)}>{String(k).toUpperCase()}</button>
          ))}
        </div>

        <div className="mt-3 grid gap-2">
          {items.length === 0 && (
            <div className="text-sm opacity-70">No items.</div>
          )}
          {items.map(({ item, quantity }) => (
            <div key={item.id} className="flex items-center justify-between border-2 border-gameboy-dark rounded px-2 py-1">
              <div>
                <div className="font-semibold">{item.name} x{quantity}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
              <button
                className="px-2 py-1 border-2 border-gameboy-dark rounded disabled:opacity-50"
                disabled={quantity<=0}
                onClick={()=>useItem(item.id)}
              >Use</button>
            </div>
          ))}
        </div>

        <div className="mt-3 text-xs opacity-80">Total different items: {inv.items.length}</div>
        {message && (
          <div className="mt-2 text-sm">{message}</div>
        )}
      </div>
    </div>
  );
}
