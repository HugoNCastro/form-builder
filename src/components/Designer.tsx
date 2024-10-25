"use client"

import { cn } from "@/lib/utils"
import { DesignerSidebar } from "./DesignerSidebar"
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { useDesigner } from "./hooks/useDesigner"
import { ElementsType, FormElementInstance, FormElements } from "./FormElements"
import { idGenerator } from "@/lib/idGenerator"
import { useState } from "react"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"

export function Designer() {
  const { elements, addElement } = useDesigner()

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event

      if (!active || !over) return

      const isDesignerButtonElement = active.data?.current?.isDesignerBtnElement

      if (isDesignerButtonElement) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(idGenerator())
        addElement(0, newElement)
      }
    }
  })


  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    }
  })

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={
            cn("bg-background max-w-[920px] h-full m-auto-rounded-xl flex flex-col flex-grow justify-start items-center flex-1 overflow-y-auto",
              droppable.isOver && "ring-2 ring-primary/20"
            )}>

          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow font-bold items-center">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20">
              </div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [isMouseOver, setIsMouseOver] = useState(false)
  const { removeElement } = useDesigner()

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    }
  })

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    }
  })

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true
    }
  })

  if (draggable.isDragging) return null

  const DesignerElement = FormElements[element.type].designerComponent

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md
        ring-1 ring-accent ring-inset"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      {
        isMouseOver && (
          <>
            <div className="absolute right-0 h-full">
              <Button
                variant={"outline"}
                className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
                onClick={() => {
                  removeElement(element.id)
                }}
              >
                <Trash className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <p className="text-muted-foreground text-sm">
                Click for properties or drag to move
              </p>
            </div>
          </>
        )
      }
      {
        topHalf.isOver && (
          <div className="absolute top-0 w-full rounded-md rounded-b-none h-[7px] bg-primary" />
        )
      }
      <div
        className={cn("flex opacity-100 w-full h-[120p] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
          isMouseOver && "opacity-30",
        )}>
        <DesignerElement elementInstance={element} />
      </div>
      {
        bottomHalf.isOver && (
          <div className="absolute bottom-0 w-full rounded-md rounded-t-none h-[7px] bg-primary" />
        )
      }
    </div>
  )
}