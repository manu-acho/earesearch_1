"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, FileText, Database, Code, Users, Bell, Shield, Handshake } from "lucide-react";
import { useSession } from "next-auth/react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navGroups = [
    {
      label: "Research",
      href: "/research",
      standalone: true,
    },
    {
      label: "Publications",
      href: "/publications",
      standalone: true,
    },
    {
      label: "Resources",
      items: [
        { href: "/datasets", label: "Datasets", icon: Database, description: "Open data & corpora" },
        { href: "/prototypes", label: "Prototypes", icon: Code, description: "Working systems" },
      ],
    },
    {
      label: "Community",
      items: [
        { href: "/partners", label: "Partners", icon: Users, description: "Collaborations" },
        { href: "/updates", label: "Updates", icon: Bell, description: "Latest news" },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      standalone: true,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled 
            ? "border-border/60 bg-background/98 backdrop-blur-md shadow-sm" 
            : "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Collaboration Badge */}
            <div className="flex items-center gap-2 md:gap-3 z-50">
              <Link 
                href="/"
                className="hover:scale-105 transition-transform duration-200"
              >
                <Image
                  src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafybeighh6omrl4r64z5wfjfbmcctfxglaty662zrxhpiaubdjnogkdjm4"
                  alt="E.A Research"
                  width={64}
                  height={64}
                  className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
                />
              </Link>
              <Handshake className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
              <a
                href="https://addisassistant.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <Image
                  src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4"
                  alt="Addis AI"
                  width={64}
                  height={64}
                  className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center mx-8">
              {navGroups.map((group) => {
                if (group.standalone) {
                  return (
                    <Link
                      key={group.href}
                      href={group.href!}
                      className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative group rounded-md ${
                        isActive(group.href!)
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {group.label}
                      {isActive(group.href!) && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      )}
                    </Link>
                  );
                }

                return (
                  <div
                    key={group.label}
                    className="relative group"
                  >
                    <button
                      className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md flex items-center gap-1 ${
                        group.items?.some(item => isActive(item.href))
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {group.label}
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* Invisible hover bridge */}
                    <div className="absolute top-full left-0 w-56 h-2 opacity-0 group-hover:opacity-0" />

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-background border border-border/60 rounded-lg shadow-lg overflow-hidden">
                        {group.items?.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-start gap-3 px-4 py-3 hover:bg-primary/5 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary hover:scale-110 transition-transform">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm mb-0.5">{item.label}</div>
                                <div className="text-xs text-muted-foreground">{item.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/admin">
                  <Shield className="w-4 h-4" />
                  {session ? "Admin" : "Login"}
                </Link>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="glossy-blue glossy-blue-hover shadow-md hover:shadow-lg transition-shadow"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border shadow-2xl z-40 lg:hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="overflow-y-auto h-full p-6 space-y-6">
          {navGroups.map((group) => {
            if (group.standalone) {
              return (
                <Link
                  key={group.href}
                  href={group.href!}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all ${
                    isActive(group.href!)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {group.label}
                </Link>
              );
            }

            return (
              <div key={group.label} className="space-y-2">
                <div className="px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </div>
                <div className="space-y-1">
                  {group.items?.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Mobile CTA */}
          <div className="space-y-3">
            <Button 
              variant="outline"
              className="w-full flex items-center justify-center gap-2" 
              size="lg"
              asChild
            >
              <Link href="/admin">
                <Shield className="w-4 h-4" />
                {session ? "Admin Dashboard" : "Admin Login"}
              </Link>
            </Button>
            <Button 
              className="w-full glossy-blue glossy-blue-hover shadow-lg" 
              size="lg"
              asChild
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
