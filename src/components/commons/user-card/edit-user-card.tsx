"use client";

import { ArrowUpFromLine, UserPen } from "lucide-react";
import { startTransition, useState } from "react";
import TextInput from "../../ui/text-input";
import TextArea from "../../ui/text-area";
import Button from "../../ui/button";

import { useParams, useRouter } from "next/navigation";
import type { ProfileData } from "@/server/profile/types/profile";
import {
  compressFiles,
  handleImageInput,
  triggerImageInput,
} from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { saveProfile } from "@/modules/profile/action";

export default function EditUserCard({
  profileData,
}: {
  profileData?: ProfileData;
}) {
  const router = useRouter();
  const { profileId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [yourName, setYourName] = useState(profileData?.name || "");
  const [yourDescription, setYourDescription] = useState(
    profileData?.description || "",
  );

  async function handleSaveProfile() {
    setIsSavingProfile(true);

    const imagesInput = document.getElementById(
      "profile-pic-input",
    ) as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    if (!profileId) return;

    const formData = new FormData();
    formData.append("profileId", profileId as string);
    formData.append("profilePic", compressedFile[0]);
    formData.append("yourName", yourName);
    formData.append("yourDescription", yourDescription);

    await saveProfile(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsSavingProfile(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="h-fit w-fit rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700">
        <UserPen />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] border-border-primary bg-background-primary">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>

        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-3 text-xs">
            <div className="h-[100px] w-[100px] overflow-hidden rounded-xl bg-background-tertiary">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile Picture"
                  className="object-cover object-center"
                />
              ) : (
                <button
                  onClick={() => triggerImageInput("profile-pic-input")}
                  className="h-full w-full"
                >
                  100x100
                </button>
              )}
            </div>
            <button
              onClick={() => triggerImageInput("profile-pic-input")}
              className="flex items-center gap-2 text-white"
            >
              <ArrowUpFromLine className="size-4" />
              <span>Adicionar foto</span>
            </button>
            <input
              id="profile-pic-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setProfilePic(handleImageInput(e))}
            />
          </div>
          <div className="flex w-[293px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="your-name" className="font-bold text-white">
                Seu nome
              </label>
              <TextInput
                id="your-name"
                placeholder="Digite seu nome"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="your-description"
                className="font-bold text-white"
              >
                Descrição
              </label>
              <TextArea
                id="your-description"
                placeholder="Fale um pouco sobre você"
                className="h-36"
                value={yourDescription}
                onChange={(e) => setYourDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-4">
            <button
              className="font-bold text-white"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
