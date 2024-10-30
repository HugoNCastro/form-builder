import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";

export function FormComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance
  }) {
    const element = elementInstance as CustomInstance
    const { height } = element.extraAttributes;
  
    return <div style={{ height: height, width: "100%" }} />;
  }