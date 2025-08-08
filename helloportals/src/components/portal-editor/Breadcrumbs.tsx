"use client";

import { useMemo } from "react";
import { useEditorStore } from "./EditorShell";
import { getPathToNode } from "@/lib/portal-schema/transforms";

export default function Breadcrumbs() {
  const { doc, selectedNodeId } = useEditorStore((s) => ({ doc: s.doc, selectedNodeId: s.selectedNodeId }));
  const crumbs = useMemo(() => (doc && selectedNodeId ? getPathToNode(doc, selectedNodeId) : []), [doc, selectedNodeId]);
  if (!crumbs || crumbs.length === 0) return null;
  return (
    <div className="text-xs text-muted-foreground my-2">
      {crumbs.map((n, idx) => (
        <span key={n.id}>
          {n.name}{idx < crumbs.length - 1 ? " / " : ""}
        </span>
      ))}
    </div>
  );
}