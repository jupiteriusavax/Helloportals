"use client";

import { useState, useCallback } from "react";
import Canvas from "./Canvas";

interface EditorShellProps {
  portal: any;
  onSave: (portal: any) => void;
}

export default function EditorShell({ portal, onSave }: EditorShellProps) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodesChange = useCallback((changes: any[]) => {
    setNodes((nds) => {
      // Simplified node change handling
      return nds;
    });
  }, []);

  const onEdgesChange = useCallback((changes: any[]) => {
    setEdges((eds) => {
      // Simplified edge change handling
      return eds;
    });
  }, []);

  const onConnect = useCallback((connection: any) => {
    setEdges((eds) => [...eds, connection]);
  }, []);

  const handleSave = () => {
    const updatedPortal = {
      ...portal,
      nodes,
      edges,
    };
    onSave(updatedPortal);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Éditeur de portail</h1>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sauvegarder
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1">
          <Canvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </div>
        
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Propriétés</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom du portail</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Nom du portail"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                placeholder="Description du portail"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}