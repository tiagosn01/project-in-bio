import ProjectCard from "@/components/commons/project-card";
import TotalVisits from "@/components/commons/total-visits";
import UserCard from "@/components/commons/user-card/user-card";
import { increaseProfileVisits } from "@/modules/profile/action";
import NewProject from "@/modules/profile/components/new-project";
import { getUserSession } from "@/lib/auth";
import { getDownloadURLFromPath } from "@/lib/firebase";
import {
  getProfileData,
  getProfileProjects,
} from "@/server/profile/profile-data";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  const profileData = await getProfileData(profileId);
  if (!profileData) return notFound();

  const session = await getUserSession();
  const isOwner = profileData.userId === session?.user?.id;

  if (!isOwner) {
    await increaseProfileVisits(profileId);
  }

  if (isOwner && !session?.user.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  const projects = await getProfileProjects(profileId);
  return (
    <div className="relative flex h-screen overflow-hidden p-20">
      {session?.user?.isTrial && !session?.user?.isSubscribed && (
        <div className="fixed left-0 top-0 flex w-full items-center justify-center gap-1 bg-background-tertiary py-2">
          <span>Você está usando a versão trial.</span>
          <Link href={`/${profileId}/upgrade`}>
            <button className="font-bold text-accent-green">
              Faça o upgrade agora!
            </button>
          </Link>
        </div>
      )}
      <div className="flex h-min w-1/2 justify-center">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className="flex w-full flex-wrap content-start justify-center gap-4 overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={(await getDownloadURLFromPath(project.imagePath)) || ""}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      <div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
        {isOwner && (
          <div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
            <TotalVisits
              totalVisits={profileData.totalVisits}
              showBar
              session={session}
            />
          </div>
        )}
      </div>
    </div>
  );
}
