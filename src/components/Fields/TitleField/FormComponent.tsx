import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";

export function FormComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { title } = element.extraAttributes;
  
  
    return (
      <p className="text-xl">{title}</p>
    );
  }