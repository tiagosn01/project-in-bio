"use client";
import { Plus } from "lucide-react";
import { startTransition, useState } from "react";
import TextInput from "../../ui/text-input";
import Button from "../../ui/button";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addCustomLinks } from "@/modules/profile/action";

export default function AddCustomLink() {
  const router = useRouter();
  const { profileId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingCustomLinks, setIsSavingCustomLinks] = useState(false);
  const [link1, setLink1] = useState({
    title: "",
    url: "",
  });
  const [link2, setLink2] = useState({
    title: "",
    url: "",
  });
  const [link3, setLink3] = useState({
    title: "",
    url: "",
  });
  const handleSaveCustomLinks = async () => {
    setIsSavingCustomLinks(true);
    if (!profileId) return;
    await addCustomLinks({
      profileId: profileId as string,
      link1,
      link2,
      link3,
    });
    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingCustomLinks(false);
      router.refresh();
    });
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger className="h-fit w-fit rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700">
          <Plus className="text-white" />
        </DialogTrigger>
        <DialogContent className="w-full max-w-[600px] border-border-primary bg-background-primary">
          <DialogHeader>
            <DialogTitle className="py-4 font-semibold">
              Adicionar links personalizados
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex w-full flex-col">
                  <p>Título do link</p>
                  <TextInput
                    placeholder="Digite o título"
                    value={link1.title}
                    onChange={(e) =>
                      setLink1({ ...link1, title: e.target.value })
                    }
                  />
                </div>
                <div className="flex w-full flex-col">
                  <p className="font-bold">Link</p>
                  <TextInput
                    placeholder="Inserir URL"
                    value={link1.url}
                    onChange={(e) =>
                      setLink1({ ...link1, url: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex w-full flex-col">
                  <p>Título do link</p>
                  <TextInput
                    placeholder="Digite o título"
                    value={link2.title}
                    onChange={(e) =>
                      setLink2({ ...link2, title: e.target.value })
                    }
                  />
                </div>
                <div className="flex w-full flex-col">
                  <p className="font-bold">Link</p>
                  <TextInput
                    placeholder="Inserir URL"
                    value={link2.url}
                    onChange={(e) =>
                      setLink2({ ...link2, url: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex w-full flex-col">
                  <p>Título do link</p>
                  <TextInput
                    placeholder="Digite o título"
                    value={link3.title}
                    onChange={(e) =>
                      setLink3({ ...link3, title: e.target.value })
                    }
                  />
                </div>
                <div className="flex w-full flex-col">
                  <p className="font-bold">Link</p>
                  <TextInput
                    placeholder="Inserir URL"
                    value={link3.url}
                    onChange={(e) =>
                      setLink3({ ...link3, url: e.target.value })
                    }
                  />
                </div>
              </div>
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
                onClick={handleSaveCustomLinks}
                disabled={isSavingCustomLinks}
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
