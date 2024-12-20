"use client";

import { SquarePi } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/Form/FormElements";

import { z } from "zod";

import { DesignerComponent } from "./DesignerComponent";
import { PropertiesComponent } from "./PropertiesComponent";
import { FormComponent } from "./FormComponent";

const type: ElementsType = "NumberField";

const extraAttributes = {
  label: "Campo numérico",
  helperText: "Texto de ajuda",
  required: false,
  placeHolder: "0",
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

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: SquarePi,
    label: "Número",
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
