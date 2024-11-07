import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const hkGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/hkgrotesk-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/hkgrotesk-medium-webfont.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/hkgrotesk-semibold-webfont.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/hkgrotesk-bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-hk-grotesk',
});

export const metadata: Metadata = {
  title: "matthias.lol",
  description: "Portfolio | sort of a Webdeveloper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hkGrotesk.variable} antialiased flex overflow-hidden`}>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SidebarTrigger className="absolute top-4 left-4 z-50" />
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Analytics />
        <SpeedInsights />
        </body>
    </html>
  );
}
