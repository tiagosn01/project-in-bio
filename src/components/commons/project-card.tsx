"use client";

import { increaseProjectVisits } from "@/modules/create/actions";
import { formatUrl } from "@/lib/utils";
import type { ProjectData } from "@/server/profile/types/profile";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectCard({
  project,
  isOwner,
  img,
  name,
  description,
}: {
  project?: ProjectData;
  isOwner?: boolean;
  img: string;
  name?: string;
  description?: string;
}) {
  const { profileId } = useParams();

  const formattedUrl = formatUrl(project?.projectUrl || "");

  async function handleClick() {
    if (!profileId || !project?.id || isOwner) return;

    await increaseProjectVisits(profileId as string, project?.id);
  }

  return (
    <Link href={formattedUrl} target="_blank" onClick={handleClick}>
      <div className="flex h-[132px] w-[340px] gap-5 rounded-[20px] border border-transparent bg-background-secondary p-3 hover:border-border-secondary">
        <div className="size-24 flex-shrink-0 overflow-hidden rounded-md">
          <img src={img} alt="Projeto" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="text-xs font-bold uppercase text-accent-green">
              {project?.totalVisits || 0} cliques
            </span>
          )}

          <div className="flex flex-col">
            <span className="font-bold text-white">
              {name || project?.projectName}
            </span>
            <span className="text-sm text-content-body">
              {description || project?.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
