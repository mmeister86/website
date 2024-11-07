import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
      <body className={`${hkGrotesk.variable} antialiased flex`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 relative z-0">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
