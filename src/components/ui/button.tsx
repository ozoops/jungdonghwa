import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-colors select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-navy text-on-dark hover:bg-navy-soft",
        accent: "bg-accent text-on-accent hover:brightness-95",
        outlineLight: "border-2 border-white bg-transparent text-on-dark hover:bg-white/10",
        outline: "border-2 border-navy bg-surface text-navy hover:bg-tint",
        ghost: "bg-transparent text-navy hover:bg-tint",
      },
      size: {
        lg: "min-h-14 px-5 text-[17px]",
        md: "min-h-12 px-4 text-base",
        sm: "min-h-11 px-3 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
