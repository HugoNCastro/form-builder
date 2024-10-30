'use client'

import { FormElementInstance, SubmitFunction } from "@/components/Form/FormElements";
import { CustomInstance, SelectFieldFormElement } from ".";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const { helperText, label, placeHolder, required, options } =
      element.extraAttributes;
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
        <Select
          defaultValue={value}
          onValueChange={(value) => {
            setValue(value);
            if (!submitValue) return;
            const valid = SelectFieldFormElement.validate(element, value);
            setError(!valid);
            submitValue(element.id, value);
          }}
        >
          <SelectTrigger className={cn("w-full", error && "border-red-500")}>
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => {
              return (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
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