"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";

export default function CreateNow() {
  const [link, setLink] = useState("");

  return (
    <div className="mt-[10vh] flex w-full items-center gap-2">
      <span className="text-xl text-white">projectinbio.com/</span>
      <TextInput
        placeholder="Seu link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button
        onClick={() => {
          signIn("google", {
            callbackUrl: `/create?link=${link}`,
          });
        }}
      >
        Criar agora
      </Button>
    </div>
  );
}
