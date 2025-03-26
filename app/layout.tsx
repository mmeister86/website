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
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "matthias.lol",
  description: "Portfolio | sort of a Webdeveloper",
};

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
  return (
    <html lang="en">
      <body className={`${hkGrotesk.variable} antialiased h-screen mx-auto`}>
        <script
          defer
          src="https://umami.matthias.lol/script.js"
          data-website-id="d0ba6033-81c8-414d-ae23-04ff627b7c8f"
        ></script>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarTrigger className="relative top-4 left-4" />

          <div className="flex-1 w-full">{children}</div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
