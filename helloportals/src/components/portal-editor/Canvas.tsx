"use client";

import React from "react";
import { ReactFlow, Node, Edge } from "reactflow";
import type { PortalNode } from "../../lib/portal-schema/types";

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onNodeSelect: (nodeId: string) => void;
}

export default function Canvas({ nodes, edges, onNodesChange, onEdgesChange, onNodeSelect }: CanvasProps) {
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => onNodeSelect(node.id)}
        fitView
      />
    </div>
  );
}