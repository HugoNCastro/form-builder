import { FormElementInstance } from "@/components/Form/FormElements";
import { Label } from "@/components/ui/label";
import { CustomInstance } from ".";

export function DesignerComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { text } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
          Parágrafo
        </Label>
        <p>{text}</p>
      </div>
    );
  }