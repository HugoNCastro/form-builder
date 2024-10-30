"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Share } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function FormLinkShare({ shareURL }: { shareURL: string }) {
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
    <div className="flex flex-grow gap-4 items-center">
        <Input value={shareLink} readOnly/>        
        <Button className="w-[250px]" onClick={() => {
            navigator.clipboard.writeText(shareLink);
            toast({
                title: "Copiado!",
                description: "Link copiado para área de transferência"
            })
        }}>
            <Share className="mr-2 h-4 w-4"/>
            Compartilhar link
        </Button>
    </div>
  );
}
