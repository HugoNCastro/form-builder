import { FormElement } from "../Form/FormElements"
import { Button } from "../ui/button"

export function SidebarButtonElementDragOverlay({ formElement }: { formElement: FormElement }) {
    const { icon: Icon, label } = formElement.designerButtonElement
  
    return (
      <Button
        variant={"outline"}
        className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
      >
        <Icon className="h-8 w-8 text-primary cursor-grab" />
        <p className="text-xs">{label}</p>
      </Button>
    )
  }