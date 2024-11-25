import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { Form } from "@prisma/client";
import { AttemptData } from "@/types";

interface FormComponentProps {
  elementInstance: FormElementInstance;
  formInfo?: Form;
  attemptData?: AttemptData;
}

export function FormComponent({
  elementInstance,
  formInfo,
  attemptData,
}: FormComponentProps) {
  const element = elementInstance as CustomInstance;
  const { agent, colorHeader, userPhone } = element.extraAttributes;

  return (
    <div
      className="gap-2 p-1.5 rounded-sm"
      style={{ backgroundColor: colorHeader }}
    >
      <div className="flex gap-2">
        <p className="font-bold">Agente: </p>
        <p>{attemptData?.cd_agente ? attemptData?.cd_agente : agent}</p>
        <p className="font-bold">Campanha: </p>
        <p>
          {attemptData?.ds_campanha
            ? attemptData?.ds_campanha
            : formInfo?.campaignDesc}
        </p>
      </div>
      <div className="flex gap-2">
        <p className="font-bold">Cod. Campanha: </p>
        <p>
          {attemptData?.cd_campanha
            ? attemptData?.cd_campanha
            : formInfo?.campaignId}
        </p>
        <p className="font-bold">Mailing: </p>
        <p>
          {attemptData?.ds_campanha_arquivo
            ? attemptData?.ds_campanha_arquivo
            : formInfo?.mailingDesc}
        </p>
      </div>
      <div className="flex gap-2">
        <p className="font-bold">Telefone: </p>
        <p>
          {attemptData?.nu_ddd && attemptData?.nu_telefone
            ? `(${attemptData?.nu_ddd}) ${attemptData.nu_telefone}`
            : userPhone}
        </p>
      </div>
    </div>
  );
}
