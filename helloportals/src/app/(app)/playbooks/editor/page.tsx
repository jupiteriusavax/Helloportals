"use client";

// Temporairement commenté pour éviter l'erreur de compilation
// import dynamic from "next/dynamic";
// import { useMemo } from "react";
// import type { Node, Edge } from "reactflow";

// const ReactFlow = dynamic(() => import("reactflow").then((m) => m.ReactFlow), {
//   ssr: false,
// });
// import "reactflow/dist/style.css";

export default function PlaybookEditorPage() {
  // const nodes: Node[] = useMemo(
  //   () => [
  //     { id: "1", position: { x: 100, y: 100 }, data: { label: "Start" }, type: "input" },
  //     { id: "2", position: { x: 300, y: 100 }, data: { label: "Checklist" } },
  //   ],
  //   []
  // );
  // const edges: Edge[] = useMemo(() => [{ id: "e1-2", source: "1", target: "2" }], []);

  return (
    <div style={{ width: "100%", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="text-gray-500">
        Playbook Editor - ReactFlow temporairement désactivé
      </div>
    </div>
  );
}