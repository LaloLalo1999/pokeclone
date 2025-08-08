import { describe, it, expect, beforeEach } from 'vitest';
import { saveState, loadState, clearState, migrateState, ensureInitialized, makeStorageHelpers } from '../storage';

interface MyState { _v: number; name: string; count: number }

const baseOpts = {
  storageKey: 'test:state',
  currentVersion: 2,
  validate: (s: unknown): s is MyState => !!s && typeof s === 'object' && '_v' in (s as any),
};

beforeEach(() => {
  // Clear localStorage between tests
  window.localStorage.clear();
});

describe('save/load', () => {
  it('persists and loads state', () => {
    const state: MyState = { _v: 2, name: 'Test', count: 1 };
    saveState(state, baseOpts);
    const loaded = loadState<MyState>(baseOpts)!;
    expect(loaded.name).toBe('Test');
    expect(loaded.count).toBe(1);
    clearState(baseOpts);
    expect(loadState<MyState>(baseOpts)).toBeNull();
  });

  it('migrates from older versions', () => {
    const old: any = { _v: 0, name: 'Old', count: 0 };
    window.localStorage.setItem(baseOpts.storageKey!, JSON.stringify(old));
    const migrated = migrateState<MyState>(old, {
      ...baseOpts,
      migrations: {
        0: (s: any) => ({ ...s, _v: 1 }),
        1: (s: any) => ({ ...s, _v: 2, count: 5 }),
      },
    });
    expect(migrated?._v).toBe(2);
    expect(migrated?.count).toBe(5);
  });

  it('ensureInitialized creates and persists default state', () => {
    const state = ensureInitialized<MyState>({
      ...baseOpts,
      createDefaultState: () => ({ _v: 2, name: 'New', count: 0 }),
    });
    expect(state.name).toBe('New');
    const helpers = makeStorageHelpers<MyState>({ ...baseOpts });
    const loaded = helpers.load()!;
    expect(loaded.name).toBe('New');
  });
});
