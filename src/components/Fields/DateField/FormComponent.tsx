"use client"

import { FormElementInstance, SubmitFunction } from "@/components/Form/FormElements";
import { CustomInstance, DateFieldFormElement } from ".";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

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
  
    const [date, setDate] = useState<Date | undefined>(
      defaultValue ? new Date(defaultValue) : undefined
    );
  
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                error && "border-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Escolha uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
              <Calendar 
                mode="single"
                selected={date}
                onSelect={date => {
                  setDate(date)
  
                  if(!submitValue) return
                  const value = date?.toUTCString() || ""
                  const valid = DateFieldFormElement.validate(element, value)
  
                  setError(!valid)
                  submitValue(element.id, value)
                }}
                initialFocus
              />
          </PopoverContent>
        </Popover>
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