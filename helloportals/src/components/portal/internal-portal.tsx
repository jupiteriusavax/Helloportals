"use client";

import Link from "next/link";
import type { UserProfile, Membership } from "@prisma/client";

export default function InternalPortal({ _user, _membership }: { _user: UserProfile | null; _membership: Membership | undefined }) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">HelloPortals — Vue Interne</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/playbooks/editor" className="border rounded p-4 hover:bg-muted/30">Ouvrir l&apos;éditeur de playbooks</Link>
        <Link href="/rooms?type=sales" className="border rounded p-4 hover:bg-muted/30">Sales Rooms</Link>
        <Link href="/rooms?type=success" className="border rounded p-4 hover:bg-muted/30">Success Rooms</Link>
        <Link href="/integrations" className="border rounded p-4 hover:bg-muted/30">Intégrations</Link>
      </div>
    </div>
  );
}