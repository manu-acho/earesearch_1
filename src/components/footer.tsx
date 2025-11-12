import Link from "next/link";
import { Mail, Linkedin, Twitter, ExternalLink, Handshake } from "lucide-react";

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
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreiggwkjiwzuv5prwdunqrncdjbnwtykpcvftqzzdzh7kjmrhzlpl3i" 
                alt="E.A Research" 
                className="h-14 w-14 md:h-16 md:w-16"
              />
              <Handshake className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <a
                href="https://addisassistant.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <img 
                  src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4" 
                  alt="Addis AI" 
                  className="h-14 w-14 md:h-16 md:w-16"
                />
              </a>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm leading-relaxed">
              Building equitable digital systems for agricultural trade through voice-first technologies, blockchain infrastructure, and field research in Sub Saharan Africa.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:emmanuel@earesearch.net"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/manu-acho/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Manu_AchoRS"
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
