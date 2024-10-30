import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { Label } from "@/components/ui/label";
import { SeparatorHorizontal } from "lucide-react";

export function DesignerComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { height } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-2 w-full items-center">
        <Label className="text-muted-foreground">
          Spacer Field: {height}px
          <SeparatorHorizontal className="h-8 w-8" />
        </Label>
      </div>
    );
  }