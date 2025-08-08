import type { PortalDocument } from "./types";

export interface PortalProvider {
  getPortal: (id: string) => Promise<PortalDocument | null>;
  savePortal: (id: string, doc: PortalDocument) => Promise<void>;
  listWorkspaces?: () => Promise<Array<{ id: string; name: string }>>;
}

export const localProvider: PortalProvider = {
  async getPortal(id) {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(`portal:${id}`);
    return raw ? (JSON.parse(raw) as PortalDocument) : null;
  },
  async savePortal(id, doc) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(`portal:${id}`, JSON.stringify(doc));
  },
  async listWorkspaces() {
    if (typeof window === "undefined") return [];
    const keys = Object.keys(window.localStorage).filter((k) => k.startsWith("portal:"));
    return keys.map((k) => ({ id: k.slice("portal:".length), name: "Workspace" }));
  },
};

export async function loadPortal(provider: PortalProvider, id: string): Promise<PortalDocument | null> {
  return provider.getPortal(id);
}

export async function savePortal(provider: PortalProvider, id: string, doc: PortalDocument): Promise<void> {
  return provider.savePortal(id, doc);
}