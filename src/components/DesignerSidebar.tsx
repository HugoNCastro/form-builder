import { FormElements } from "./FormElements";
import { SidebarButtonElement } from "./SidebarButtonElement";

export function DesignerSidebar(){
  return (
    <aside className="flex flex-col flex-grow w-[400px] max-w-[400px] gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      Elements
      <SidebarButtonElement formElement={FormElements.TextField}/>
    </aside>
  )
}