import { Heading } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/Form/FormElements";
import { z } from "zod";
import { DesignerComponent } from "./DesignerComponent";
import { FormComponent } from "./FormComponent";
import { PropertiesComponent } from "./PropertiesComponent";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Título",
};

export const propertiesSchema = z.object({
  title: z.string().min(2).max(100, { message: "Limite de caracteres atingido." }),
});

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Heading,
    label: "Título",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
