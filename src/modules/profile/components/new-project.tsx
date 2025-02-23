"use client";

import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextArea from "@/components/ui/text-area";
import TextInput from "@/components/ui/text-input";

import { useNewProject } from "../hooks/useNewProject";
import Image from "next/image";
import { ArrowUpFromLine, Plus } from "lucide-react";

export default function NewProject({ profileId }: { profileId: string }) {
  const {
    isOpen,
    handleOpenModal,
    handleCloseModal,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    projectUrl,
    setProjectUrl,
    projectImage,
    handleImageInput,
    triggerImageInput,
    handleCreateProject,
  } = useNewProject(profileId);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenModal}>
        <DialogTrigger className="flex h-[132px] w-[340px] items-center justify-center gap-2 rounded-[20px] border-border-secondary bg-background-primary hover:border hover:border-dashed">
          <Plus className="size-10 text-accent-green" />
          <span>Novo projeto</span>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[600px] border-border-primary bg-background-primary">
          <DialogHeader>
            <DialogTitle>Novo projeto</DialogTitle>
          </DialogHeader>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="h-[100px] w-[100px] overflow-hidden rounded-xl bg-background-tertiary">
                {projectImage ? (
                  <Image
                    src={projectImage}
                    alt="Project Image"
                    width={100}
                    height={100}
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="h-full w-full"
                    onClick={() => triggerImageInput("imageInput")}
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="flex items-center gap-2 text-white"
                onClick={() => triggerImageInput("imageInput")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageInput(e)}
              />
            </div>
            <div className="flex w-[293px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="font-bold text-white">
                  Titulo do projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="font-bold text-white"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="font-bold text-white">
                  URL do projeto
                </label>
                <TextInput
                  type="url"
                  id="project-description"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleCloseModal()}
                className="font-bold text-white"
              >
                Voltar
              </button>
              <Button onClick={handleCreateProject}>Salvar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
