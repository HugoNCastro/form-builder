import { Loader, SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDesigner } from "../hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";

export function SaveFormButton({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Sucesso",
        description: "Seu formulário foi salvo",
      });
    } catch {
      toast({
        title: "Erro",
        description: "Algo deu errado, por favor tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <SaveIcon className="h-4 w-4" />
      Salvar
      {loading && <Loader className="animate-spin h-4 w-4" />}
    </Button>
  );
}
