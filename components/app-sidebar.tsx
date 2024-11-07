import { Home, User, Mail, Github,  Settings2 } from "lucide-react"
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

const menuItems = {
  navMain: [
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
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

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
          <SidebarGroupLabel><h2 className="font-bold text-xl py-6">Navigation</h2></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pt-10">
              {menuItems.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
