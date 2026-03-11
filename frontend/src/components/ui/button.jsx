import { cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10",
};

function Slot({ children, className, ...props }) {
  if (!isValidElement(children)) return null;
  return cloneElement(children, {
    ...props,
    className: cn(children.props.className, className),
  });
}

export const Button = forwardRef(
  (
    { className, variant = "default", size = "default", asChild = false, ...props },
    ref
  ) => {
    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (asChild && props.children) {
      return <Slot className={classes} {...props} />;
    }

    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = "Button";
