"use client";

import { env } from "@/env";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export function Logo() {
  return (
    <Button className="flex items-center gap-2 bg-transparent hover:bg-inherit" variant={"ghost"}>
      <Image
        src={env.NEXT_PUBLIC_LOGO_PATH}
        alt=""
        width={50}
        height={50}
        className="bg-background rounded-full"
      />
      <Link
        href={"/"}
        className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
      >
        Enquetes {env.NEXT_PUBLIC_CLIENT_NAME}
      </Link>
    </Button>
  );
}
