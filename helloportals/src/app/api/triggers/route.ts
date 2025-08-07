import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";

const TriggerSchema = z.object({
  name: z.string().min(1),
  orgId: z.string().min(1),
  accountId: z.string().optional(),
  expression: z.any(),
  actions: z.any(),
});

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const items = await prisma.trigger.findMany({ take: 50, orderBy: { updatedAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const input = TriggerSchema.parse(body);
  const created = await prisma.trigger.create({ data: input });
  return NextResponse.json(created, { status: 201 });
}