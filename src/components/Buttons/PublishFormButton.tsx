import { Pen, SendIcon } from "lucide-react";
import { Button } from "../ui/button";
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

import { toast } from "@/hooks/use-toast";

import { useTransition } from "react";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

export function PublishFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);

      toast({
        title: "Sucesso",
        description: "Seu formulário está disponível para preenchimento",
      });
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
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          Publicar
          <SendIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Você tem certeza ?
          <AlertDialogDescription>
            Essa ação poderá ser alterada posteriormente. 
            <br />
            <br />
            <span className="font-medium">
              Após publicar esse formulário, ele ficará disponível para
              preenchimento.
            </span>
          </AlertDialogDescription>
        </AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();
              startTransition(publishForm);
            }}
            className="text-white"
          >
            Prosseguir {loading && <Pen className="animate-spin" />}
            {/* Change icon to spinner */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
