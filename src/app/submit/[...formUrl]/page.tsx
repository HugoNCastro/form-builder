import { GetFormContentByUrl } from "@/actions/form";
import { GetUserDataByAttempt } from "@/actions/user";
import { FormElementInstance } from "@/components/Form/FormElements";
import { FormSubmitComponent } from "@/components/Form/FormSubmitComponent";
import { AttemptData } from "@/types";

export default async function SubmitPage({
  params
}: {
  params: {
    formUrl: Array<string>
  }
}) {
  const form = await GetFormContentByUrl(params.formUrl[0])
  const agentID = params.formUrl[1]
  const attemptData: Array<AttemptData> = await GetUserDataByAttempt(params.formUrl[2])


  if(!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[]

  return (
    <FormSubmitComponent formUrl={params.formUrl[0]} content={formContent} attemptData={attemptData[0]} agentID={agentID}/>
  );
}
