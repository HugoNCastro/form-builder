import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { Label } from "@/components/ui/label";
import { Form } from "@prisma/client";
import { AttemptData } from "@/types";

interface FormComponentProps {
  elementInstance: FormElementInstance;
  formInfo?: Form
  attemptData?: AttemptData
}

export function FormComponent({ elementInstance, formInfo, attemptData }: FormComponentProps) {
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
            <p>{attemptData?.cd_agente ? attemptData?.cd_agente : agent}</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Label>
              CAMPANHA:
            </Label>
            <p>{attemptData?.ds_campanha ? attemptData?.ds_campanha : formInfo?.campaignDesc}</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Label>
              COD. CAMPANHA:
            </Label>
            <p>{attemptData?.cd_campanha ? attemptData?.cd_campanha : formInfo?.campaignId}</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Label>
              MAILING:
            </Label>
            <p>{attemptData?.cd_mailing ? attemptData?.cd_mailing :formInfo?.mailingDesc}</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Label>
              TELEFONE:
            </Label>
            <p>{attemptData?.nu_ddd && attemptData?.nu_telefone ? `(${attemptData?.nu_ddd}) ${attemptData.nu_telefone}` : userPhone}</p>
          </div>
        </div>
      </div>
    );
  }