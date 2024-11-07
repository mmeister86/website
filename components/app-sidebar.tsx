import { Home, Mail, Github, ChevronRight, FolderGit2, Goal } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible"

const menuItems = {
  navMain: [
    {
      title: "Home",
      icon: Home,
      url: "/",
    },
    {
      title: "Contact",
      icon: Mail,
      url: "mailto:hi@matthias.lol",
    },
    {
      title: "GitHub",
      icon: Github,
      url: "https://github.com/matthias-codes",
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderGit2,
      items: [
        {
          title: "SMART Goals",
          url: "/apps/smart-goals",
          icons: Goal
        }
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
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
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
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
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
