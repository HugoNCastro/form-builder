"use client";

import {
  FormElementInstance,
  SubmitFunction,
} from "@/components/Form/FormElements";
import { CustomInstance, TextAreaFieldFormElement } from ".";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { AttemptData } from "@/types";
import { parseMentions } from "@/utils/parseMentions";

export function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
  attemptData
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
  attemptData?: AttemptData;
}) {
  const element = elementInstance as CustomInstance;
  const { helperText, label, placeHolder, required, rows } =
    element.extraAttributes;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {parseMentions(label, attemptData || ({} as AttemptData))}
        {required && "*"}
      </Label>
      <Textarea
        className={cn(
          error && "border-red-500",
          "min-h-40 max-h-80 overflow-y-auto"
        )}
        rows={rows}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextAreaFieldFormElement.validate(
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
