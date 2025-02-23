"use client";
import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import { startTransition, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextInput from "../../ui/text-input";
import Button from "../../ui/button";
import type { ProfileData } from "@/server/profile/types/profile";
import { createSocialLinks } from "@/modules/profile/action";

export default function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: ProfileData["socialMedias"];
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);
  const [github, setGithub] = useState(socialMedias?.github || "");
  const [instagram, setInstagram] = useState(socialMedias?.instagram || "");
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || "");
  const [twitter, setTwitter] = useState(socialMedias?.twitter || "");

  const { profileId } = useParams();

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true);
    if (!profileId) return;
    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    });
    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingSocialLinks(false);
      router.refresh();
    });
  }
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger className="h-fit w-fit rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700">
          <Plus className="text-accent-green" />
        </DialogTrigger>
        <DialogContent className="w-full max-w-[600px] border-border-primary bg-background-primary">
          <DialogHeader>
            <DialogTitle className="py-4 font-semibold">
              Adicionar redes sociais
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center gap-2">
              <Github />
              <TextInput
                type="text"
                placeholder="Link Github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-2">
              <Linkedin />
              <TextInput
                type="text"
                placeholder="Link LinkedIn"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-2">
              <Instagram />
              <TextInput
                type="text"
                placeholder="Link Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-2">
              <Twitter />
              <TextInput
                type="text"
                placeholder="Link Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="font-bold text-white"
              >
                Voltar
              </button>
              <Button
                onClick={handleAddSocialLinks}
                disabled={isSavingSocialLinks}
              >
                Salvar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
