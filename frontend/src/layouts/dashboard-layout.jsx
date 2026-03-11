import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardNav } from "@/components/dashboard/dashboard-navbar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-muted">
        <DashboardSidebar />
        <main className="flex min-h-svh flex-1 flex-col">
          <DashboardNav />
          <div className="flex-1 px-6 py-8 md:px-10">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
