"use client";

import { env } from "@/env";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAgent } from "../providers/AgentProvider";
import { useEffect, useState } from "react";
import { getAgentPermissions } from "@/actions/agent";
import { useRouter } from "next/navigation"; 
import { AgentItem } from "@/types";

export function Logo() {
  const { agent, setAgent } = useAgent();
  const [agentOnLocalStorage, setAgentOnLocalStorage] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const storedAgent = localStorage.getItem("@surveys/agent");
    setAgentOnLocalStorage(storedAgent);
  }, []);

  async function verifyPermissions(): Promise<string> {
    if (agent && agent.length > 0) {
      const hasEditPermission = agent.some((item) => item.nm_action === "edit");
      if (hasEditPermission) {
        return "/dashboard";
      } else {
        return `/history?agent=${String(agent[0].cd_agente)}`;
      }
    } else if (agentOnLocalStorage !== null) {
      const agentData = await getAgentPermissions(agentOnLocalStorage);
      setAgent(agentData);
      const hasEditPermission = agentData.some((item: AgentItem) => item.nm_action === "edit");
      if (hasEditPermission) {
        return "/dashboard";
      } else {
        return `/history?agent=${String(agentData[0].cd_agente)}`;
      }
    }

    return "/"; 
  }

  const handleRedirect = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    const redirectTo = await verifyPermissions();
    router.push(redirectTo); 
  };

  return (
    <Button
      className="flex items-center gap-2 bg-transparent hover:bg-inherit"
      variant={"ghost"}
      onClick={handleRedirect} 
    >
      <Image
        src={env.NEXT_PUBLIC_LOGO_PATH}
        alt="Logo"
        width={50}
        height={50}
        className="bg-background rounded-full"
      />
      <span className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer">
        Formulários {env.NEXT_PUBLIC_CLIENT_NAME}
      </span>
    </Button>
  );
}
