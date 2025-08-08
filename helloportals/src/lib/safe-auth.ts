export async function safeAuth(): Promise<{ userId: string | null; isClerkConfigured: boolean }> {
  try {
    const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
    const sk = process.env.CLERK_SECRET_KEY || "";
    const isClerkConfigured = pk.startsWith("pk_") && sk.startsWith("sk_");
    if (!isClerkConfigured) {
      return { userId: null, isClerkConfigured };
    }
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    return { userId: userId ?? null, isClerkConfigured };
  } catch (_err) {
    return { userId: null, isClerkConfigured: false };
  }
}