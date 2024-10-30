'use client'

import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance, PropertiesFormSchemaType, propertiesSchema } from ".";
import { useDesigner } from "@/components/hooks/useDesigner";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";

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
        label: element.extraAttributes.label,
        helperText: element.extraAttributes.helperText,
        required: element.extraAttributes.required,
        placeHolder: element.extraAttributes.placeholder,
      },
    });
  
    useEffect(() => {
      form.reset(element.extraAttributes);
    }, [form, element]);
  
    function applyChanges(values: PropertiesFormSchemaType) {
      const { helperText, label, placeHolder, required } = values;
  
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          label,
          helperText,
          required,
          placeHolder,
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
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The label of the field <br /> It will displayed above the field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="placeHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PlaceHolder</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>The placeholder of the field</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper text</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The helper text of the field. <br /> It will be displayed below
                  the field.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Required</FormLabel>
  
                  <FormDescription>
                    The helper text of the field. <br /> It will be displayed
                    below the field.{" "}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
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