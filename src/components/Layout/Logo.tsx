"use client";

import { env } from "@/env";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAgent } from "../providers/AgentProvider";

export function Logo() {
  const { agent } = useAgent();

  const verifyPermissions = agent.some((item) => item.nm_action === "edit")
    ? "/dashboard"
    : `/history?agent=${String(agent[0].cd_agente)}`;

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
        href={verifyPermissions}
        className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
      >
        Formulários {env.NEXT_PUBLIC_CLIENT_NAME}
      </Link>
    </Button>
  );
}
