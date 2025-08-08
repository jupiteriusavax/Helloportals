import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const sk = process.env.CLERK_SECRET_KEY || "";
const clerkEnabled = pk.startsWith("pk_") && sk.startsWith("sk_");

const safeMiddleware = clerkEnabled ? clerkMiddleware() : (() => NextResponse.next());

export default safeMiddleware;

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api/webhooks).*)",
    "/(api|trpc)(.*)",
  ],
};