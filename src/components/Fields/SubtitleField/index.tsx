import { Heading2 } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/Form/FormElements";

import { z } from "zod";
import { DesignerComponent } from "./DesignerComponent";
import { FormComponent } from "./FormComponent";
import { PropertiesComponent } from "./PropertiesComponent";

const type: ElementsType = "SubTitleField";

const extraAttributes = {
  title: "Subtítulo",
};

export const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Heading2,
    label: "Subtítulo",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
