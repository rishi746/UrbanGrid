import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function DashboardCommand({ open, setOpen }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Command</h2>
          <button
            className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Esc
          </button>
        </div>
        <input
          autoFocus
          placeholder="Search everything..."
          className={cn(
            "mt-3 h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Try searching for teams, projects, or workflows.
        </p>
      </div>
    </div>
  );
}
