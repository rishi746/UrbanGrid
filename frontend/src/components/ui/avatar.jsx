import { createContext, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const AvatarContext = createContext(null);

export function Avatar({ className, children, ...props }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <AvatarContext.Provider value={{ hasImage, setHasImage }}>
      <div
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

export function AvatarImage({ className, ...props }) {
  const ctx = useContext(AvatarContext);
  return (
    <img
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      onError={() => ctx?.setHasImage(false)}
      onLoad={() => ctx?.setHasImage(true)}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }) {
  const ctx = useContext(AvatarContext);
  const fallback = useMemo(() => children, [children]);
  return (
    <div
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground",
        ctx?.hasImage === false ? "" : "hidden",
        className
      )}
      {...props}
    >
      {fallback}
    </div>
  );
}
