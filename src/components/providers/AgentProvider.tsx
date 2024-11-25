"use client";

import { AgentContext } from "@/components/context/AgentContext";
import { AgentItem } from "@/types";
import { ReactNode, useContext, useState } from "react";
import { getAgentPermissions } from "@/actions/agent";

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agent, setAgent] = useState<Array<AgentItem>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function setAgentData(agentIdentifier: string) {
    try {
      setLoading(true);
      setError(null);

      if (agent.length === 0) {
        const localStorageAgentIdentifier =
          window.localStorage.getItem("@cmx-forms/agent");

        if (localStorageAgentIdentifier) {
          const agent = await getAgentPermissions(localStorageAgentIdentifier);
          setAgent(agent);
          window.localStorage.setItem(
            "@cmx-forms/agent-permissions",
            JSON.stringify(agent)
          );
        }

        if (!localStorageAgentIdentifier) {
          const agent = await getAgentPermissions(agentIdentifier);
          setAgent(agent);
          window.localStorage.setItem(
            "@cmx-forms/agent-permissions",
            JSON.stringify(agent)
          );
        }
      }
    } catch (err) {
      console.error("Erro ao buscar os dados do agente:", err);
      setError("Não foi possível carregar os dados do agente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AgentContext.Provider value={{ agent, setAgentData, loading, error }}>
      {children}
    </AgentContext.Provider>
  );
}

export const useAgent = () => useContext(AgentContext);
