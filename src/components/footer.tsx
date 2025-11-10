import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    research: [
      { label: "Research Themes", href: "/research" },
      { label: "Publications", href: "/publications" },
      { label: "Datasets", href: "/datasets" },
      { label: "Prototypes", href: "/prototypes" },
    ],
    community: [
      { label: "Partners", href: "/partners" },
      { label: "Updates", href: "/updates" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "About", href: "/research" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-bold text-2xl text-primary mb-4 inline-block hover:scale-105 transition-transform">
              E.A Research
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm leading-relaxed">
              Building equitable digital systems for agricultural trade through voice-first technologies, blockchain infrastructure, and field research in Sub Saharan Africa.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:contact@earesearch.org"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/earesearch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/earesearch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/earesearch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Research Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Research</h3>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partnership Logos */}
        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Research Collaboration</p>
            <div className="flex items-center gap-6">
              <img 
                src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreidpgpj3zo4yq6hh3d2tf7eeak7l3ivizo3eijg2r77al5u3p7ixpm" 
                alt="E.A Research" 
                className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
              />
              <span className="text-muted-foreground/50">×</span>
              <img 
                src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4" 
                alt="Addis AI" 
                className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} E.A Research. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <a
                href="https://addisassistant.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                Visit Addis AI
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
