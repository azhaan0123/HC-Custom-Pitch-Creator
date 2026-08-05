import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-[#DFE1E6] bg-[#FAFBFC] px-3 py-1.5 text-xs text-[#172B4D] shadow-2xs transition-all duration-150 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-[#6B778C] hover:bg-white hover:border-[#C1C7D0] focus-visible:outline-none focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F4F5F7]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
