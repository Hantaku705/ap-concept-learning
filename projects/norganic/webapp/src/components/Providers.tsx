"use client";

import { EditProvider } from "@/contexts/EditContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <EditProvider>{children}</EditProvider>;
}
