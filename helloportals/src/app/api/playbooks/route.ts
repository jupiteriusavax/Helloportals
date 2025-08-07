import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";

const PlaybookSchema = z.object({
  name: z.string().min(1),
  orgId: z.string().min(1),
  accountId: z.string().optional(),
  isTemplate: z.boolean().optional().default(false),
  graphJson: z.any(),
});

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const playbooks = await prisma.playbook.findMany({ take: 50, orderBy: { updatedAt: "desc" } });
  return NextResponse.json(playbooks);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const input = PlaybookSchema.parse(body);
  const created = await prisma.playbook.create({ data: input });
  return NextResponse.json(created, { status: 201 });
}