"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

function isClerkEnabled() {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  return pk.startsWith("pk_") && pk.length > 24 && !pk.includes("placeholder");
}

export function Header() {
  const enabled = isClerkEnabled();
  return (
    <header className="w-full border-b bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold">HelloPortals</Link>
          <Link href="/portal" className="text-sm text-neutral-600 hover:text-black">Portail</Link>
        </div>
        <div>
          {enabled ? (
            <>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="px-3 py-1.5 text-sm rounded-md bg-black text-white">Se connecter</button>
                </SignInButton>
              </SignedOut>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}