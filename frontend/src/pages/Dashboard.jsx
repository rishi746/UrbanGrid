import DashboardLayout from "@/layouts/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            UrbanGrid
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Dashboard Overview</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Monitor city-wide workflows, citizen requests, and contractor performance from one place.
          </p>
        </div>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {["Requests", "Projects", "Approvals"].map((title) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Recent updates and actionable insights for {title.toLowerCase()}.
              </p>
              <div className="mt-6 h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-1/2 rounded-full bg-emerald-400/70" />
              </div>
            </div>
          ))}
        </section>
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Teams</h2>
            <span className="text-xs text-muted-foreground">Updated 5 min ago</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              "Public Works",
              "Transportation",
              "Utilities",
              "Sanitation",
            ].map((team) => (
              <div key={team} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-semibold">{team}</p>
                <p className="mt-1 text-xs text-muted-foreground">2 new tasks awaiting review</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
