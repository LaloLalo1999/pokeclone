/*
  LocalStorage persistence utilities for game state
  - Saving/loading with safe JSON handling
  - Auto-save support (debounced, lifecycle events)
  - Initialization for new players via factory
  - Versioned migrations for future updates

  This module is framework-agnostic and works with React/Vite/TypeScript setups.
*/

export type Migratable = {
  // Schema version. Always bump when you change structure.
  _v: number;
};

export type GameState = Migratable & {
  // Extend this type in your app. Placeholders below are examples.
  // Example fields:
  // player: { name: string; level: number };
  // inventory: Array<{ id: string; qty: number }>;
  // lastSavedAt?: number;
  [k: string]: unknown;
};

export type Migration<T extends Migratable> = (state: T) => T;

export type MigrationMap<T extends Migratable> = {
  // Key is FROM version. Migration transforms state FROM that version TO next version (from+1)
  [fromVersion: number]: Migration<T>;
};

export type StorageOptions<T extends Migratable> = {
  storageKey?: string; // localStorage key
  currentVersion: number; // latest schema version expected by app
  migrations?: MigrationMap<T>; // map of migrations
  // Validate state after load/migration. Throw or return false to reject.
  validate?: (state: unknown) => state is T;
};

export type InitOptions<T extends Migratable> = StorageOptions<T> & {
  createDefaultState: () => T; // factory for new players
  // If true, persist the new default immediately (recommended)
  persistNew?: boolean;
};

export type AutoSaveOptions<T extends Migratable> = StorageOptions<T> & {
  // Return the current in-memory state when saving is triggered
  getState: () => T;
  // Debounce delay for saves triggered via scheduleSave
  debounceMs?: number;
  // Also save on an interval (in ms); disabled if undefined
  intervalMs?: number;
  // Save when tab becomes hidden or visible
  saveOnVisibilityChange?: boolean;
  // Save on beforeunload/pagehide
  saveOnBeforeUnload?: boolean;
  // Optional hook called when a save completes successfully
  onSaved?: (state: T) => void;
  // Optional hook called on save error
  onError?: (error: unknown) => void;
};

const DEFAULT_STORAGE_KEY = "game:state";

function isLocalStorageAvailable(): boolean {
  try {
    const k = "__ls_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function saveState<T extends Migratable>(state: T, opts: StorageOptions<T>): void {
  if (!isLocalStorageAvailable()) return;
  const key = opts.storageKey ?? DEFAULT_STORAGE_KEY;
  try {
    const stamped: T = { ...state, _v: opts.currentVersion };
    const payload = JSON.stringify(stamped);
    window.localStorage.setItem(key, payload);
  } catch (err) {
    // Swallow to avoid crashing the app, but rethrow async for visibility in dev tools
    setTimeout(() => { throw err; });
  }
}

export function loadRaw<T extends Migratable>(opts: StorageOptions<T>): unknown | null {
  if (!isLocalStorageAvailable()) return null;
  const key = opts.storageKey ?? DEFAULT_STORAGE_KEY;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null; // corrupted payload
  }
}

export function migrateState<T extends Migratable>(raw: unknown, opts: StorageOptions<T>): T | null {
  if (!raw || typeof raw !== "object") return null;
  const migrations = opts.migrations ?? {};
  const current = opts.currentVersion;
  const validate = opts.validate ?? ((s: unknown): s is T => !!s && typeof s === "object");

  let state = raw as T;
  let from = (state as Migratable)._v ?? 0;

  // If future version is detected, accept as-is but still validate
  if (from > current) {
    return validate(state) ? state : null;
  }

  while (from < current) {
    const migrate = migrations[from];
    if (!migrate) {
      // Missing migration path; treat as incompatible
      return null;
    }
    state = migrate(state);
    // Ensure version increments by exactly 1 after each migration
    const nextVersion = (state as Migratable)._v;
    if (typeof nextVersion !== "number" || nextVersion !== from + 1) {
      // If migration didn't bump, bump it to keep chain consistent
      (state as Migratable)._v = from + 1;
    }
    from += 1;
  }

  return validate(state) ? state : null;
}

