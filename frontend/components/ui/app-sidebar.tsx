import * as React from "react"

// import { SearchForm } from "@/components/ui/search-form"
import { VersionSwitcher } from "@/components/ui/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Sidebar navigation for TenantShield
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "My Cases",
          url: "/cases",
        },
      ],
    },
    {
      title: "Legal Assistance",
      url: "#",
      items: [
        {
          title: "AI Chatbot",
          url: "/chatbot",
          isActive: true,
        },
        {
          title: "Case Builder",
          url: "/case-builder",
        },
        // {
        //   title: "Legal Document Generator",
        //   url: "/document-generator",
        // },
        // {
        //   title: "Find Legal Aid",
        //   url: "/legal-aid",
        // },
      ],
    },
    // {
    //   title: "User Resources",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Tenant Rights Guide",
    //       url: "/tenant-rights",
    //     },
    //     {
    //       title: "FAQ",
    //       url: "/faq",
    //     },
    //   ],
    // },
    // {
    //   title: "Account",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Profile",
    //       url: "/profile",
    //     },
    //     {
    //       title: "Settings",
    //       url: "/settings",
    //     },
    //   ],
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
        />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild isActive={subItem.isActive}>
                      <a href={subItem.url}>{subItem.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
