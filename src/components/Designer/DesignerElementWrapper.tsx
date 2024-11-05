"use client"

import { cn } from "@/lib/utils";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FormElementInstance, FormElements } from "../Form/FormElements";
import { useDesigner } from "../hooks/useDesigner";
import { GetFormById } from "@/actions/form";
import { Form } from "@prisma/client";

interface DesignerElementWrapperPropps {
  element: FormElementInstance,
  formId: number
}

export function DesignerElementWrapper({ element, formId }:  DesignerElementWrapperPropps ) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { removeElement, setSelectedElement } = useDesigner();
  const [formInfo, setFormInfo] = useState<Form | undefined>(undefined)

  async function FetchForms() {
    const fetchedForms = await GetFormById(formId);
    if(fetchedForms) {
      setFormInfo(fetchedForms);
    } else {
      setFormInfo(undefined)
    }
  }

  useEffect(() => {
    FetchForms()
  }, [])


  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-full flex flex-col text-foreground hover:cursor-pointer rounded-md
          ring-1 ring-blue-400 ring-inset"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      {isMouseOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant={"outline"}
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Clique para ver as propriedades ou arraste para mover
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md rounded-b-none h-[7px] bg-primary" />
      )}
      <div
        className={cn(
          "flex opacity-100 w-full h-[120p] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
          isMouseOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} formInfo={formInfo}/>
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md rounded-t-none h-[7px] bg-primary" />
      )}
    </div>
  );
}