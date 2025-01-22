import ProjectCard from "@/app/components/commons/project-card";
import TotalVisits from "@/app/components/commons/total-visits";
import UserCard from "@/app/components/commons/user-card";
import { Plus } from "lucide-react";
import Link from "next/link";
export default async function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = await params;

  console.log(profileId);
  return (
    <div className="relative flex h-screen overflow-hidden p-20">
      <div className="fixed left-0 top-0 flex w-full items-center justify-center gap-1 bg-background-tertiary py-2">
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="font-bold text-accent-green">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>
      <div className="flex h-min w-1/2 justify-center">
        <UserCard />
      </div>
      <div className="flex w-full flex-wrap content-start justify-center gap-4 overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <button className="flex h-[132px] w-[340px] items-center justify-center gap-2 rounded-[20px] border-border-secondary bg-background-secondary hover:border hover:border-dashed">
          <Plus className="size-10 text-accent-green" />
          <span>Novo projeto</span>
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
        <TotalVisits />
      </div>
    </div>
  );
}
