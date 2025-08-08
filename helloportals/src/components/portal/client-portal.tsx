"use client";

import type { UserProfile, Membership } from "@prisma/client";

export default function ClientPortal({ _user, _membership }: { _user: UserProfile | null; _membership: Membership | undefined }) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Votre portail client</h1>
      <p>Bienvenue. Retrouvez vos tâches d&apos;onboarding, documents et mises à jour.</p>
    </div>
  );
}