export function loadState<T extends Migratable>(opts: StorageOptions<T>): T | null {
  const raw = loadRaw<T>(opts);
  if (raw == null) return null;
  return migrateState<T>(raw, opts);
}

export function clearState<T extends Migratable>(opts: StorageOptions<T>): void {
  if (!isLocalStorageAvailable()) return;
  const key = opts.storageKey ?? DEFAULT_STORAGE_KEY;
  try {
    window.localStorage.removeItem(key);
  } catch {/* no-op */}
}

export function ensureInitialized<T extends Migratable>(opts: InitOptions<T>): T {
  const loaded = loadState<T>(opts);
  if (loaded) return loaded;
  const fresh = opts.createDefaultState();
  if ((fresh as Migratable)._v !== opts.currentVersion) {
    (fresh as Migratable)._v = opts.currentVersion;
  }
  if (opts.persistNew ?? true) {
    saveState<T>(fresh, opts);
  }
  return fresh;
}

// Creates a debounced function
function debounce<TArgs extends unknown[]>(fn: (...args: TArgs) => void, wait: number) {
  let t: number | undefined;
  return (...args: TArgs) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), wait);
  };
}

export type AutoSaver = {
  // Request a save (debounced)
  scheduleSave: () => void;
  // Immediately persist without debounce
  saveNow: () => void;
  // Dispose listeners/intervals
  dispose: () => void;
};

export function createAutoSaver<T extends Migratable>(opts: AutoSaveOptions<T>): AutoSaver {
  const {
    debounceMs = 800,
    intervalMs,
    saveOnVisibilityChange = true,
    saveOnBeforeUnload = true,
    onSaved,
    onError,
  } = opts;

  const saveNow = () => {
    try {
      const state = opts.getState();
      saveState<T>(state, opts);
      onSaved?.(state);
    } catch (err) {
      onError?.(err);
      // Avoid crashing app
    }
  };

  const scheduleSave = debounce(() => saveNow(), debounceMs);

  const cleanup: Array<() => void> = [];

  // Interval saving
  if (typeof intervalMs === "number" && intervalMs > 0) {
    const id = window.setInterval(saveNow, intervalMs);
    cleanup.push(() => window.clearInterval(id));
  }

  // Visibility change saves
  if (saveOnVisibilityChange) {
    const onVis = () => saveNow();
    document.addEventListener("visibilitychange", onVis);
    cleanup.push(() => document.removeEventListener("visibilitychange", onVis));
  }

  // Before unload / pagehide saves (best effort)
  if (saveOnBeforeUnload) {
    const onUnload = () => {
      try {
        const state = opts.getState();
        const key = opts.storageKey ?? DEFAULT_STORAGE_KEY;
        const payload = JSON.stringify({ ...state, _v: opts.currentVersion });
        // Use synchronous APIs when possible for last-chance save
        window.localStorage.setItem(key, payload);
      } catch {/* ignore */}
    };
    window.addEventListener("beforeunload", onUnload);
    window.addEventListener("pagehide", onUnload);
    cleanup.push(() => {
      window.removeEventListener("beforeunload", onUnload);
      window.removeEventListener("pagehide", onUnload);
    });
  }

  return {
    scheduleSave,
    saveNow,
    dispose: () => cleanup.splice(0).forEach((fn) => fn()),
  };
}

// Example helper to compose options once in your app
export function makeStorageHelpers<T extends Migratable>(base: StorageOptions<T>) {
  return {
    save: (state: T) => saveState(state, base),
    load: () => loadState<T>(base),
    migrate: (raw: unknown) => migrateState<T>(raw, base),
    clear: () => clearState<T>(base),
    ensure: (createDefaultState: () => T, persistNew = true) =>
      ensureInitialized<T>({ ...base, createDefaultState, persistNew }),
    autoSaver: (getState: () => T, extra?: Omit<AutoSaveOptions<T>, keyof StorageOptions<T> | "getState">) =>
      createAutoSaver<T>({ ...base, getState, ...(extra ?? {}) }),
  } as const;
}

