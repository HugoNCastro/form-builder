'use client'

import { FormElementInstance, SubmitFunction } from "@/components/Form/FormElements";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { CheckboxFieldFormElement, CustomInstance } from ".";

export function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue,
  }: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }) {
    const element = elementInstance as CustomInstance;
    const { helperText, label, required } = element.extraAttributes;
    const [value, setValue] = useState<boolean>(
      defaultValue === "true" ? true : false
    );
    const [error, setError] = useState(false);
  
    useEffect(() => {
      setError(isInvalid === true);
    }, [isInvalid]);
  
    const id = `checkbox-${element.id}`;
  
    return (
      <div className="flex top-0 space-x-2">
        <Checkbox
          id={id}
          checked={value}
          className={cn(error && "border-red-500")}
          onCheckedChange={(checked) => {
            let value = false;
            if (checked === true) {
              value = true;
            }
            setValue(value);
  
            if (!submitValue) return;
            const stringValue = value ? "true" : "false";
            const valid = CheckboxFieldFormElement.validate(element, stringValue);
  
            setError(!valid);
            submitValue(element.id, stringValue);
          }}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor={id} className={cn(error && "text-red-500")}>
            {label}
            {required && "*"}
          </Label>
          {helperText && (
            <p
              className={cn(
                "text-muted-foreground text-[0.8rem]",
                error && "text-red-500"
              )}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }