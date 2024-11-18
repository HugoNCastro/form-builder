"use client";

import { ReactNode, useEffect } from "react";
import { useAgent } from "../providers/AgentProvider";
import { getAgentPermissions } from "@/actions/agent";

interface HomeWrapperProps {
  children: ReactNode;
  agentID: string;
}

export function HomeWrapper({ agentID, children }: HomeWrapperProps) {
  const { setAgent } = useAgent();

  async function getAgentData(agent: string) {
    getAgentPermissions(agent).then((data) => {
      if (data) {
        setAgent(data);
      }
    });
  }

  useEffect(() => {
    if (agentID !== undefined) {
      getAgentData(agentID);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentID, setAgent]);

  return <div>{children}</div>;
}
