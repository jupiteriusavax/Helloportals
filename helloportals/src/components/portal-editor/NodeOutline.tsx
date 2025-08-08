"use client";

import type { PortalNode } from "@/lib/portal-schema/types";

export default function NodeOutline({ node }: { node: PortalNode }) {
  return (
    <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500 pointer-events-none">
      <div className="absolute -top-2 left-2 text-[10px] px-1.5 py-0.5 bg-blue-600 text-white rounded-full">{node.type}</div>
    </div>
  );
}