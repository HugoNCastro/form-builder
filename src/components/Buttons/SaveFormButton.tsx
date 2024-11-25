import { Loader, SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDesigner } from "../hooks/useDesigner";
import { useTransition } from "react";

export function SaveFormButton({
  onSave,
}: {
  onSave: (updatedContent: string) => Promise<void>;
}) {
  const { elements } = useDesigner();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    const jsonElements = JSON.stringify(elements);
    startTransition(() => onSave(jsonElements));
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={isPending}
      onClick={handleSave}
    >
      <SaveIcon className="h-4 w-4" />
      Salvar
      {isPending && <Loader className="animate-spin h-4 w-4" />}
    </Button>
  );
}
