"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function VisitButton({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = useState(false);

  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted) return null

  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
}
