"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function VisitButton({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = useState(false);
  const [shareLink, setShareLink] = useState('')

  useEffect(() => {
    const link = `${window.location.origin}/submit/${shareURL}`;
    setShareLink(link)
  }, [shareURL])

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
      Visualizar
    </Button>
  );
}
