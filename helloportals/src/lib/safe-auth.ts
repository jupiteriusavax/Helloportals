export async function safeAuth(): Promise<{ userId: string | null; isClerkConfigured: boolean }> {
  // Simplified version without Clerk dependency
  return { userId: null, isClerkConfigured: false };
}