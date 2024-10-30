"use client"

import { TextCursorInput } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/Form/FormElements";

import { z } from "zod";

import { DesignerComponent } from "./DesignerComponent";
import { PropertiesComponent } from "./PropertiesComponent";
import { FormComponent } from "./FormComponent";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
  text: "Text here",
};

export const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
})

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
}

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: TextCursorInput,
    label: "Paragraph Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
};


