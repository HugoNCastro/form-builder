'use client'

import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance, PropertiesFormSchemaType, propertiesSchema } from ".";
import { useDesigner } from "@/components/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function PropertiesComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
  
    const { updateElement } = useDesigner();
  
    const form = useForm<PropertiesFormSchemaType>({
      resolver: zodResolver(propertiesSchema),
      mode: "onBlur",
      defaultValues: {
        text: element.extraAttributes.text
      },
    });
  
    useEffect(() => {
      form.reset(element.extraAttributes);
    }, [form, element]);
  
    function applyChanges(values: PropertiesFormSchemaType) {
      const { text } = values;
  
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          text
        },
      });
    }
  
    return (
      <Form {...form}>
        <form
          onBlur={form.handleSubmit(applyChanges)}
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }