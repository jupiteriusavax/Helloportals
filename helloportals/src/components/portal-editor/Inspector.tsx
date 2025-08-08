"use client";

import { useMemo, useState } from "react";
import { useEditorStore } from "./EditorShell";
import NumberField from "@/components/portal-editor/controls/NumberField";
import Select from "@/components/portal-editor/controls/Select";
import ColorField from "@/components/portal-editor/controls/ColorField";
import Switch from "@/components/portal-editor/controls/Switch";
import type { PortalNode } from "@/lib/portal-schema/types";

export default function Inspector() {
  const [tab, setTab] = useState<"content" | "behavior" | "style">("content");
  const { doc, selectedNodeId } = useEditorStore((s) => ({ doc: s.doc, selectedNodeId: s.selectedNodeId }));
  const updateNode = useEditorStore((s) => s.updateNode);
  const node: PortalNode | null = useMemo(() => {
    if (!doc || !selectedNodeId) return null;
    const stack: PortalNode[] = [...doc.pages];
    while (stack.length) {
      const n = stack.pop()!;
      if (n.id === selectedNodeId) return n;
      if (n.children) stack.push(...n.children);
    }
    return null;
  }, [doc, selectedNodeId]);

  if (!node) return (
    <aside className="border-l p-3 text-sm text-muted-foreground">Select a node to edit</aside>
  );

  return (
    <aside className="border-l p-3 bg-white overflow-auto">
      <div className="flex gap-2 mb-3">
        <button className={`hp-tab ${tab === "content" ? "hp-tab-active" : ""}`} onClick={() => setTab("content")}>Content</button>
        <button className={`hp-tab ${tab === "behavior" ? "hp-tab-active" : ""}`} onClick={() => setTab("behavior")}>Behavior</button>
        <button className={`hp-tab ${tab === "style" ? "hp-tab-active" : ""}`} onClick={() => setTab("style")}>Style</button>
      </div>

      {tab === "content" && (
        <div className="space-y-3">
          {node.type === "text" && (
            <div className="space-y-2">
              <label className="hp-label">Text</label>
              <textarea className="hp-input" rows={4} defaultValue={node.props.content?.text ?? ""} onChange={(e) => updateNode(node.id, { content: { text: e.target.value } })} />
            </div>
          )}
          {node.type === "media" && (
            <div className="space-y-2">
              <label className="hp-label">Image src</label>
              <input className="hp-input" defaultValue={node.props.content?.imageSrc ?? ""} onChange={(e) => updateNode(node.id, { content: { imageSrc: e.target.value } })} />
              <label className="hp-label">Image alt</label>
              <input className="hp-input" defaultValue={node.props.content?.imageAlt ?? ""} onChange={(e) => updateNode(node.id, { content: { imageAlt: e.target.value } })} />
              <Select label="Fit" value={node.props.content?.fit ?? "cover"} onChange={(v) => updateNode(node.id, { content: { fit: v as "cover" | "contain" } })} options={[{ label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }]} />
              <NumberField label="Brightness" value={node.props.content?.brightness ?? 100} min={0} max={100} step={1} onChange={(v) => updateNode(node.id, { content: { brightness: v } })} />
            </div>
          )}
        </div>
      )}

      {tab === "behavior" && (
        <div className="space-y-3">
          <Select label="Visibility" value={node.props.behavior?.visibility ?? "always"} onChange={(v) => updateNode(node.id, { behavior: { visibility: v as "always" | "roles" | "conditions" } })} options={[{ label: "Always", value: "always" }, { label: "By roles", value: "roles" }, { label: "By conditions", value: "conditions" }]} />
          <Switch label="Clickable on mount action?" checked={(node.props.behavior?.actions?.length ?? 0) > 0} onChange={(val) => updateNode(node.id, { behavior: { actions: val ? [{ event: "mount", type: "emitEvent" }] : [] } })} />
        </div>
      )}

      {tab === "style" && (
        <div className="space-y-3">
          <NumberField label="Width" value={typeof node.props.style?.width === "number" ? (node.props.style?.width as number) : 0} min={0} max={1600} step={10} onChange={(v) => updateNode(node.id, { style: { width: v === 0 ? "auto" : v } })} />
          <NumberField label="Max width" value={node.props.style?.maxWidth ?? 0} min={0} max={1600} step={10} onChange={(v) => updateNode(node.id, { style: { maxWidth: v } })} />
          <NumberField label="Padding" value={typeof node.props.style?.padding === "number" ? (node.props.style?.padding as number) : 0} min={0} max={64} step={1} onChange={(v) => updateNode(node.id, { style: { padding: v } })} />
          <ColorField label="Color" value={node.props.style?.color ?? ""} onChange={(v) => updateNode(node.id, { style: { color: v } })} />
          <ColorField label="Background" value={node.props.style?.background ?? ""} onChange={(v) => updateNode(node.id, { style: { background: v } })} />
          <NumberField label="Radius" value={node.props.style?.radius ?? 16} min={0} max={48} step={1} onChange={(v) => updateNode(node.id, { style: { radius: v } })} />
          <Select label="Position" value={node.props.style?.position ?? "static"} onChange={(v) => updateNode(node.id, { style: { position: v as "static" | "relative" | "absolute" } })} options={[{ label: "Static", value: "static" }, { label: "Relative", value: "relative" }, { label: "Absolute", value: "absolute" }]} />
          <NumberField label="Scale" value={node.props.style?.transform?.scale ?? 1} min={0.5} max={2} step={0.1} onChange={(v) => updateNode(node.id, { style: { transform: { ...(node.props.style?.transform ?? {}), scale: v } } })} />
          <NumberField label="Rotate" value={node.props.style?.transform?.rotate ?? 0} min={-180} max={180} step={1} onChange={(v) => updateNode(node.id, { style: { transform: { ...(node.props.style?.transform ?? {}), rotate: v } } })} />
                      <Select label="Shadow" value={node.props.style?.shadow ?? "sm"} onChange={(v) => updateNode(node.id, { style: { shadow: v as "none" | "sm" | "md" | "lg" } })} options={[{ label: "None", value: "none" }, { label: "Small", value: "sm" }, { label: "Medium", value: "md" }, { label: "Large", value: "lg" }]} />
        </div>
      )}
    </aside>
  );
}