"use client";

import { cn } from "@/lib/utils";
import { DesignerSidebar } from "../Designer/DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useDesigner } from "../hooks/useDesigner";
import { ElementsType, FormElements } from "../Form/FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { DesignerElementWrapper } from "./DesignerElementWrapper";

interface DesignerProps {
  formId: number;
}

export function Designer({ formId }: DesignerProps) {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) {
        console.error("Evento dragend sem active ou over", { active, over });
        return;
      }

      const activeData = active.data?.current;
      const overData = over.data?.current;

      if (!activeData || !overData) {
        console.error("Dados de active ou over ausentes", {
          activeData,
          overData,
        });
        return;
      }

      const isDesignerButtonElement = activeData.isDesignerBtnElement || false;
      const isDroppingOverDesignerDropArea =
        overData.isDesignerDropArea || false;

      const droppingSidebarButtonOverDesignerDropArea =
        isDesignerButtonElement && isDroppingOverDesignerDropArea;

      // Primeiro cenário - dropando elemento na área de drop
      if (droppingSidebarButtonOverDesignerDropArea) {

        const type = activeData.type;

        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
        return;
      }
      // Fim do primeiro cenário

      const isDroppingOverDesignerElementTopHalf =
        overData.isTopHalfDesignerElement || false;
      const isDroppingOverDesignerElementBottomHalf =
        overData.isBottomHalfDesignerElement || false;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarButtonOverDesignerElement =
        isDesignerButtonElement && isDroppingOverDesignerElement;

      // Segundo cenário - dropando elemento acima ou abaixo de outro
      if (droppingSidebarButtonOverDesignerElement) {
        const type = activeData.type;

        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        const overElementId = overData.elementId;

        const overElementIndex = elements.findIndex(
          (element) => element.id === overElementId
        );
        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }
      // Fim do segundo cenário

      // Terceiro cenário - movendo itens dentro da drop area
      const isDraggingDesignerElement = activeData.isDesignerElement || false;
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeElementId = activeData.elementId;
        const overElementId = overData.elementId;

        if (!activeElementId || !overElementId) {
          console.error("IDs de active ou over não encontrados", {
            active,
            over,
          });
          return;
        }

        const activeElementIndex = elements.findIndex(
          (element) => element.id === activeElementId
        );
        const overElementIndex = elements.findIndex(
          (element) => element.id === overElementId
        );

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };

        removeElement(activeElementId);

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      } else {
        console.error(
          "Condição inesperada encontrada. Verifique o evento:",
          event
        );
        throw new Error("Algo de errado aconteceu");
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
            <p className="animate-pulse text-3xl text-muted-foreground flex flex-grow font-bold items-center">
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
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                  formId={formId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
