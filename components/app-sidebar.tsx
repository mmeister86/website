import { Home, Mail, Github, ChevronRight, Gamepad2, BookOpen, Film, Utensils } from "lucide-react"
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

// Typdefinition für Menüelemente mit optionalem Icon für Submenu-Elemente
interface MenuItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  items?: (MenuItem & { icon?: React.ComponentType<{ className?: string }> })[];
}

const menuItems: { navMain: MenuItem[] } = {
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
      url: "https://github.com/mmeister86r",
    },
    {
      title: "Playground",
      url: "#",
      icon: Gamepad2,
      items: [
        {
          title: "SMART Goals",
          url: "/apps/smart-goals",
          icon: BookOpen  
        },
        {
          title: "Movie recommendations",
          url: "/apps/movie-recommendations",
          icon: Film  
        },
        {
          title: "Recipes",
          url: "/apps/recipes",
          icon: Utensils  
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
                                  {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
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
