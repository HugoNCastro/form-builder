"use client";

import { Calendar1 } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../Form/FormElements";
import { z } from "zod";
import { DesignerComponent } from "./DesignerComponent";
import { PropertiesComponent } from "./PropertiesComponent";
import { FormComponent } from "./FormComponent";

const type: ElementsType = "DateField";

const extraAttributes = {
  label: "Campo data",
  helperText: "Escolha uma data",
  required: false,
};

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Calendar1,
    label: "Data",
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

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;


