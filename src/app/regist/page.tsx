import { AuthForm } from "@/components/sites/doudaxia/auth-form";

export default async function RegistPage({
  searchParams,
}: {
  searchParams: Promise<{ activeTab?: string }>;
}) {
  const { activeTab } = await searchParams;
  return <AuthForm mode="regist" initialTab={activeTab === "1" ? "reset" : "register"} />;
}
