import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { AppShell } from "@/components/sites/doudaxia/shell";
import { AUTH_KEY } from "@/lib/sites/doudaxia/catalog";

export default async function ConsoleLayout({ children }: { children: ReactNode }) {
  const jar = await cookies();
  const authed = jar.get(AUTH_KEY)?.value === "1";
  return <AppShell authed={authed}>{children}</AppShell>;
}
