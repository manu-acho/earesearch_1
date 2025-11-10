import Link from "next/link";
import { Button } from "./ui/button";

export function Navigation() {
  const links = [
    { href: "/research", label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/datasets", label: "Datasets" },
    { href: "/prototypes", label: "Prototypes" },
    { href: "/partners", label: "Partners" },
    { href: "/updates", label: "Updates" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-primary">
            E.A Research
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className="hidden md:flex glossy-blue glossy-blue-hover"
            asChild
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
