import { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

// Map verification status to badge variant
export const statusVariantMap: Record<string, BadgeVariant> = {
  UNVERIFIED: "default",
  PENDING: "warning",
  VERIFIED: "success",
  REJECTED: "error",
  VC_ISSUED: "info",
};

function Badge({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

// Convenience component for verification status
interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "children"> {
  status: string;
}

function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const variant = statusVariantMap[status] || "default";
  const displayText = status.replace(/_/g, " ");

  return (
    <Badge variant={variant} {...props}>
      {displayText}
    </Badge>
  );
}

export { Badge, StatusBadge };
export type { BadgeProps, StatusBadgeProps };
