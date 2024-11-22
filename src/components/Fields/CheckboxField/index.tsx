"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../Form/FormElements";

import { z } from "zod";

import { CheckboxIcon } from "@radix-ui/react-icons";
import { DesignerComponent } from "./DesignerComponent";
import { FormComponent } from "./FormComponent";
import { PropertiesComponent } from "./PropertiesComponent";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
  label: "Campo checkbox",
  helperText: "Texto de ajuda",
  required: false,
};

export const propertiesSchema = z.object({
  label: z
    .string()
    .min(2)
    .max(300, { message: "Limite de caracteres atingido." }),
  helperText: z
    .string()
    .max(300, { message: "Limite de caracteres atingido." }),
  required: z.boolean().default(false),
});

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: CheckboxIcon,
    label: "Checkbox",
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
      return currentValue === "true";
    }

    return true;
  },
};
