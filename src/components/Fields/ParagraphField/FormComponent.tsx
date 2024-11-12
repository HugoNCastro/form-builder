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
    const { text } = element.extraAttributes;
  
  
    return (
      <p>{parseMentions(text, attemptData || ({} as AttemptData))}</p>
    );
  }