import { Pen, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { toast } from "@/hooks/use-toast";

import { useTransition } from "react";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

export function PublishFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);

      toast({
        title: "Success",
        description: "Your form is now available to the public",
      });
      router.refresh()
    } catch {
      toast({
        title: "Error",
        description: "Somehing went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          Publish
          <SendIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
        Are you absolutely sure ?
          <AlertDialogDescription>
            This action cannot be undone. After you publishing you will not be
            able to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it availabel to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <Pen className="animate-spin" />}
            {/* Change icon to spinner */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
