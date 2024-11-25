'use client'

import { FormElementInstance, SubmitFunction } from "@/components/Form/FormElements";
import { CustomInstance, NumberFieldFormElement } from ".";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
    const { helperText, label, placeHolder, required } = element.extraAttributes;
    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);
  
    useEffect(() => {
      setError(isInvalid === true);
    }, [isInvalid]);
  
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label className={cn(error && "text-red-500")}>
          {label}
          {required && "*"}
        </Label>
        <Input
          type="number"
          className={cn(error && "border-red-500")}
          min={0}
          placeholder={placeHolder}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => {
            if (!submitValue) return;
            const valid = NumberFieldFormElement.validate(
              element,
              e.target.value
            );
            setError(!valid);
            if (!valid) return;
  
            submitValue(element.id, e.target.value);
          }}
          value={value}
        />
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
    );
  }
  