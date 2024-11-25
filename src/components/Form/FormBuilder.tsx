"use client";

import { Form } from "@prisma/client";
import { PreviewDialogButton } from "../Buttons/PreviewDialogButton";
import { SaveFormButton } from "../Buttons/SaveFormButton";
import { PublishFormButton } from "../Buttons/PublishFormButton";
import { Designer } from "../Designer/Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DragOverlayWrapper } from "../Designer/DragOverlayWrapper";
import { useEffect, useState } from "react";
import { useDesigner } from "../hooks/useDesigner";
import { ArrowLeftIcon, ArrowRightIcon, Pen } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import Confetti from "react-confetti";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAgent } from "../providers/AgentProvider";
import { GetFormById, UpdateFormContent } from "@/actions/form";

export default function FormBuilder({ id }: { id: number }) {
  const [form, setForm] = useState({} as Form);
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const { agent } = useAgent();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5, // 5px
    },
  });

  async function fetchForm(id: number) {
    const fetchedForm = await GetFormById(id);
    if (fetchedForm) {
      setForm(fetchedForm);
      setElements(JSON.parse(fetchedForm.content));
      setSelectedElement(null);
      setIsReady(true);
    }
  }

  useEffect(() => {
    if (isReady) return;

    if (id) {
      fetchForm(id);
      const readyTimeout = setTimeout(() => setIsReady(true), 500);

      return () => clearTimeout(readyTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleSave(updatedContent: string) {
    if (!form || agent.length === 0) return;

    try {
      const updatedForm = await UpdateFormContent(
        form.id,
        updatedContent,
        agent[0]
      );
      setForm(updatedForm);
      toast({ title: "Sucesso", description: "Seu formulário foi salvo." });
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o formulário. Tente novamente.",
        variant: "destructive",
      });
    }
  }

  const sensors = useSensors(mouseSensor, touchSensor);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Pen className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.sharedURL}`;

  if (agent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        Problema interno, por favor reabra a página.
      </div>
    );
  }

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10"></h1>
            <h2 className="text-2xl">Compartilhar formulário</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Qualquer pessoa com o link poderá visualizar o formulário
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Link copiado com sucesso",
                    description:
                      "Agora você pode compatilhar esse link com outras pessoas",
                  });
                }}
              >
                Copiar link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/dashboard"} className="gap-2">
                  <ArrowLeftIcon />
                  Página principal
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/dashboard/forms/${form.id}`} className="gap-2">
                  Detalhes do formulário
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 gap-3 p-3">
          <div>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Formulário: </span>
              {form.name}
            </h2>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Autor: </span>
              {form.author} | {form.authorAccount}
            </h2>
          </div>
          <div>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Campanha | Mailing: </span>
              {form.campaignDesc} | {form.mailingDesc}
            </h2>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Criado em: </span>
              {formatDate(form.createdAt, "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })}
            </h2>
          </div>
          <div>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">
                Atualizado por:{" "}
              </span>
              {form.updatedBy} | {form.updatedByAccount}
            </h2>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">
                Atualizado em:{" "}
              </span>
              {formatDate(form.updatedAt, "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })}
            </h2>
          </div>
        </nav>
        <div className="flex items-center justify-end gap-2 mt-2 mb-2">
          <PreviewDialogButton formId={form.id} />
          {!form.published && (
            <>
              <SaveFormButton onSave={handleSave} />
              <PublishFormButton id={form.id} />
            </>
          )}
        </div>
        <div
          className="flex flex-grow items-center justify-center relative overflow-y-auto h-[200px] 
      bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]"
        >
          <Designer formId={form.id} />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
