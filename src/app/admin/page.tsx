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
  Users,
  Settings,
  List,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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

  // Check if user is super admin
  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        const response = await fetch("/api/admin/users");
        setIsSuperAdmin(response.ok && response.status !== 403);
      } catch {
        setIsSuperAdmin(false);
      }
    };

    if (session) {
      checkSuperAdmin();
    }
  }, [session]);

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
      subcategories: [
        {
          name: "External Papers (Library)",
          manage: "/admin/publications/library",
          add: "/admin/publications/library/new",
        },
        {
          name: "Working Papers",
          manage: "/admin/publications/working",
          add: "/admin/publications/working/new",
        },
        {
          name: "Literature Reviews",
          manage: "/admin/publications/reviews",
          add: "/admin/publications/reviews/new",
        },
        {
          name: "Research Artifacts",
          manage: "/admin/publications/artifacts",
          add: "/admin/publications/artifacts/new",
        },
        {
          name: "Social Posts",
          manage: "/admin/publications/social",
          add: "/admin/publications/social/new",
        },
      ],
    },
    {
      title: "Datasets",
      icon: Database,
      count: stats.datasets,
      subcategories: [
        {
          name: "Datasets",
          manage: "/admin/datasets",
          add: "/admin/datasets/new",
        },
      ],
    },
    {
      title: "Prototypes",
      icon: Code,
      count: stats.prototypes,
      subcategories: [
        {
          name: "Prototypes",
          manage: "/admin/prototypes",
          add: "/admin/prototypes/new",
        },
      ],
    },
    {
      title: "Research Projects",
      icon: Lightbulb,
      count: stats.researchThemes,
      subcategories: [
        {
          name: "Research Projects",
          manage: "/admin/research-themes",
          add: "/admin/research-themes/new",
        },
      ],
    },
    {
      title: "Updates",
      icon: Newspaper,
      count: stats.updates,
      subcategories: [
        {
          name: "Updates & Field Notes",
          manage: "/admin/updates",
          add: "/admin/updates/new",
        },
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
                onClick={() => router.push("/admin/change-password")}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Change Password
              </Button>
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

        {/* Content Sections */}
        <Card className="p-6">
          <Accordion type="multiple" className="w-full" defaultValue={["publications", "research-projects"]}>
            {contentSections.map((section) => {
              const Icon = section.icon;
              return (
                <AccordionItem key={section.title} value={section.title.toLowerCase().replace(/\s+/g, '-')}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pl-14 pr-4 pt-2">
                      {section.subcategories.map((subcat) => (
                        <div key={subcat.name} className="flex items-center justify-between border-l-2 border-blue-200 pl-4 py-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {subcat.name}
                          </span>
                          <div className="flex gap-2">
                            {'manage' in subcat && subcat.manage && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={subcat.manage}>
                                  <List className="w-3 h-3 mr-1" />
                                  Manage
                                </Link>
                              </Button>
                            )}
                            {subcat.add && (
                              <Button size="sm" className="glossy-blue glossy-blue-hover" asChild>
                                <Link href={subcat.add}>
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add New
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Card>

        {/* Super Admin Section */}
        {isSuperAdmin && (
          <Card className="p-6 mt-8 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Super Admin Controls
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage users, roles, and permissions
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/admin/users")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button
                onClick={() => router.push("/admin/access-requests")}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                View Access Requests
              </Button>
            </div>
          </Card>
        )}

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
