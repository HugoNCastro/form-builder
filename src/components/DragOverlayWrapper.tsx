import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react"
import { SidebarButtonElement, SidebarButtonElementDragOverlay } from "./SidebarButtonElement"
import { ElementsType, FormElements } from "./FormElements"
import { useDesigner } from "./hooks/useDesigner"

export function DragOverlayWrapper() {
  const { elements } = useDesigner()
  const [draggedItem, setDraggetItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggetItem(event.active)
    },
    onDragCancel: () => {
      setDraggetItem(null)
    },
    onDragEnd: () => {
      setDraggetItem(null)
    }
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((el) => el.id === elementId)

    if (!element) node = <div>Element not found!</div>
    else {
      const DesignerElementComponent = FormElements[element.type].designerComponent

      node = 
      <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80">
        <DesignerElementComponent elementInstance={element} />
      </div>
    }
  }

  return (
    <DragOverlay>{node}</DragOverlay>
  )
}