import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/DesignerContext";
import { env } from "@/env";
import { ColorHeaderProvider } from "@/components/providers/ColorHeaderProvider";
import { AgentProvider } from "@/components/providers/AgentProvider";
import { Inter } from "next/font/google"


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  display: "swap",
})

export const metadata: Metadata = {
  title: `Formulários | ${env.NEXT_PUBLIC_CLIENT_NAME}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="icon"
        href="/logos/banrisul.png"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body
        className={`${inter.variable} antialiased`}
      >
        <AgentProvider>
          <ColorHeaderProvider>
            <DesignerContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </DesignerContextProvider>
          </ColorHeaderProvider>
        </AgentProvider>
      </body>
    </html>
  );
}
