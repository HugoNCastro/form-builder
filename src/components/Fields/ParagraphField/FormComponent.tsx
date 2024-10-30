import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";

export function FormComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { text } = element.extraAttributes;
  
  
    return (
      <p>{text}</p>
    );
  }