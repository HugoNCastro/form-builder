import { Captions } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/Form/FormElements";
import { z } from "zod";
import { DesignerComponent } from "./DesignerComponent";
import { FormComponent } from "./FormComponent";
import { PropertiesComponent } from "./PropertiesComponent";

const type: ElementsType = "HeaderField";

const extraAttributes = {
  title: "Campo cabeçalho",
};

export const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const HeaderFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Captions,
    label: "Cabeçalho",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};
