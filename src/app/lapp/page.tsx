import type { Metadata } from "next";
import { BootScreen } from "@/components/sites/doudaxia/boot-screen";

export const metadata: Metadata = { title: "轻应用初始化" };

export default function LappPage() {
  return <BootScreen title="正在进入轻应用..." />;
}
