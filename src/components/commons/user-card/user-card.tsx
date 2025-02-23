import { Github, Instagram, Linkedin, Twitter, Plus } from "lucide-react";
import Button from "../../ui/button";
import EditSocialLinks from "./edit-social-links";
import Link from "next/link";
import type { ProfileData } from "@/server/profile/types/profile";
import AddCustomLink from "./add-custom-link";
import { formatUrl } from "@/lib/utils";
import { getDownloadURLFromPath } from "@/lib/firebase";
import EditUserCard from "./edit-user-card";
export default async function UserCard({
  profileData,
  isOwner,
}: {
  profileData?: ProfileData;
  isOwner?: boolean;
}) {
  const icons = [Github, Instagram, Linkedin, Twitter, Plus];
  return (
    <div className="flex w-[348px] flex-col items-center gap-5 rounded-3xl border border-white border-opacity-10 bg-[#121212] p-5 text-white">
      <div className="size-48">
        <img
          src={
            (await getDownloadURLFromPath(profileData?.imagePath)) || "/me.webp"
          }
          alt="Profile image"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 overflow-hidden text-3xl font-bold">
            {profileData?.name || "Usuário"}
          </h3>
          {isOwner && <EditUserCard profileData={profileData} />}
        </div>
        <p className="opacity-40">
          {profileData?.description || "Eu faço produtos para a Internet"}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Links</span>
        <div className="flex gap-3">
          {profileData?.socialMedias?.github && (
            <Link
              target="_blank"
              href={profileData?.socialMedias?.github}
              className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700"
            >
              <Github />
            </Link>
          )}
          {profileData?.socialMedias?.instagram && (
            <Link
              target="_blank"
              href={profileData?.socialMedias?.instagram}
              className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700"
            >
              <Instagram />
            </Link>
          )}
          {profileData?.socialMedias?.linkedin && (
            <Link
              target="_blank"
              href={profileData?.socialMedias?.linkedin}
              className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700"
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link
              target="_blank"
              href={profileData?.socialMedias?.twitter}
              className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700"
            >
              <Twitter />
            </Link>
          )}

          {!profileData &&
            icons.map((Icon, index) => (
              <button
                key={index}
                className="h-fit w-fit rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700"
              >
                <Icon />
              </button>
            ))}

          {isOwner && (
            <EditSocialLinks socialMedias={profileData?.socialMedias} />
          )}
        </div>
      </div>
      <div className="flex h-fit w-full flex-col gap-3">
        <div className="flex w-full flex-col items-center gap-3">
          {profileData?.link1 && (
            <Link
              href={formatUrl(profileData?.link1.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2 && (
            <Link
              href={formatUrl(profileData?.link2.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && (
            <Link
              href={formatUrl(profileData?.link3.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link3.title}</Button>
            </Link>
          )}
        </div>
      </div>
      {!profileData && (
        <button className="h-fit w-fit rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700">
          <Plus />
        </button>
      )}
      {isOwner && <AddCustomLink />}
    </div>
  );
}
