"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ReactFlow, addEdge, useNodesState, useEdgesState, Connection, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";

import Toolbar from "./Toolbar";
import SidebarTree from "./SidebarTree";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
import Breadcrumbs from "./Breadcrumbs";
import { loadPortal, savePortal, localProvider } from "../../lib/portal-schema/storage";
import { cloneTemplateSMB } from "../../lib/portal-schema/mocks";
import type { PortalDocument, PortalNode } from "../../lib/portal-schema/types";
import { updateNodeById, findNodeById, reorderSibling } from "../../lib/portal-schema/transforms";

interface EditorShellProps {
  portalId?: string;
}

export default function EditorShell({ portalId }: EditorShellProps) {
  const [portal, setPortal] = useState<PortalDocument | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Load portal data
  useEffect(() => {
    if (portalId) {
      loadPortal(portalId, localProvider).then(setPortal);
    } else {
      // Load template for new portal
      cloneTemplateSMB().then(setPortal);
    }
  }, [portalId]);

  // Convert portal nodes to ReactFlow nodes
  useEffect(() => {
    if (portal) {
      const flowNodes = portal.nodes.map((node) => ({
        id: node.id,
        type: "default",
        position: { x: node.x, y: node.y },
        data: { label: node.title },
      }));
      setNodes(flowNodes);
    }
  }, [portal, setNodes]);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId || !portal) return null;
    return findNodeById(portal, selectedNodeId);
  }, [selectedNodeId, portal]);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleNodeUpdate = useCallback((nodeId: string, updates: Partial<PortalNode>) => {
    if (!portal) return;
    const updatedPortal = updateNodeById(portal, nodeId, updates);
    setPortal(updatedPortal);
  }, [portal]);

  const handleSave = useCallback(() => {
    if (!portal) return;
    savePortal(portal, localProvider);
  }, [portal]);

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <SidebarTree
          portal={portal}
          selectedNodeId={selectedNodeId}
          onNodeSelect={handleNodeSelect}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <Toolbar onSave={handleSave} />
        <Breadcrumbs node={selectedNode} />
        
        <div className="flex-1">
          <Canvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeSelect={handleNodeSelect}
          />
        </div>
      </div>
      
      <div className="w-80 border-l border-gray-200 bg-gray-50">
        <Inspector
          node={selectedNode}
          onNodeUpdate={handleNodeUpdate}
        />
      </div>
    </div>
  );
}