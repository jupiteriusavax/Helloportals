"use client";

import { ReactNode } from "react";

interface SafeClerkProviderProps {
  children: ReactNode;
}

export function SafeClerkProvider({ children }: SafeClerkProviderProps) {
  return <>{children}</>;
}