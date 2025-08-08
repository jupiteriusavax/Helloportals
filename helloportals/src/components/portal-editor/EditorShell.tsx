"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import Toolbar from "@/components/portal-editor/Toolbar";
import SidebarTree from "@/components/portal-editor/SidebarTree";
import Canvas from "@/components/portal-editor/Canvas";
import Inspector from "@/components/portal-editor/Inspector";
import Breadcrumbs from "@/components/portal-editor/Breadcrumbs";
import { loadPortal, savePortal, localProvider } from "@/lib/portal-schema/storage";
import { cloneTemplateSMB } from "@/lib/portal-schema/mocks";
import type { PortalDocument, PortalNode } from "@/lib/portal-schema/types";
import { updateNodeById, findNodeById, reorderSibling } from "@/lib/portal-schema/transforms";
import "@/styles/portal.css";

interface EditorState {
  doc: PortalDocument | null;
  selectedNodeId: string | null;
  preview: boolean;
  zoom: number; // 0.5 - 2
  showGrid: boolean;
  breakpoint: "desktop" | "tablet" | "mobile";
  setDoc: (doc: PortalDocument) => void;
  select: (id: string | null) => void;
  setPreview: (v: boolean) => void;
  setZoom: (z: number) => void;
  setGrid: (v: boolean) => void;
  setBreakpoint: (b: EditorState["breakpoint"]) => void;
  updateNode: (id: string, partial: Partial<PortalNode["props"]>) => void;
  reorder: (parentId: string, activeId: string, overId: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  doc: null,
  selectedNodeId: null,
  preview: false,
  zoom: 1,
  showGrid: false,
  breakpoint: "desktop",
  setDoc: (doc) => set({ doc }),
  select: (id) => set({ selectedNodeId: id }),
  setPreview: (v) => set({ preview: v }),
  setZoom: (z) => set({ zoom: Math.min(2, Math.max(0.5, z)) }),
  setGrid: (v) => set({ showGrid: v }),
  setBreakpoint: (b) => set({ breakpoint: b }),
  updateNode: (id, partial) => {
    const current = get().doc;
    if (!current) return;
    const next = updateNodeById(current, id, (node) => {
      node.props = {
        content: { ...(node.props.content ?? {}), ...(partial.content ?? {}) },
        behavior: { ...(node.props.behavior ?? {}), ...(partial.behavior ?? {}) },
        style: { ...(node.props.style ?? {}), ...(partial.style ?? {}) },
      };
    });
    set({ doc: next });
  },
  reorder: (parentId, activeId, overId) => {
    const current = get().doc;
    if (!current) return;
    const next = reorderSibling(current, parentId, activeId, overId);
    set({ doc: next });
  },
}));

export default function EditorShell({ workspaceId }: { workspaceId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { doc, selectedNodeId, preview, zoom, breakpoint } = useEditorStore(
    (s) => ({ doc: s.doc, selectedNodeId: s.selectedNodeId, preview: s.preview, zoom: s.zoom, breakpoint: s.breakpoint }),
    shallow
  );

  useEffect(() => {
    const init = async () => {
      const existing = await loadPortal(localProvider, workspaceId);
      if (existing) {
        useEditorStore.getState().setDoc(existing);
      } else {
        const draft = cloneTemplateSMB(workspaceId);
        await savePortal(localProvider, workspaceId, draft);
        useEditorStore.getState().setDoc(draft);
      }
      setLoading(false);
    };
    init();
  }, [workspaceId]);

  const onSave = useCallback(async () => {
    const current = useEditorStore.getState().doc;
    if (!current) return;
    setSaving(true);
    const next: PortalDocument = { ...current, updatedAt: new Date().toISOString() };
    await savePortal(localProvider, workspaceId, next);
    useEditorStore.getState().setDoc(next);
    setSaving(false);
  }, [workspaceId]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSave();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        useEditorStore.setState((s) => ({ preview: !s.preview }));
      }
      if (e.key === "Escape") {
        useEditorStore.setState({ selectedNodeId: null });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onSave]);

  if (loading || !doc) return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;

  const mainPage = doc.pages[0];

  return (
    <div className="h-full w-full flex flex-col">
      <header className="flex items-center justify-between border-b px-4 py-2 bg-white">
        <div className="text-sm text-muted-foreground">Template SMB</div>
        <div className="font-medium">{breakpoint === "desktop" ? "Desktop" : breakpoint === "tablet" ? "Tablet" : "Mobile"}</div>
      </header>
      <Toolbar saving={saving} onSave={onSave} />
      <div className={`flex-1 grid ${preview ? "grid-cols-1" : "grid-cols-[280px_1fr_320px]"} h-[calc(100vh-88px)]`}>
        {!preview && <SidebarTree root={doc} />}
        <div className="bg-[#F7F8FA] overflow-auto">
          <div className="mx-auto my-6" style={{ width: breakpoint === "desktop" ? 1200 * zoom : breakpoint === "tablet" ? 768 * zoom : 375 * zoom }}>
            <Breadcrumbs />
            <Canvas page={mainPage} zoom={zoom} />
          </div>
        </div>
        {!preview && <Inspector />}
      </div>
    </div>
  );
}