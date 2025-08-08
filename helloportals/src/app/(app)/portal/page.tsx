import { redirect } from "next/navigation";
import { getPortalVariant } from "../../lib/rbac";
import InternalPortal from "../../components/portal/internal-portal";
import ClientPortal from "../../components/portal/client-portal";
import StakeholderPortal from "../../components/portal/stakeholder-portal";
import { safeAuth } from "../../lib/safe-auth";

export default async function PortalPage() {
  const { userId, isClerkConfigured } = await safeAuth();
  if (isClerkConfigured && !userId) {
    redirect("/sign-in");
  }

  // Simplified version without database dependency
  const user = null;
  const membership = null;
  const variant = getPortalVariant("CLIENT");

  if (variant === "internal") return <InternalPortal _user={user} _membership={membership} />;
  if (variant === "stakeholder") return <StakeholderPortal _user={user} _membership={membership} />;
  return <ClientPortal _user={user} _membership={membership} />;
}