import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { AttemptData } from "@/types";
import { parseMentions } from "@/utils/parseMentions";

export function FormComponent({
    elementInstance,
    attemptData
  }: {
    elementInstance: FormElementInstance,
    attemptData?: AttemptData;
  }) {
    const element = elementInstance as CustomInstance;
    const { title } = element.extraAttributes;
  
  
    return (
      <p className="text-xl">{parseMentions(title, attemptData || ({} as AttemptData))}</p>
    );
  }