import { cn } from "@/lib/utils";

export function FieldGroup({ className, ...props }) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
}

export function Field({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function FieldLabel({ className, ...props }) {
  return (
    <label
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}

export function FieldSeparator({ className, ...props }) {
  return (
    <div className={cn("flex items-center gap-3 text-xs text-muted-foreground", className)}>
      <span className="h-px flex-1 bg-border" />
      <span {...props} />
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
