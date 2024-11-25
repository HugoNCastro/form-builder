"use client";

import { env } from "@/env";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAgent } from "../providers/AgentProvider";
import { useRouter } from "next/navigation";

export function Logo() {
  const { agent } = useAgent();
  const router = useRouter();

  async function verifyPermissions(): Promise<string> {
    if (agent && agent.length > 0) {
      const hasEditPermission = agent.some((item) => item.nm_action === "edit");
      if (hasEditPermission) {
        return "/dashboard";
      }
    }
    return `/history?agent=${String(agent[0].cd_agente)}`;
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
