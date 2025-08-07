import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { evaluateExpression, type Expression, type TriggerContext } from "@/lib/trigger-engine";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { orgId, accountId, context } = await req.json();
  const sections = await prisma.portalSection.findMany({ where: { orgId } });

  const ctx: TriggerContext = { now: new Date(), ...(context as object) } as TriggerContext;
  const visible = sections.filter((s) => {
    const cond = s.visibility as unknown as Expression | null;
    if (!cond) return true;
    return evaluateExpression(cond, ctx);
  });

  return NextResponse.json(visible);
}