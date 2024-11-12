'use client'

import { FormElementInstance } from "@/components/Form/FormElements";
import { CustomInstance, PropertiesFormSchemaType, propertiesSchema } from ".";
import { useDesigner } from "@/components/hooks/useDesigner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ColorPicker } from "@/components/ColorPicker";
import { LoaderCircle, Palette } from "lucide-react";
import { ColorHeaderContext } from "@/components/context/ColorHeaderContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement } = useDesigner();
  const { color } = useContext(ColorHeaderContext)

  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      agent: element.extraAttributes.agent,
      mailingDesc: element.extraAttributes.mailingDesc,
      campaignDesc: element.extraAttributes.campaignDesc,
      campaignId: element.extraAttributes.campaignId,
      colorHeader: element.extraAttributes.colorHeader,
      userPhone: element.extraAttributes.userPhone,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [form, element]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { agent, campaignDesc, campaignId, colorHeader, mailingDesc, userPhone } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        agent,
        mailingDesc,
        campaignDesc,
        campaignId,
        colorHeader: color === '' ? colorHeader : color,
        userPhone
      },
    });

    toast({
      title: "Sucesso",
      description: "Propriedades salvas com sucesso",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(applyChanges)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="colorHeader"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-baseline">
              <FormLabel>Escolha a cor do cabeçalho: </FormLabel>
                <FormControl>
                  <ColorPicker {...field} icon={<Palette />} />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-muted-foreground text-sm">Após escolha, clique abaixo para salvar</p>
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <LoaderCircle className="animate-spin"/>}
          {!form.formState.isSubmitting && <>Salvar</>}
        </Button>
      </form>
    </Form >
  );
}
