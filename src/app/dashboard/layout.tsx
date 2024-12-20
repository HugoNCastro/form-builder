import { Logo } from "@/components/Layout/Logo";
import { ThemeSwitcher } from "@/components/Layout/ThemeSwitcher";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="flex w-full flex-grow p-10">
        {children}
        </main>
    </div>
  );
}
