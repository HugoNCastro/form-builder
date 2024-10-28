import { SidebarCloseIcon } from "lucide-react";
import { FormElements } from "./FormElements";
import { useDesigner } from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesFrom =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Elements properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <SidebarCloseIcon />
        </Button>
      </div>
      <Separator className="mb-4"/>
      <PropertiesFrom elementInstance={selectedElement} />
    </div>
  );
}
