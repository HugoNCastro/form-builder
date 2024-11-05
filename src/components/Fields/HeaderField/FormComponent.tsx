import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { Label } from "@/components/ui/label";
import { Form } from "@prisma/client";

interface FormComponentProps {
  elementInstance: FormElementInstance;
  formInfo?: Form
}

export function FormComponent({ elementInstance, formInfo }: FormComponentProps) {
    const element = elementInstance as CustomInstance;
    const { agent, colorHeader,  userPhone } = element.extraAttributes;

    return (
      <div className="flex flex-col rounded-sm p-2 gap-2 w-full" style={{
        backgroundColor: colorHeader
      }}>
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
        </div>
      </div>
    );
  }