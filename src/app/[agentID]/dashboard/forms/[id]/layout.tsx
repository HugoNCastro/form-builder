import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full flex-grow mx-auto">{children}</div>
  )
}