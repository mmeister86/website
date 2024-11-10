import {
  Home,
  Mail,
  Github,
  ChevronRight,
  Gamepad2,
  BookOpen,
  Film,
  Utensils,
  Book,
} from "lucide-react";
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
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

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
      title: "Notes",
      icon: Book,
      url: "/notes",
    },
    {
      title: "GitHub",
      icon: Github,
      url: "https://github.com/mmeister86r",
    },
    {
      title: "Contact",
      icon: Mail,
      url: "mailto:hi@matthias.lol",
    },
    {
      title: "Tiny apps",
      url: "#",
      icon: Gamepad2,
      items: [
        {
          title: "SMART Goals",
          url: "/apps/smart-goals",
          icon: BookOpen,
        },
        {
          title: "Movie recommendations",
          url: "/apps/movie-recommendations",
          icon: Film,
        },
        {
          title: "Recipes",
          url: "/apps/recipes",
          icon: Utensils,
        },
      ],
    },
  ],
};

export function AppSidebar(){
  return (
    <Sidebar collapsible="offcanvas" variant="floating" className="h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>A little navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.navMain.slice(0, 4).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Playground</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.navMain.slice(4).map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  {subItem.icon && (
                                    <subItem.icon className="mr-2 h-4 w-4" />
                                  )}
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
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
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
  );
}
