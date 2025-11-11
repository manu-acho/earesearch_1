"use client";

import { AdminGuard } from "@/components/admin-guard";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't protect the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  
  return <AdminGuard>{children}</AdminGuard>;
}
