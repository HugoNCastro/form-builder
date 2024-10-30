"use client";

import { cn } from "@/lib/utils";
import { DesignerSidebar } from "../Designer/DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDroppable,
} from "@dnd-kit/core";
import { useDesigner } from "../hooks/useDesigner";
import {
  ElementsType,
  FormElements,
} from "../Form/FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { DesignerElementWrapper } from "./DesignerElementWrapper";

export function Designer() {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } =
    useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerBtnElement;

      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      // Dropping a sidebar button element over the drop area
      const droppingSidebarButtonOverDesignerDropArea =
        isDesignerButtonElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarButtonOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;
      const droppingSidebarButtonOverDesignerElement =
        isDesignerButtonElement && isDroppingOverDesignerElement;

      // Dropping a sidebar button element over a designer element
      if (droppingSidebarButtonOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex(
          (element) => element.id === overId
        );
        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }

        let indexForNewElement = overElementIndex; // assume element in top half

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      //Dropping designer element over a designer element
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement

      const draggingDesignerElementOverAnotherDesignerElement =  isDroppingOverDesignerDropArea && isDraggingDesignerElement

      if(draggingDesignerElementOverAnotherDesignerElement){
        const activeId = active.data?.current?.elementId
        const overId = over.data?.current?.elementId

        const activeElementIndex = elements.findIndex(element => element.id === activeId)
        const overElementIndex = elements.findIndex(element => element.id === overId)
        
        if(activeElementIndex === -1 || overElementIndex === -1){
          throw new Error('Element not found')
        }
        const activeElement = {...elements[activeElementIndex]}
        removeElement(activeId)

        let indexForNewElement = overElementIndex; // assume element in top half

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement)
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[1020px] lg:w-[1020px] sm:w-[400px] md:w-[600px] h-full m-auto rounded-xl flex flex-col flex-grow justify-start items-center flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow font-bold items-center">
              Solte aqui
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
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
  );
}


