import { SaveIcon } from "lucide-react";
import { Button } from "./ui/button";

export function SaveFormButton(){
  return (
    <Button variant={"outline"} className="gap-2">
      Save
      <SaveIcon className="h-4 w-4"/>
    </Button>
  )

}