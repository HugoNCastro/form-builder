import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import { FormSubmitComponent } from "@/components/Form/FormSubmitComponent";

export default async function SubmitPage({
  params
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl)

  if(!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[]

  return (
    <FormSubmitComponent formUrl={params.formUrl} content={formContent} />
  );
}
