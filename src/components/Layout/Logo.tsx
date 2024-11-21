"use client";

import { env } from "@/env";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAgent } from "../providers/AgentProvider";
import { useEffect, useState } from "react";

export function Logo() {
  const { agent } = useAgent();
  const [agentOnLocalStorage, setAgentOnLocalStorage] = useState<string | null>(null);
  
  useEffect(() => {
    const storedAgent = localStorage.getItem("@surveys/agent");
    setAgentOnLocalStorage(storedAgent);
  }, []);

  function verifyPermissions() {
    if (agent && agent.length > 0) {
      const hasEditPermission = agent.some((item) => item.nm_action === "edit");
      if (hasEditPermission) {
        return "/dashboard";
      } else {
        return `/history?agent=${String(agent[0].cd_agente)}`;
      }
    }

    if (agentOnLocalStorage) {
      return `/history?agent=${agentOnLocalStorage}`;
    }

    return "/";
  }

  const redirectTo = verifyPermissions();

  return (
    <Button
      className="flex items-center gap-2 bg-transparent hover:bg-inherit"
      variant={"ghost"}
    >
      <Image
        src={env.NEXT_PUBLIC_LOGO_PATH}
        alt=""
        width={50}
        height={50}
        className="bg-background rounded-full"
      />
      <Link
         href={redirectTo}
        className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
      >
        Formulários {env.NEXT_PUBLIC_CLIENT_NAME}
      </Link>
    </Button>
  );
}
