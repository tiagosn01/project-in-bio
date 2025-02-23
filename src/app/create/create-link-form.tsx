"use client";

import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { createLink, verifyLink } from "@/modules/create/actions";
import { sanitizeLink } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CreateLinkForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [link, setLink] = useState(
    sanitizeLink(searchParams.get("link") || ""),
  );
  const [error, setError] = useState("");
  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError("");
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Quando o usuario nao escreve um link
    if (link.length === 0) return setError("Escolha um link primeiro :)");
    // Quando o usuario escolhe um link ja existente
    const isLinkTaken = await verifyLink(link);
    if (isLinkTaken) return setError("Desculpe, esse link já está em uso.");
    // Criar o perfil
    const isLinkCreated = await createLink(link);
    if (!isLinkCreated)
      return setError("Erro ao criar o perfil. Tente novamente.");
    router.push(`/${link}`);
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
        <span>projectinbio.com/</span>
        <TextInput value={link} onChange={handleLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}
