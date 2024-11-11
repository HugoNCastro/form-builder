"use client";

import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance, PropertiesFormSchemaType, propertiesSchema } from ".";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDesigner } from "@/components/hooks/useDesigner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TextAreaWithParam } from "@/components/TextAreaWithParam";
import { useParams } from "next/navigation";
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
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { title } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtítulo</FormLabel>
              <FormControl>
                <TextAreaWithParam
                  name="title"
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
