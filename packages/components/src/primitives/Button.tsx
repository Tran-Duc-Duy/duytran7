/**
 * Button primitive — tương thích shadcn style, dùng cho CTA. asChild: render child (e.g. <a>) với style button.
 */

import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react"
import { cn } from "../utils/cn"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium shadow",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-medium",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
  ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
  link: "text-primary underline-offset-4 hover:underline",
}

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3 text-sm",
  lg: "h-11 rounded-md px-8 text-base",
}

const buttonClasses = (
  variant: NonNullable<ButtonProps["variant"]>,
  size: NonNullable<ButtonProps["size"]>,
  className?: string
) =>
  cn(
    "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  )

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<{ className?: string }>, {
        className: cn(
          buttonClasses(variant, size, className),
          (children as ReactElement<{ className?: string }>).props?.className
        ),
      })
    }
    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses(variant, size, className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
