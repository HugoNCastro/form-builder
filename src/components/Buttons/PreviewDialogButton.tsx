'use client'

import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { useDesigner } from "../hooks/useDesigner";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { FormElements } from "../Form/FormElements";
import { useEffect, useState } from "react";
import { Form } from "@prisma/client";
import { GetFormById } from "@/actions/form";

interface PreviewDialogButtonProps {
  formId: number
}

export function PreviewDialogButton({formId}: PreviewDialogButtonProps) {
  const { elements } = useDesigner();
  const [formInfo, setFormInfo] = useState<Form | undefined>(undefined)

  async function FetchForms() {
    const fetchedForms = await GetFormById(formId);
    if(fetchedForms) {
      setFormInfo(fetchedForms);
    } else {
      setFormInfo(undefined)
    }
  }

  useEffect(() => {
    FetchForms()
  }, [])

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
            Seu formulário será mostrado assim
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
            <div className="flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-3xl p-8 overflow-y-auto">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent

                return <FormComponent key={element.id} elementInstance={element} formInfo={formInfo}/>
              })}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
