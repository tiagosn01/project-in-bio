import Header from "@/components/landing-page/header";
import PlanButtons from "@/modules/profile/components/plan-buttons";
import { getUserSession } from "@/lib/auth";
export default async function UpgradePage() {
  const session = await getUserSession();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Header session={session} />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <PlanButtons />
    </div>
  );
}
