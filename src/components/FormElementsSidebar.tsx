import { FormElements } from "./FormElements";
import { SidebarButtonElement } from "./SidebarButtonElement";

export function FormElementsSidebar() {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
}
