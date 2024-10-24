"use client";

import Link from "next/link";

export function Logo() {
  return <Link href={"/"} className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer">Surveys Form</Link>;
}
