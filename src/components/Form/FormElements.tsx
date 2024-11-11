import { Form } from "@prisma/client";
import { CheckboxFieldFormElement } from "../Fields/CheckboxField";
import { DateFieldFormElement } from "../Fields/DateField";
import { HeaderFieldFormElement } from "../Fields/HeaderField";
import { NumberFieldFormElement } from "../Fields/NumberField";
import { ParagraphFieldFormElement } from "../Fields/ParagraphField";
import { SelectFieldFormElement } from "../Fields/SelectField";
import { SeparatorFieldFormElement } from "../Fields/SeparatorField";
import { SpacerFieldFormElement } from "../Fields/SpacerField";
import { SubTitleFieldFormElement } from "../Fields/SubtitleField";
import { TextAreaFieldFormElement } from "../Fields/TextAreaField";
import { TextFieldFormElement } from "../Fields/TextField";
import { TitleFieldFormElement } from "../Fields/TitleField";
import { AttemptData } from "@/types";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"
  | "HeaderField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
    formInfo?: Form | undefined
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
    formInfo?: Form | undefined
    attemptData?: AttemptData
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
    mailingId?: string
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
  HeaderField: HeaderFieldFormElement
};
