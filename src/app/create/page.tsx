import Header from "@/components/landing-page/header";

import { Rocket } from "lucide-react";
import CreateLinkForm from "./create-link-form";
import { getUserSession } from "@/lib/auth";
export default async function Create() {
  const session = await getUserSession();

  return (
    <div>
      <Header session={session} />
      <div className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>
        <CreateLinkForm />
      </div>
    </div>
  );
}
