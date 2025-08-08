import { ClerkProvider } from "@clerk/nextjs";

export function SafeClerkProvider({ children }: { children: React.ReactNode }) {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const looksValid = pk.startsWith("pk_") && pk.length > 24 && !pk.includes("placeholder");
  if (!looksValid) {
    return <>{children}</>;
  }
  return <ClerkProvider>{children}</ClerkProvider>;
}