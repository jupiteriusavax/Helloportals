import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma, RoomType } from "@prisma/client";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const url = new URL(req.url);
  const typeParam = url.searchParams.get("type");
  let where: Prisma.RoomWhereInput = {};
  if (typeParam) {
    const upper = typeParam.toUpperCase();
    if (upper === "SALES" || upper === "SUCCESS") {
      where = { type: upper as RoomType };
    }
  }
  const rooms = await prisma.room.findMany({ where, take: 50, orderBy: { updatedAt: "desc" } });
  return NextResponse.json(rooms);
}