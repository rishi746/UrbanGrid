"use client";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";

export function DashboardUserButton() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const user = {
    name: "Alex Urban",
    email: "alex@urbangrid.gov",
    image: "https://github.com/shadcn.png",
  };

  const handleLogout = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          "rounded-lg border border-border/10 p-3 w-full flex items-center gap-x-2 bg-white/5 hover:bg-white/10"
        }
      >
        <Avatar className={isCollapsed ? "size-9" : "size-9 mr-3"}>
          <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="flex min-w-0 flex-1 flex-col text-left overflow-hidden">
            <p className="text-sm truncate">{user.name}</p>
            <p className="text-xs truncate">{user.email}</p>
          </div>
        )}
        {!isCollapsed && <ChevronDownIcon className="size-4 shrink-0" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-56 p-2 m-2">
        <DropdownMenuItem onClick={handleLogout}>
          Logout <LogOutIcon className="size-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}