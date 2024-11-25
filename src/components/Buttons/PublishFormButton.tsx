import { Loader, SendIcon } from "lucide-react";
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

import { useTransition } from "react";

export function PublishFormButton({
  id,
  onPublish,
}: {
  id: number;
  onPublish: (id: number) => Promise<void>;
}) {
  const [loading, startTransition] = useTransition();

  async function publishForm() {
    onPublish(id);
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
            Prosseguir {loading && <Loader className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
