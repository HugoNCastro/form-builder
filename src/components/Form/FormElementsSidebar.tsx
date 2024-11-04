import { FormElements } from "./FormElements";
import { SidebarButtonElement } from "../Buttons/SidebarButtonElement";
import { Separator } from "../ui/separator";

export function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Arraste e solte os elementos</p>
      <Separator className="my-2" />
      <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
        Elementos de exibição
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
        <SidebarButtonElement formElement={FormElements.TitleField} />
        <SidebarButtonElement formElement={FormElements.SubTitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <SidebarButtonElement formElement={FormElements.SeparatorField} />
        <SidebarButtonElement formElement={FormElements.SpacerField} />
        <SidebarButtonElement formElement={FormElements.HeaderField} />
      </div>

      <Separator className="my-2" />
      <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
        Elementos de formulário
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
        <SidebarButtonElement formElement={FormElements.TextField} />
        <SidebarButtonElement formElement={FormElements.NumberField} />
        <SidebarButtonElement formElement={FormElements.TextAreaField} />
        <SidebarButtonElement formElement={FormElements.DateField} />
        <SidebarButtonElement formElement={FormElements.SelectField} />
        <SidebarButtonElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
}
