import { redirect } from "next/navigation";
import { getPortalVariant } from "../../lib/rbac";
import InternalPortal from "../../components/portal/internal-portal";
import ClientPortal from "../../components/portal/client-portal";
import StakeholderPortal from "../../components/portal/stakeholder-portal";
import { safeAuth } from "../../lib/safe-auth";
import type { UserProfile, Membership } from "@prisma/client";

export default async function PortalPage() {
  const { userId, isClerkConfigured } = await safeAuth();
  if (isClerkConfigured && !userId) {
    redirect("/sign-in");
  }

  // Try to load the user profile if possible; tolerate missing DB/env on preview
  let user: (UserProfile & { memberships: Membership[] }) | null = null;
  try {
    if (userId) {
      const { prisma } = await import("../../lib/db");
      user = await prisma.userProfile.findUnique({ where: { clerkUserId: userId }, include: { memberships: true } });
    }
  } catch (_err) {
    user = null;
  }

  const membership = user?.memberships?.[0];
  const variant = getPortalVariant(membership?.roleType ?? "CLIENT");

  if (variant === "internal") return <InternalPortal _user={user} _membership={membership} />;
  if (variant === "stakeholder") return <StakeholderPortal _user={user} _membership={membership} />;
  return <ClientPortal _user={user} _membership={membership} />;
}