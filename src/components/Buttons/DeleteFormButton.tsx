"use client";

import { Loader, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DeleteForm } from "@/actions/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface DeleteFormButtonProps {
  id: number;
  onDelete: () => void;
}

export function DeleteFormButton({ id, onDelete }: DeleteFormButtonProps) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    try {
      await DeleteForm(id);

      toast({
        title: "Sucesso",
        description: "Seu formulário foi excluído",
      });

      onDelete()

      router.refresh();
    } catch {
      toast({
        title: "Erro",
        description: "Algo deu errado, por favor tente novamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 text-black w-full dark:text-white bg-red-500 hover:bg-red-600"
        >
          Deletar formulário
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Você tem certeza ?
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
            <br />
            <br />
            <span className="font-medium">
              Após deletar esse formulário, ele não ficará mais disponível
            </span>
          </AlertDialogDescription>
        </AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();
              startTransition(handleDelete);
            }}
            className="text-white bg-red-500 hover:bg-red-600"
          >
            Prosseguir {loading && <Loader className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
