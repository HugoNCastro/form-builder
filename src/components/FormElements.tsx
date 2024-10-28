import { TextFieldFormElement } from "./Fields/TextField"

export type ElementsType = "TextField"

export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
  type: ElementsType

  construct: (id: string) => FormElementInstance

  designerButtonElement: {
    icon: React.ElementType,
    label: string
  }

  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: SubmitFunction
    isInvalid?: boolean
    defaultValue?: string
  }>
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>

  validate: (formElement: FormElementInstance, currentValue: string) => boolean
}

type FormElementsType = {
  [key in ElementsType]: FormElement
}

export type FormElementInstance = {
  id: string,
  type: ElementsType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraAttributes?: Record<string, any>
}

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement
}