import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const hasClerkKeys =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
  typeof process.env.CLERK_SECRET_KEY === "string" &&
  process.env.CLERK_SECRET_KEY.startsWith("sk_");

const disableClerk = process.env.DISABLE_CLERK_MIDDLEWARE === "true";
const useClerk = hasClerkKeys && !disableClerk;

const delegatedClerkMiddleware = useClerk ? clerkMiddleware() : null;

export default function middleware(req: NextRequest, evt: unknown) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/api/webhooks")) {
    return NextResponse.next();
  }
  if (!delegatedClerkMiddleware) {
    return NextResponse.next();
  }
  try {
    // @ts-expect-error: delegate Clerk's internal middleware signature
    return delegatedClerkMiddleware(req, evt);
  } catch (_err) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api/webhooks).*)",
    "/(api|trpc)(.*)",
  ],
};