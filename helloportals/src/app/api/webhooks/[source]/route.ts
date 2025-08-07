import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.WEBHOOK_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const parts = req.nextUrl.pathname.split("/");
  const webhooksIndex = parts.findIndex((p) => p === "webhooks");
  const source = parts[webhooksIndex + 1] ?? "unknown";
  return NextResponse.json({ received: true, source, body });
}