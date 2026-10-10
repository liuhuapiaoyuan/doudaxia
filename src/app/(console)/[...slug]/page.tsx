import type { Metadata } from "next";
import { ConsoleView } from "@/components/sites/doudaxia/console-view";
import { batchTools, pageTitles } from "@/lib/sites/doudaxia/nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const title = pageTitles[key] || batchTools.find((tool) => tool.href === `/${key}`)?.title || "页面未找到";
  return { title };
}

export default async function ConsolePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <ConsoleView slug={slug.join("/")} />;
}
