import { ReactNode } from "react";
import { ElementsType } from "../Form/FormElements";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { TableCell } from "../ui/table";
import { format } from "date-fns";

export function RowCell({ type, value }: { type: ElementsType; value: string }) {
    let node: ReactNode = value;
  
    switch (type) {
      case "DateField":
        if(!value) break
        const date = new Date(value);
        node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>
        break;
      case "CheckboxField":
        const checked = value === "true" ? true : false;
        node = <Checkbox checked={checked} disabled />
        break
      default:
        break;
    }
  
    return <TableCell>{node}</TableCell>;
  }