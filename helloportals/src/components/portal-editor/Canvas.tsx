"use client";

import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PortalNode } from "@/lib/portal-schema/types";
import { useEditorStore } from "./EditorShell";
import NodeOutline from "@/components/portal-editor/NodeOutline";

function applyStyle(style?: PortalNode["props"]["style"]) {
  const s: React.CSSProperties = {};
  if (!style) return s;
  if (style.width && style.width !== "auto") s.width = style.width;
  if (style.maxWidth) s.maxWidth = style.maxWidth;
  if (style.padding !== undefined) s.padding = Array.isArray(style.padding) ? undefined : style.padding;
  if (style.color) s.color = style.color;
  if (style.background) s.background = style.background;
  if (style.radius !== undefined) s.borderRadius = style.radius;
  if (style.position) s.position = style.position;
  if (style.transform) {
    const scale = style.transform.scale ?? 1;
    const rotate = style.transform.rotate ?? 0;
    s.transform = `scale(${scale}) rotate(${rotate}deg)`;
  }
  return s;
}

function Card({ node }: { node: PortalNode }) {
  const select = useEditorStore((s) => s.select);
  const selectedId = useEditorStore((s) => s.selectedNodeId);
  const isSelected = selectedId === node.id;
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 relative" onClick={(e) => { e.stopPropagation(); select(node.id); }} style={applyStyle(node.props.style)}>
      {isSelected && <NodeOutline node={node} />}
      <div className="font-medium mb-2">{node.name}</div>
      <div className="text-[13px] text-muted-foreground">{node.props.content?.text ?? ""}</div>
    </div>
  );
}

function Media({ node }: { node: PortalNode }) {
  const select = useEditorStore((s) => s.select);
  const selectedId = useEditorStore((s) => s.selectedNodeId);
  const isSelected = selectedId === node.id;
  const brightness = node.props.content?.brightness ?? 100;
  return (
    <div className="relative" onClick={(e) => { e.stopPropagation(); select(node.id); }} style={applyStyle(node.props.style)}>
      {isSelected && <NodeOutline node={node} />}
      <img src={node.props.content?.imageSrc} alt={node.props.content?.imageAlt ?? ""} className="w-full h-auto object-cover rounded-2xl" style={{ filter: `brightness(${brightness}%)`, objectFit: node.props.content?.fit ?? "cover" }} />
    </div>
  );
}

function TextNode({ node, badge }: { node: PortalNode; badge?: string }) {
  const select = useEditorStore((s) => s.select);
  const selectedId = useEditorStore((s) => s.selectedNodeId);
  const isSelected = selectedId === node.id;
  return (
    <div className="relative" onClick={(e) => { e.stopPropagation(); select(node.id); }} style={applyStyle(node.props.style)}>
      {isSelected && <NodeOutline node={node} />}
      {badge && <div className="hp-badge">{badge}</div>}
      <h1 className="text-5xl font-semibold text-white drop-shadow-sm">{node.props.content?.text}</h1>
    </div>
  );
}

function GridSortable({ node }: { node: PortalNode }) {
  const select = useEditorStore((s) => s.select);
  const reorder = useEditorStore((s) => s.reorder);
  const selectedId = useEditorStore((s) => s.selectedNodeId);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const isSelected = selectedId === node.id;

  return (
    <div className="relative" onClick={(e) => { e.stopPropagation(); select(node.id); }}>
      {isSelected && <NodeOutline node={node} />}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e: DragEndEvent) => {
        if (!e.over || e.active.id === e.over.id) return;
        reorder(node.id, String(e.active.id), String(e.over.id));
      }}>
        <SortableContext items={(node.children ?? []).map((c) => c.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(node.children ?? []).map((child) => (
              <SortableCard key={child.id} id={child.id} node={child} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableCard({ id, node }: { id: string; node: PortalNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  } as React.CSSProperties;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card node={node} />
    </div>
  );
}

function SectionHero({ node, media, title }: { node: PortalNode; media: PortalNode; title: PortalNode }) {
  const select = useEditorStore((s) => s.select);
  const selectedId = useEditorStore((s) => s.selectedNodeId);
  const isSelected = selectedId === node.id;
  return (
    <div className="relative rounded-2xl px-6 py-14 bg-blue-600 text-white" onClick={(e) => { e.stopPropagation(); select(node.id); }}>
      {isSelected && <NodeOutline node={node} />}
      <div className="hp-badge">Section Hero</div>
      <TextNode node={title} />
      {media && <Media node={media} />}
    </div>
  );
}

export default function Canvas({ page, zoom }: { page: PortalNode; zoom: number }) {
  // Expect structure from mocks
  const sections = page.children ?? [];
  const hero = sections[0];
  const grid = sections[1];
  const heroTitle = hero?.children?.find((c) => c.type === "text") as PortalNode | undefined;
  const heroMedia = hero?.children?.find((c) => c.type === "media") as PortalNode | undefined;

  return (
    <div className="space-y-4">
      {hero && heroTitle && heroMedia && <SectionHero node={hero} title={heroTitle} media={heroMedia} />}
      {grid && <GridSortable node={grid} />}
    </div>
  );
}