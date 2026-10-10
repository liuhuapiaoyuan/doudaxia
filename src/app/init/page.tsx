import type { Metadata } from "next";
import { BootScreen } from "@/components/sites/doudaxia/boot-screen";

export const metadata: Metadata = { title: "客户端初始化" };

export default function InitPage() {
  return <BootScreen title="客户端初始化" />;
}
