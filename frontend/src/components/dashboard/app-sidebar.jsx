"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenuItem, SidebarMenu, SidebarMenuButton, useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, SettingsIcon, StarIcon, VideoIcon } from "lucide-react";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    },
    {
        icon: SettingsIcon,
        label: "Settings",
        href: "/settings"
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    }
]

export const DashboardSidebar = () => {
    const [pathname, setPathname] = useState(() => window.location.pathname);
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    useEffect(() => {
        const handleLocationChange = () => setPathname(window.location.pathname);
        window.addEventListener("popstate", handleLocationChange);
        window.addEventListener("hashchange", handleLocationChange);
        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.removeEventListener("hashchange", handleLocationChange);
        };
    }, []);
    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                {!isCollapsed && (
                    <a href="/" className="flex items-center gap-2 px-2 pt-2">
                        <p className="text-2xl font-semibold">Urban Grid</p>
                    </a>
                )}
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 px-3 text-sidebar-foreground hover:bg-white/5",
                                        isCollapsed && "justify-center px-0",
                                        pathname === item.href && "bg-white/10"
                                    )}
                                        isActive={pathname === item.href}
                                    >
                                        <a href={item.href} className={cn("flex items-center gap-3", isCollapsed && "justify-center")}> 
                                            <item.icon size={20} className="text-sidebar-foreground" />
                                            <span className={cn("text-sm font-medium tracking-tight", isCollapsed && "hidden")}>
                                                {item.label}
                                            </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-1">
                    <Separator className="opacity-10 text-[#5D6B68]" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 px-3 text-sidebar-foreground hover:bg-white/5",
                                        isCollapsed && "justify-center px-0",
                                        pathname === item.href && "bg-white/10"
                                    )}
                                        isActive={pathname === item.href}
                                    >
                                        <a href={item.href} className={cn("flex items-center gap-3", isCollapsed && "justify-center")}> 
                                            <item.icon size={20} className="text-sidebar-foreground" />
                                            <span className={cn("text-sm font-medium tracking-tight", isCollapsed && "hidden")}>
                                                {item.label}
                                            </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={cn("text-white", isCollapsed && "flex justify-center")}>
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}