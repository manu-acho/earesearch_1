"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Database, 
  Code, 
  Lightbulb, 
  Newspaper,
  LogOut,
  User,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    publications: 0,
    datasets: 0,
    prototypes: 0,
    researchThemes: 0,
    updates: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const contentSections = [
    {
      title: "Publications",
      icon: FileText,
      count: stats.publications,
      links: [
        { label: "External Papers (Library)", href: "/admin/publications/library/new" },
        { label: "Working Papers", href: "/admin/publications/working/new" },
        { label: "Literature Reviews", href: "/admin/publications/reviews/new" },
        { label: "Research Artifacts", href: "/admin/publications/artifacts/new" },
        { label: "Social Posts", href: "/admin/publications/social/new" },
      ],
    },
    {
      title: "Datasets",
      icon: Database,
      count: stats.datasets,
      links: [
        { label: "Add New Dataset", href: "/admin/datasets/new" },
      ],
    },
    {
      title: "Prototypes",
      icon: Code,
      count: stats.prototypes,
      links: [
        { label: "Add New Prototype", href: "/admin/prototypes/new" },
      ],
    },
    {
      title: "Research Themes",
      icon: Lightbulb,
      count: stats.researchThemes,
      links: [
        { label: "Add New Theme", href: "/admin/research-themes/new" },
      ],
    },
    {
      title: "Updates",
      icon: Newspaper,
      count: stats.updates,
      links: [
        { label: "Add New Update", href: "/admin/updates/new" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                E.A Research ◇ Addis AI Content Management
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span>{session.user?.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {session.user?.name}!
          </h2>
          <p className="text-blue-100">
            Manage your research content, publications, datasets, and prototypes from here.
          </p>
        </Card>

        {/* Content Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    {/* <p className="text-sm text-gray-500">{section.count} items</p> */}
                  </div>
                </div>
                <div className="space-y-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => router.push("/")}
            >
              View Public Site
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => router.push("/admin/publications/library/new")}
            >
              Add External Paper
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => router.push("/admin/datasets/new")}
            >
              Add Dataset
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
