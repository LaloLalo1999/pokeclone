import { makeStorageHelpers } from "../utils/storage";
import { PCState, createPC } from "./pc";

export const PC_STORAGE_KEY = "game:pc";
const PC_STATE_VERSION = 1;

type PCDoc = PCState & { _v: number };

// Compose helpers bound to our PC storage key and version
const helpers = makeStorageHelpers<PCDoc>({
  storageKey: PC_STORAGE_KEY,
  currentVersion: PC_STATE_VERSION,
  migrations: {
    // Example: from 0 to 1 simply stamp _v if missing
    0: (s: any) => ({ ...(s ?? {}), _v: 1 }),
  },
  validate: (s: unknown): s is PCDoc => {
    if (!s || typeof s !== "object") return false;
    const obj = s as PCDoc;
    return Array.isArray(obj.boxes);
  },
});

export function loadPC(): PCState | null {
  const doc = helpers.load();
  return doc ? { boxes: doc.boxes } : null;
}

export function savePC(pc: PCState): void {
  const doc: PCDoc = { ...(pc as any), _v: PC_STATE_VERSION };
  helpers.save(doc);
}

export function ensurePC(): PCState {
  const doc = helpers.ensure(() => ({ ...(createPC() as any), _v: PC_STATE_VERSION }));
  return { boxes: doc.boxes };
}

