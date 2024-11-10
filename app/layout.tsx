"use client";

import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

const hkGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/hkgrotesk-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/hkgrotesk-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/hkgrotesk-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/hkgrotesk-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hk-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${hkGrotesk.variable} antialiased h-screen mx-auto`}>
        <SidebarProvider defaultOpen={false}>
          <div className="flex flex-col h-full">
            <header className="w-full p-4">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                {pathname !== "/" && (
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbPage>{pathname.split('/').pop()}</BreadcrumbPage>
                    </BreadcrumbList>
                  </Breadcrumb>
                )}
              </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />
              <main className="flex-1 overflow-auto flex justify-center items-center p-4">
                <div className="max-w-4xl w-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </SidebarProvider>
      </body>
    </html>
  );
}
