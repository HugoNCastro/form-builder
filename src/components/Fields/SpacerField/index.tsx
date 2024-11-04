import { SeparatorHorizontal } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/Form/FormElements";

import { z } from "zod";
import { DesignerComponent } from "./DesignerComponent";
import { PropertiesComponent } from "./PropertiesComponent";
import { FormComponent } from "./FormComponent";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20, //px
};

export const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: SeparatorHorizontal,
    label: "Espaçador",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};





