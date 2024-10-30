import { FormElementInstance } from "@/components/Form/FormElements";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CustomInstance } from ".";

export function DesignerComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { helperText, label, required } = element.extraAttributes;
    const id = `checkbox-${element.id}`;
  
    return (
      <div className="flex top-0 space-x-2">
        <Checkbox id={id} />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor={id}>
            {label}
            {required && "*"}
          </Label>
          {helperText && (
            <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
          )}
        </div>
      </div>
    );
  }