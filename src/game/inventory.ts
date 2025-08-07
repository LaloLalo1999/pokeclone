import { Creature, ID, Inventory, Item, ItemKind, PokeballItem, PotionItem, ReviveItem } from "./types";
import { ITEMS } from "./data/items";

const INV_KEY = "player.inventory";
const MONEY_KEY = "player.money";

export function loadInventory(): Inventory {
  try {
    const raw = localStorage.getItem(INV_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { items: [] };
}

export function saveInventory(inv: Inventory) {
  try { localStorage.setItem(INV_KEY, JSON.stringify(inv)); } catch {}
}

export function getMoney(): number {
  try {
    const raw = localStorage.getItem(MONEY_KEY);
    if (!raw) return 0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  } catch { return 0; }
}

export function setMoney(amount: number) {
  try { localStorage.setItem(MONEY_KEY, String(Math.max(0, Math.floor(amount)))); } catch {}
}

export function addMoney(amount: number) {
  setMoney(getMoney() + Math.max(0, amount));
}

export function spendMoney(amount: number): boolean {
  const have = getMoney();
  if (amount > have) return false;
  setMoney(have - amount);
  return true;
}

export function addItem(itemId: ID, qty = 1) {
  const inv = loadInventory();
  const entry = inv.items.find(i => i.itemId === itemId);
  if (entry) entry.quantity += qty;
  else inv.items.push({ itemId, quantity: qty });
  saveInventory(inv);
}

export function removeItem(itemId: ID, qty = 1): boolean {
  const inv = loadInventory();
  const entry = inv.items.find(i => i.itemId === itemId);
  if (!entry || entry.quantity < qty) return false;
  entry.quantity -= qty;
  if (entry.quantity <= 0) inv.items = inv.items.filter(i => i.itemId !== itemId);
  saveInventory(inv);
  return true;
}

export function listItemsByKind(kind?: ItemKind): Array<{ item: Item; quantity: number }> {
  const inv = loadInventory();
  return inv.items
    .map(e => ({ item: ITEMS[e.itemId], quantity: e.quantity }))
    .filter(e => !!e.item && (kind ? e.item.kind === kind : true));
}

// Apply item effects to a target creature (out of battle)
export function applyItemToCreatureOutsideBattle(creature: Creature, itemId: ID): { ok: boolean; message: string } {
  const item = ITEMS[itemId];
  if (!item) return { ok: false, message: "Unknown item." };

  switch (item.kind) {
    case "potion": {
      const p = item as PotionItem;
      if (creature.isFainted || creature.currentHP <= 0) return { ok: false, message: "It won't have any effect." };
      const before = creature.currentHP;
      creature.currentHP = Math.min(creature.stats.hp, creature.currentHP + p.healAmount);
      if (creature.currentHP === before) return { ok: false, message: "HP is already full." };
      return { ok: true, message: `Restored ${creature.currentHP - before} HP!` };
    }
    case "revive": {
      const r = item as ReviveItem;
      if (!creature.isFainted && creature.currentHP > 0) return { ok: false, message: "It won't have any effect." };
      const restored = Math.max(1, Math.floor(creature.stats.hp * r.revivePercent));
      creature.currentHP = restored;
      creature.isFainted = false;
      return { ok: true, message: `Revived with ${restored} HP!` };
    }
    case "pokeball": {
      // Not usable out of battle
      return { ok: false, message: "You can't use that here." };
    }
    default:
      return { ok: false, message: "It had no effect." };
  }
}

// Purchase API
export function buyItem(itemId: ID, price: number): { ok: boolean; message: string } {
  if (!spendMoney(price)) return { ok: false, message: "Not enough money." };
  addItem(itemId, 1);
  return { ok: true, message: "Thank you!" };
}
