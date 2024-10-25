import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";

export function PublishFormButton(){
  return (
    <Button variant={"outline"} 
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
      Publish
      <SendIcon className="h-4 w-4"/>
    </Button>
  )

}