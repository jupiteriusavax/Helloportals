import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getPortalVariant } from "@/lib/rbac";
import InternalPortal from "@/components/portal/internal-portal";
import ClientPortal from "@/components/portal/client-portal";
import StakeholderPortal from "@/components/portal/stakeholder-portal";

export default async function PortalPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await prisma.userProfile.findUnique({ where: { clerkUserId: userId! }, include: { memberships: true } });
  const membership = user?.memberships[0];
  const variant = getPortalVariant(membership?.roleType ?? "CLIENT");

  if (variant === "internal") return <InternalPortal _user={user} _membership={membership} />;
  if (variant === "stakeholder") return <StakeholderPortal _user={user} _membership={membership} />;
  return <ClientPortal _user={user} _membership={membership} />;
}