'use client'

import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance, PropertiesFormSchemaType, propertiesSchema } from ".";
import { useDesigner } from "@/components/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useParams } from "next/navigation";
import { TextAreaWithParam } from "@/components/TextAreaWithParam";
import prisma from "@prisma/client";
import { GetFormById } from "@/actions/form";

export function PropertiesComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const params = useParams<{ id: string }>();
    const [formInfo, setFormInfo] = useState<prisma.Form | undefined>(undefined);
  
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

    async function FetchForms() {
      const fetchedForms = await GetFormById(Number(params.id));
      if (fetchedForms) {
        setFormInfo(fetchedForms);
      } else {
        setFormInfo(undefined);
      }
    }
  
    useEffect(() => {
      FetchForms();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
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
                <TextAreaWithParam
                  name="text"
                  value={field.value}
                  onChange={field.onChange}
                  mailingId={formInfo?.mailingId}
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