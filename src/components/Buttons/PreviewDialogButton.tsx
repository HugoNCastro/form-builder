import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { useDesigner } from "../hooks/useDesigner";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { FormElements } from "../Form/FormElements";

export function PreviewDialogButton() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          Visualizar
          <Eye className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-w-full max-h-screen flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Pré-visualização
          </p>
          <p className="text-sm text-muted-foreground">
            Sua enquete será mostrada assim
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
            <div className="flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-3xl p-8 overflow-y-auto">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent

                return <FormComponent key={element.id} elementInstance={element}/>
              })}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
