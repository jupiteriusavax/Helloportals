import { describe, it, expect, beforeEach } from "vitest";
import { localProvider, savePortal, loadPortal } from "../storage";
import { cloneTemplateSMB } from "../mocks";

beforeEach(() => {
  // @ts-expect-error test shim
  global.window = global.window || {};
  // @ts-expect-error test shim
  window.localStorage = {
    _s: new Map<string, string>(),
    getItem(k: string) { return this._s.get(k) ?? null; },
    setItem(k: string, v: string) { this._s.set(k, v); },
    removeItem(k: string) { this._s.delete(k); },
    clear() { this._s.clear(); },
  } as unknown as Storage;
});

describe("storage", () => {
  it("save/load", async () => {
    const id = "openai";
    const doc = cloneTemplateSMB(id);
    await savePortal(localProvider, id, doc);
    const loaded = await loadPortal(localProvider, id);
    expect(loaded?.id).toBe(id);
  });
});