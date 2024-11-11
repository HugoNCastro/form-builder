import { GetFormContentByUrl } from "@/actions/form";
import { GetUserDataByAttempt } from "@/actions/user";
import { FormElementInstance } from "@/components/Form/FormElements";
import { FormSubmitComponent } from "@/components/Form/FormSubmitComponent";
import { AttemptData } from "@/types";

export default async function SubmitPage({
  params
}: {
  params: {
    formUrl: string;
    cd_tentativa: string
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl)
  const attemptData: Array<AttemptData> = await GetUserDataByAttempt(params.cd_tentativa)

  if(!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[]

  return (
    <FormSubmitComponent formUrl={params.formUrl} content={formContent} attemptData={attemptData[0]}/>
  );
}
