"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  href: string;
  label: string;
  requiresAuth: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", requiresAuth: true },
  { href: "/verification", label: "Verifizierung", requiresAuth: true },
  { href: "/credentials", label: "Meine Credentials", requiresAuth: true },
  { href: "/settings", label: "Einstellungen", requiresAuth: true },
];

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

export function Navigation({ className = "", onItemClick }: NavigationProps) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const visibleItems = navItems.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <nav className={className}>
      <ul className="flex flex-col md:flex-row md:items-center md:gap-1">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onItemClick}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
