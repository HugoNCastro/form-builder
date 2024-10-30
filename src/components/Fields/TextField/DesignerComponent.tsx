import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance } from ".";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function DesignerComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { helperText, label, placeHolder, required } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label>
          {label}
          {required && "*"}
        </Label>
        <Input readOnly disabled placeholder={placeHolder} />
        {helperText && (
          <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        )}
      </div>
    );
  }