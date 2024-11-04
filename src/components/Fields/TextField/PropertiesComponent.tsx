"use client";

import { FormElementInstance } from "@/components/Form/FormElements";
import { useDesigner } from "@/components/hooks/useDesigner";
import { CustomInstance, PropertiesFormSchemaType, propertiesSchema } from ".";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@radix-ui/react-switch";

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
              <FormLabel>Enunciado</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Enunciado do campo <br /> Será mostrado acima do elemento
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
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Placeholder do campo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto de ajuda</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Texto de ajuda. <br /> Será mostrado abaixo do elemento.{" "}
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
                <FormLabel>Obrigatório ?</FormLabel>

                <FormDescription>
      Selecione para obrigatoriedade de preenchimento
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
