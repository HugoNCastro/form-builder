import { Text } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/Form/FormElements";

import { z } from "zod";

import { DesignerComponent } from "./DesignerComponent";
import { FormComponent } from "./FormComponent";
import { PropertiesComponent } from "./PropertiesComponent";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Campo de texto",
  helperText: "Texto de ajuda",
  required: false,
  placeHolder: "Digite aqui...",
};

export const propertiesSchema = z.object({
  label: z
    .string()
    .min(2)
    .max(50, { message: "Limite de caracteres atingido." }),
  helperText: z
    .string()
    .max(200, { message: "Limite de caracteres atingido." }),
  required: z.boolean().default(false),
  placeHolder: z
    .string()
    .max(50, { message: "Limite de caracteres atingido." }),
});

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Text,
    label: "Texto",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0; // obrigatoriedade de preenchimento de campo texto
    }

    return true;
  },
};
