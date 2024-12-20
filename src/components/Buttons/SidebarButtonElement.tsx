import { useDraggable } from "@dnd-kit/core";
import { FormElement } from "@/components/Form/FormElements";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SidebarButtonElement({ formElement }: { formElement: FormElement }) {
  const { icon: Icon, label } = formElement.designerButtonElement

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    }
  })

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}