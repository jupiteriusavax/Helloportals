"use client";

import { useEditorStore } from "./EditorShell";

export default function Toolbar({ saving, onSave }: { saving: boolean; onSave: () => void }) {
  const { preview, showGrid, zoom, breakpoint } = useEditorStore((s) => ({ preview: s.preview, showGrid: s.showGrid, zoom: s.zoom, breakpoint: s.breakpoint }));
  const setPreview = useEditorStore((s) => s.setPreview);
  const setGrid = useEditorStore((s) => s.setGrid);
  const setZoom = useEditorStore((s) => s.setZoom);
  const setBreakpoint = useEditorStore((s) => s.setBreakpoint);

  return (
    <div className="flex items-center justify-between px-3 py-2 border-b bg-white">
      <div className="text-sm text-muted-foreground">Toolbar</div>
      <div className="flex items-center gap-2">
        <button className="hp-btn" onClick={() => setPreview(!preview)}>{preview ? "Exit Preview" : "Preview"}</button>
        <button className="hp-btn" onClick={onSave} disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        <div className="mx-2 h-5 w-px bg-muted" />
        <button className="hp-btn" onClick={() => setZoom(zoom - 0.1)}>-</button>
        <div className="w-16 text-center text-sm">{Math.round(zoom * 100)}%</div>
        <button className="hp-btn" onClick={() => setZoom(zoom + 0.1)}>+</button>
        <div className="mx-2 h-5 w-px bg-muted" />
        <button className={`hp-btn ${showGrid ? "bg-blue-600 text-white" : ""}`} onClick={() => setGrid(!showGrid)}>Grid</button>
        <div className="mx-2 h-5 w-px bg-muted" />
        <div className="flex items-center gap-1">
          <button className={`hp-btn ${breakpoint === "desktop" ? "bg-blue-600 text-white" : ""}`} onClick={() => setBreakpoint("desktop")}>Desktop</button>
          <button className={`hp-btn ${breakpoint === "tablet" ? "bg-blue-600 text-white" : ""}`} onClick={() => setBreakpoint("tablet")}>Tablet</button>
          <button className={`hp-btn ${breakpoint === "mobile" ? "bg-blue-600 text-white" : ""}`} onClick={() => setBreakpoint("mobile")}>Mobile</button>
        </div>
      </div>
    </div>
  );
}