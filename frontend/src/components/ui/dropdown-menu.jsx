import { cloneElement, createContext, useContext, useMemo, useState, isValidElement } from "react";
import { cn } from "@/lib/utils";

const DropdownMenuContext = createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return (
    <DropdownMenuContext.Provider value={value}>
      <div className="relative inline-flex w-full">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ className, children, ...props }) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) return null;
  return (
    <button
      type="button"
      className={cn("w-full", className)}
      onClick={() => ctx.setOpen(!ctx.open)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className, align = "end", side = "bottom", children, ...props }) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx || !ctx.open) return null;

  const alignClass = align === "end" ? "right-0" : "left-0";
  const sideClass = side === "right" ? "left-full top-0 ml-2" : "top-full mt-2";

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-md",
        alignClass,
        sideClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Slot({ children, className, ...props }) {
  if (!isValidElement(children)) return null;
  return cloneElement(children, {
    ...props,
    className: cn(children.props.className, className),
  });
}

export function DropdownMenuItem({ className, children, onClick, asChild = false, ...props }) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) return null;

  const handleClick = (event) => {
    onClick?.(event);
    ctx.setOpen(false);
  };

  const classes = cn(
    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-left hover:bg-muted",
    className
  );

  if (asChild) {
    return (
      <Slot className={classes} onClick={handleClick} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
