"use client";

import { useMemo } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore } from "./EditorShell";
import type { PortalDocument, PortalNode } from "@/lib/portal-schema/types";
import { getParentMap } from "@/lib/portal-schema/transforms";

function Row({ node }: { node: PortalNode }) {
  const selectedId = useEditorStore((s) => s.selectedNodeId);
  const select = useEditorStore((s) => s.select);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => select(node.id)} className={`px-2 py-1 rounded cursor-pointer text-sm ${selectedId === node.id ? "bg-blue-50 text-blue-700" : "hover:bg-muted/50"}`}>
      {node.name}
    </div>
  );
}

function Tree({ nodes }: { nodes: PortalNode[] }) {
  return (
    <div className="space-y-1">
      {nodes.map((n) => (
        <div key={n.id}>
          <Row node={n} />
          {n.children && n.children.length > 0 && (
            <div className="ml-3 border-l pl-2">
              <SortableContext items={n.children.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <Tree nodes={n.children} />
              </SortableContext>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function SidebarTree({ root }: { root: PortalDocument }) {
  const reorder = useEditorStore((s) => s.reorder);
  const parentMap = useMemo(() => getParentMap(root), [root]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeParent = parentMap.get(active.id as string);
    const overParent = parentMap.get(over.id as string);
    if (!activeParent || activeParent !== overParent) return; // only reorder within same parent for now
    reorder(activeParent, active.id as string, over.id as string);
  };

  return (
    <aside className="border-r overflow-auto p-2 bg-white">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="text-xs uppercase text-muted-foreground px-2 pb-2">Arborescence</div>
        <SortableContext items={root.pages.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <Tree nodes={root.pages} />
        </SortableContext>
      </DndContext>
    </aside>
  );
}