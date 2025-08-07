import { Creature } from "./types";

export type PCConfig = {
  boxCapacity: number; // slots per box
  maxBoxes: number; // total boxes allowed
};

export type PCState = {
  boxes: Array<{ name: string; slots: Array<Creature | null> }>;
};

const DEFAULT_CONFIG: PCConfig = { boxCapacity: 30, maxBoxes: 8 };

export function createPC(config: Partial<PCConfig> = {}): PCState {
  const { boxCapacity, maxBoxes } = { ...DEFAULT_CONFIG, ...config };
  return {
    boxes: new Array(maxBoxes).fill(0).map((_, i) => ({
      name: `Box ${i + 1}`,
      slots: new Array(boxCapacity).fill(null),
    })),
  };
}

export function findFirstOpenSlot(pc: PCState): { boxIndex: number; slotIndex: number } | null {
  for (let b = 0; b < pc.boxes.length; b++) {
    const box = pc.boxes[b];
    const idx = box.slots.findIndex((s) => s === null);
    if (idx !== -1) return { boxIndex: b, slotIndex: idx };
  }
  return null;
}

export function deposit(pc: PCState, mon: Creature): { boxIndex: number; slotIndex: number } | null {
  const open = findFirstOpenSlot(pc);
  if (!open) return null;
  pc.boxes[open.boxIndex].slots[open.slotIndex] = mon;
  return open;
}

export function withdraw(pc: PCState, boxIndex: number, slotIndex: number): Creature | null {
  const box = pc.boxes[boxIndex];
  if (!box) return null;
  const mon = box.slots[slotIndex];
  if (!mon) return null;
  box.slots[slotIndex] = null;
  return mon;
}

export function moveWithinPC(
  pc: PCState,
  from: { boxIndex: number; slotIndex: number },
  to: { boxIndex: number; slotIndex: number }
): boolean {
  const src = pc.boxes[from.boxIndex];
  const dst = pc.boxes[to.boxIndex];
  if (!src || !dst) return false;
  const mon = src.slots[from.slotIndex];
  if (!mon) return false;
  if (dst.slots[to.slotIndex] !== null) return false;
  dst.slots[to.slotIndex] = mon;
  src.slots[from.slotIndex] = null;
  return true;
}

export function renameBox(pc: PCState, boxIndex: number, name: string): boolean {
  const box = pc.boxes[boxIndex];
  if (!box) return false;
  box.name = name;
  return true;
}

