import { Home, User, Mail, Github } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "About",
    icon: User,
    url: "/about",
  },
  {
    title: "Contact",
    icon: Mail,
    url: "/contact",
  },
  {
    title: "GitHub",
    icon: Github,
    url: "https://github.com/matthias-codes",
  },
]

export function AppSidebar({ variant = "inset" }: { variant?: "sidebar" | "floating" | "inset" }) {
  return (
    <Sidebar 
      collapsible="offcanvas" 
      variant={variant}
      className="z-50"
      title={undefined}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
