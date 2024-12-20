import { PencilRuler } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PencilRuler className="animate-spin h-12 w-12" />
    </div>
  );
}
