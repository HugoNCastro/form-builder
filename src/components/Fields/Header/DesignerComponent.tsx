import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { Label } from "@/components/ui/label";

export function DesignerComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { title} = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
          Cabeçalho
        </Label>
        <p className="text-xl">{title}</p>
      </div>
    );
  }