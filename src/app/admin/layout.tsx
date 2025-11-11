"use client";

import { AdminGuard } from "@/components/admin-guard";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't protect public admin pages
  const publicPages = ["/admin/login", "/admin/request-access"];
  if (publicPages.includes(pathname)) {
    return <>{children}</>;
  }
  
  return <AdminGuard>{children}</AdminGuard>;
}
