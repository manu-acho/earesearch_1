import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResearchCard } from "@/components/research-card";
import { PublicationCard } from "@/components/publication-card";
import { PrototypeCard } from "@/components/prototype-card";
import { getAllThemes, getAllPublications, getAllPrototypes } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const themes = getAllThemes();
  const publications = getAllPublications().slice(0, 3);
  const prototypes = getAllPrototypes().slice(0, 2);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-blue-50/30">
        <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl animate-fade-in">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              Research • Innovation • Impact
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Building equitable digital systems for trust, transparency, and inclusion in agricultural trade
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
              We research, develop, and implement socio-technical systems that combine ASR (voice-first), tokenization, and zero-knowledge proofs with governance and field practice — so farmers become agents in digital markets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="glossy-blue glossy-blue-hover shadow-lg" asChild>
                <Link href="/research">
                  Explore Research
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5" asChild>
                <Link href="/prototypes">View Prototypes</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5" asChild>
                <Link href="/publications">Read Publications</Link>
              </Button>
            </div>
          </div>
        </div>
        
      </section>

      {/* Research Themes */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Research Themes
              </h2>
              <p className="text-lg text-muted-foreground">
                Our work spans four interconnected research programs addressing critical challenges in digital agriculture
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex group" asChild>
              <Link href="/research">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {themes.map((theme, index) => (
              <div key={theme.slug} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <ResearchCard theme={theme} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Publications */}
      <section className="py-20 md:py-32 bg-muted/20 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Latest Publications
              </h2>
              <p className="text-lg text-muted-foreground">
                Recent papers and research outputs advancing equitable digital systems
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex group" asChild>
              <Link href="/publications">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publications.map((publication, index) => (
              <div key={publication.slug} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <PublicationCard publication={publication} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prototypes */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Working Prototypes
              </h2>
              <p className="text-lg text-muted-foreground">
                Demos and pilot deployments bringing research into practice
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex group" asChild>
              <Link href="/prototypes">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {prototypes.map((prototype, index) => (
              <div key={prototype.slug} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <PrototypeCard prototype={prototype} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-blue-50/30 relative overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Us in Building Equitable Digital Systems
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We welcome collaboration on research, field deployments, and policy frameworks. Get in touch to explore partnership opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="glossy-blue glossy-blue-hover shadow-lg" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5" asChild>
                <Link href="/updates">Latest Updates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
