'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, Database, Code, BookOpen, Users, Globe, Sparkles, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-card-index') || '0');
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const cards = document.querySelectorAll('[data-card-index]');
    cards.forEach((card) => observerRef.current?.observe(card));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const researchAreas = [
    {
      icon: Lightbulb,
      title: "Voice-First Interfaces",
      description: "ASR and voice technologies for low-literacy contexts, focusing on African languages and agricultural markets.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Database,
      title: "Agricultural Data",
      description: "Building open datasets and corpora to support research in African language technologies and agriculture.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Code,
      title: "Digital Systems",
      description: "Prototyping socio-technical systems that combine tokenization, zero-knowledge proofs, and voice interfaces.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Users,
      title: "Field Practice",
      description: "Working directly with smallholder farmers to understand needs and co-design equitable digital solutions.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const features = [
    {
      title: "Open Research",
      description: "All our publications, datasets, and code are freely available to support the research community.",
      link: "/publications"
    },
    {
      title: "Working Prototypes",
      description: "We build and deploy real systems, testing ideas in the field with actual users and communities.",
      link: "/prototypes"
    },
    {
      title: "Collaborative Approach",
      description: "Partnering with researchers, farmers, and organizations to advance digital agriculture in Sub Saharan Africa.",
      link: "/partners"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Enhanced with animation */}
      <section className="relative overflow-hidden border-b">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Partnership Text Above Card */}
            <div className="mb-3 animate-fade-in">
              <p className="text-base md:text-lg font-medium text-muted-foreground">
                E.A Research <span className="text-primary">◇</span> Addis AI
              </p>
            </div>
            
            {/* Horizontal Timeline Card */}
            <div className="inline-block mb-5 animate-slide-in-down">
              <div className="bg-white/60 backdrop-blur-lg border-2 border-blue-400/40 rounded-2xl shadow-xl shadow-blue-500/10 px-8 py-4 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div className="relative flex items-center justify-center gap-8">
                  {/* Timeline Line */}
                  <div className="absolute top-[13px] left-[60px] right-[60px] h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"></div>
                  
                  {/* Timeline Items */}
                  <div className="flex items-center gap-8">
                    {/* Research */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ring-4 ring-white shadow-md">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-foreground whitespace-nowrap">Research</h3>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">Evidence-based</p>
                      </div>
                    </div>
                    
                    {/* Innovate */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center ring-4 ring-white shadow-md">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-foreground whitespace-nowrap">Innovate</h3>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">Practical solutions</p>
                      </div>
                    </div>
                    
                    {/* Impact */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center ring-4 ring-white shadow-md">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-foreground whitespace-nowrap">Impact</h3>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">Real-world change</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 animate-slide-in-left animation-delay-200">
              Building Underserved Agency in Digital Markets
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-7 max-w-3xl mx-auto leading-relaxed animate-slide-in-left" style={{ animationDelay: "200ms" }}>
              We research, develop, and implement socio-technical systems that combine voice-first interfaces, data governance, and field practice, empowering farmers as agents in digital markets.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-in-up" style={{ animationDelay: "400ms" }}>
              <Button size="lg" className="glossy-blue glossy-blue-hover shadow-lg" asChild>
                <Link href="/research">
                  Explore Research
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5 bg-white/80 backdrop-blur-sm" asChild>
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>

            {/* Partnership Badge - Bottom */}
            <div className="mt-10 pt-6 border-t border-muted/30 animate-fade-in" style={{ animationDelay: "600ms" }}>
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <img 
                  src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafybeighh6omrl4r64z5wfjfbmcctfxglaty662zrxhpiaubdjnogkdjm4" 
                  alt="E.A Research" 
                  className="h-24 w-24 md:h-32 md:w-32 opacity-80 hover:opacity-100 transition-opacity hover:scale-105 duration-200"
                />
                <Minus className="w-7 h-7 md:w-8 md:h-8 text-primary opacity-70" />
                <a
                  href="https://platform.addisassistant.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img 
                    src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4" 
                    alt="Addis AI" 
                    className="h-20 w-20 md:h-28 md:w-28 opacity-80 hover:opacity-100 transition-opacity hover:scale-105 duration-200"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Grid - Modern card layout */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-scale-in">
                Our Research Focus
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
                We work across four interconnected areas to advance equitable digital agriculture.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {researchAreas.map((area, index) => {
                const Icon = area.icon;
                const cardIndex = index;
                const isVisible = visibleCards.has(cardIndex);
                return (
                  <Card 
                    key={area.title}
                    data-card-index={cardIndex}
                    className={`p-6 bg-white/60 backdrop-blur-lg border-2 border-blue-400/40 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-lg ${area.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "600ms" }}>
              <Button variant="outline" size="lg" asChild>
                <Link href="/research">
                  View Detailed Research Themes
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Feature Cards */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50/50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-scale-in">
                What We Do
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
                Our approach combines rigorous research, practical prototyping, and community collaboration
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => {
                const cardIndex = 4 + index; // Offset by research areas cards
                const isVisible = visibleCards.has(cardIndex);
                return (
                  <Card 
                    key={feature.title}
                    data-card-index={cardIndex}
                    className={`p-6 text-center bg-white/60 backdrop-blur-lg border-2 border-blue-400/40 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary hover:bg-primary/5" asChild>
                      <Link href={feature.link} className="no-underline">
                        Learn more
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections - Link to actual pages */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Publications */}
              <Card 
                data-card-index={7}
                className={`p-8 bg-white/60 backdrop-blur-lg border-2 border-blue-400/40 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 group ${
                  visibleCards.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Publications</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Explore our research papers, literature reviews, and social media content advancing equitable digital systems.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full text-white" asChild>
                  <Link href="/publications" className="text-white">
                    Browse Publications
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>

              {/* Datasets */}
              <Card 
                data-card-index={8}
                className={`p-8 bg-white/60 backdrop-blur-lg border-2 border-blue-400/40 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 group ${
                  visibleCards.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Datasets</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Access open datasets and corpora supporting African language technologies and agricultural research.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full text-white" asChild>
                  <Link href="/datasets" className="text-white">
                    Explore Datasets
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>

              {/* Prototypes */}
              <Card 
                data-card-index={9}
                className={`p-8 bg-white/60 backdrop-blur-lg border-2 border-blue-400/40 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 group ${
                  visibleCards.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Prototypes</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  View working prototypes and pilot deployments bringing research into practice with real communities.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full text-white" asChild>
                  <Link href="/prototypes" className="text-white">
                    View Prototypes
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>

              {/* Partners */}
              <Card 
                data-card-index={10}
                className={`p-8 bg-white/60 backdrop-blur-lg border-2 border-blue-400/40 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500 group ${
                  visibleCards.has(10) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Partners</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Learn about our collaborations with organizations advancing AI and digital agriculture in Africa.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full text-white" asChild>
                  <Link href="/partners" className="text-white">
                    Meet Our Partners
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Research Collaboration</h2>
            <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16 mb-8">
              <div className="text-center">
                <img 
                  src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafybeighh6omrl4r64z5wfjfbmcctfxglaty662zrxhpiaubdjnogkdjm4" 
                  alt="E.A Research" 
                  className="h-20 w-20 mx-auto mb-3 opacity-90 hover:opacity-100 transition-opacity"
                />
                <p className="text-sm font-medium text-muted-foreground">E.A Research</p>
              </div>
              <div className="text-4xl text-muted-foreground mb-5">—</div>
              <div className="text-center">
                <a
                  href="https://platform.addisassistant.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img 
                    src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4" 
                    alt="Addis AI" 
                    className="h-20 w-20 mx-auto mb-3 opacity-90 hover:opacity-100 transition-opacity"
                  />
                </a>
                <p className="text-sm font-medium text-muted-foreground">Addis AI</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Joint research initiative advancing voice-first AI, low-resource language technologies, and digital agricultural systems for Sub-Saharan Africa
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Us in Building Equitable Digital Systems
            </h2>
            <p className="text-lg mb-8 opacity-90 leading-relaxed">
              We welcome collaboration on research, field deployments, and policy frameworks. 
              Whether you're a researcher, farmer organization, or technology partner — let's explore opportunities together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white/20 hover:text-white" asChild>
                <Link href="/updates">Latest Updates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
