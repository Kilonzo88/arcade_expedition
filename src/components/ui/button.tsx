"use client";

import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "lg" | "sm";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
    
    const variants = {
      default: "bg-white text-black hover:bg-white/90",
      outline: "border border-luxury-gold text-luxury-cream bg-transparent hover:bg-luxury-gold hover:text-luxury-charcoal",
    };

    const sizes = {
      default: "px-4 py-2 text-sm rounded-sm",
      sm: "px-3 py-1 text-xs rounded-sm",
      lg: "px-9 py-6 text-base rounded-sm",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
