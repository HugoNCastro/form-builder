import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { ColorHeaderContext } from "@/components/context/ColorHeaderContext";
import { Form } from "@prisma/client";


interface DesignComponentProps {
  elementInstance: FormElementInstance;
  formInfo?: Form
}

export function DesignerComponent({ elementInstance, formInfo }: DesignComponentProps) {
  const element = elementInstance as CustomInstance;
  const { agent, colorHeader, userPhone } = element.extraAttributes;

  const { color } = useContext(ColorHeaderContext)

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-muted-foreground text-xl">
        Cabeçalho
      </h1>
      <div className="grid grid-cols-3 space-y-1">
        <div className="flex items-center gap-1 text-sm font-medium">
          <Label>
            AGENTE:
          </Label>
          <p>{agent}</p>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Label>
            CAMPANHA:
          </Label>
          <p>{formInfo?.campaignDesc}</p>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Label>
            COD. CAMPANHA:
          </Label>
          <p>{formInfo?.campaignId}</p>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Label>
            MAILING:
          </Label>
          <p>{formInfo?.mailingDesc}</p>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Label>
            TELEFONE:
          </Label>
          <p>{userPhone}</p>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Label>
            COR:
          </Label>
          <div
            className="h-6 w-24 rounded-sm"
            style={{
              backgroundColor: color === '' ? colorHeader : color
            }}
          />
        </div>
      </div>
    </div>
  );
}