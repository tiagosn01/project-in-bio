"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";

import { createProject } from "../../create/actions";
import { compressFiles } from "@/lib/utils";

export function useNewProject(profileId: string) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProjectImage(imageURL);
    }
  }

  async function handleCreateProject() {
    setIsCreatingProject(true);
    const imagesInput = document.getElementById(
      "imageInput",
    ) as HTMLInputElement;
    if (!imagesInput.files?.length) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));
    const formData = new FormData();
    formData.append("file", compressedFile[0]);
    formData.append("profileId", profileId);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectUrl", projectUrl);

    await createProject(formData);
    startTransition(() => {
      handleCloseModal();
      setIsCreatingProject(false);
      setProjectName("");
      setProjectDescription("");
      setProjectUrl("");
      setProjectImage(null);
      router.refresh();
    });
  }

  return {
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
    isCreatingProject,
  };
}
