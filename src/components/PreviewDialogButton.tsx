import { Eye } from "lucide-react";
import { Button } from "./ui/button";

export function PreviewDialogButton(){
  return (
    <Button variant={"outline"} className="gap-2">
      Preview
      <Eye className="h-6 w-6"/>
    </Button>
  )

}