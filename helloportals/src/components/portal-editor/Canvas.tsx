"use client";

import { useCallback } from "react";

interface CanvasProps {
  nodes: any[];
  edges: any[];
  onNodesChange: (changes: any[]) => void;
  onEdgesChange: (changes: any[]) => void;
  onConnect: (connection: any) => void;
}

export default function Canvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect }: CanvasProps) {
  const handleConnect = useCallback(
    (params: any) => onConnect(params),
    [onConnect]
  );

  return (
    <div className="w-full h-full bg-gray-50 border border-gray-200 rounded-lg">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Éditeur de portail</h3>
        <div className="bg-white p-4 rounded border">
          <p className="text-gray-600">
            Éditeur ReactFlow temporairement désactivé pour éviter les erreurs de dépendance.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Nodes: {nodes.length} | Edges: {edges.length}
          </p>
        </div>
      </div>
    </div>
  );
}