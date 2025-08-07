import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse, type NextRequest } from "next/server";
import { IntegrationType } from "@prisma/client";

function mapProviderToType(provider: string): IntegrationType | null {
  switch (provider) {
    case "salesforce":
      return "SALESFORCE";
    case "notion":
      return "NOTION";
    case "jira":
      return "JIRA";
    case "slack":
      return "SLACK";
    default:
      return null;
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const parts = req.nextUrl.pathname.split("/");
  const integrationsIndex = parts.findIndex((p) => p === "integrations");
  const provider = parts[integrationsIndex + 1] ?? "";
  const type = mapProviderToType(provider);
  if (!type) return new NextResponse("Not Found", { status: 404 });

  const user = await prisma.userProfile.findUnique({ where: { clerkUserId: userId }, include: { memberships: true } });
  const orgId = user?.memberships[0]?.orgId;
  if (!orgId) return new NextResponse("No org", { status: 400 });

  const id = `${orgId}-${type}`;
  const conn = await prisma.integrationConnection.upsert({
    where: { id },
    update: { updatedAt: new Date() },
    create: { id, orgId, type },
  });
  return NextResponse.json(conn);
}