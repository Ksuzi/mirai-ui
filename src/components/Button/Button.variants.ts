import { cva } from "class-variance-authority"

/**
 * Button base styles - common styles applied to all button variants
 */
const buttonBaseStyles = [
  "inline-flex",
  "items-center", 
  "justify-center",
  "gap-2",
  "whitespace-nowrap",
  "rounded-md",
  "text-sm",
  "font-medium",
  "transition-all",
  "duration-200",
  "ease-in-out",
  "disabled:pointer-events-none",
  "disabled:opacity-50",
  "outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
  "aria-invalid:ring-destructive/20",
  "dark:aria-invalid:ring-destructive/40",
  "aria-invalid:border-destructive",
  // Icon styles
  "[&_svg]:pointer-events-none",
  "[&_svg:not([class*='size-'])]:size-4",
  "[&_svg]:shrink-0",
  "shrink-0"
].join(" ")

/**
 * Button variant styles
 */
const buttonVariants = cva(buttonBaseStyles, {
  variants: {
    variant: {
      default: [
        "bg-primary",
        "text-primary-foreground",
        "hover:bg-primary/90",
        "active:bg-primary/95",
        "shadow-sm"
      ],
      destructive: [
        "bg-destructive",
        "text-destructive-foreground",
        "hover:bg-destructive/90",
        "active:bg-destructive/95",
        "focus-visible:ring-destructive/20",
        "dark:focus-visible:ring-destructive/40",
        "shadow-sm"
      ],
      outline: [
        "border",
        "border-input",
        "bg-background",
        "hover:bg-accent",
        "hover:text-accent-foreground",
        "active:bg-accent/80",
        "shadow-sm",
        "dark:bg-input/30",
        "dark:border-input",
        "dark:hover:bg-input/50"
      ],
      secondary: [
        "bg-secondary",
        "text-secondary-foreground",
        "hover:bg-secondary/80",
        "active:bg-secondary/70",
        "shadow-sm"
      ],
      ghost: [
        "hover:bg-accent",
        "hover:text-accent-foreground",
        "active:bg-accent/80",
        "dark:hover:bg-accent/50"
      ],
      link: [
        "text-primary",
        "underline-offset-4",
        "hover:underline",
        "active:text-primary/80"
      ]
    },
    size: {
      sm: [
        "h-8",
        "rounded-md",
        "gap-1.5",
        "px-3",
        "text-xs",
        "has-[>svg]:px-2.5"
      ],
      default: [
        "h-9",
        "px-4",
        "py-2",
        "has-[>svg]:px-3"
      ],
      lg: [
        "h-10",
        "rounded-md",
        "px-6",
        "text-base",
        "has-[>svg]:px-4"
      ],
      icon: [
        "size-9",
        "p-0"
      ]
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
})

export { buttonVariants }
export type { VariantProps } from "class-variance-authority"
