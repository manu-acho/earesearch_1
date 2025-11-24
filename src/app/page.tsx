'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Database, Code, Users, Globe, Sparkles, TrendingUp, Zap, Shield } from 'lucide-react';
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
      description: "ASR and voice technologies for low-literacy contexts, focusing on African languages.",
      stat: "40+ Languages"
    },
    {
      icon: Database,
      title: "Agricultural Data",
      description: "Building open datasets and corpora supporting African language research.",
      stat: "500K+ Records"
    },
    {
      icon: Code,
      title: "Digital Systems",
      description: "Prototyping socio-technical systems combining AI and practical solutions.",
      stat: "12+ Deployments"
    },
    {
      icon: Users,
      title: "Field Practice",
      description: "Co-designing equitable solutions directly with smallholder farming communities.",
      stat: "2,500+ Farmers"
    }
  ];

  const features = [
    {
      number: "01",
      title: "Open Research",
      description: "All publications, datasets, and code freely available to support the global research community.",
      link: "/publications",
      bg: "bg-white dark:bg-slate-700"
    },
    {
      number: "02",
      title: "Working Prototypes",
      description: "Real systems deployed in the field, tested with actual users and communities.",
      link: "/prototypes",
      bg: "bg-slate-700 dark:bg-slate-600"
    },
    {
      number: "03",
      title: "Collaborative Approach",
      description: "Partnering with researchers, farmers, and organizations to advance digital agriculture.",
      link: "/partners",
      bg: "bg-black dark:bg-slate-900"
    },
    {
      number: "04",
      title: "AI for Agriculture",
      description: "Leveraging cutting-edge AI to empower farmers and transform agricultural systems.",
      link: "/ai",
      bg: "bg-blue-600 dark:bg-blue-700"
    }
  ];

  const resources = [
    {
      icon: Lightbulb,
      title: "Publications",
      description: "Research papers, literature reviews, and insights advancing equitable digital systems.",
      link: "/publications",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Database,
      title: "Datasets",
      description: "Open datasets and corpora supporting African language technologies research.",
      link: "/datasets",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Code,
      title: "Prototypes",
      description: "Working implementations bringing cutting-edge research into real-world practice.",
      link: "/prototypes",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Partners",
      description: "Meet the organizations collaborating on AI and digital agriculture in Africa.",
      link: "/partners",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-40 md:pb-48 lg:pt-48 lg:pb-56 bg-[#1447e6] dark:from-blue-800 dark:via-blue-900 dark:to-indigo-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 1200">
            <defs>
              <pattern id="wave1" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M0,60 Q30,30 60,60 T120,60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect width="1200" height="1200" fill="url(#wave1)"/>
            <path d="M0,300 Q300,200 600,300 T1200,300" fill="rgba(255,255,255,0.05)"/>
            <path d="M0,600 Q300,500 600,600 T1200,600" fill="rgba(255,255,255,0.03)"/>
          </svg>
          <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-indigo-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-white mb-12 md:mb-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-6 animate-slide-in-left text-balance">
                Building <span className="text-blue-200">Underserved Agency</span> in Digital Markets
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 mb-10 leading-relaxed max-w-2xl font-light" style={{ animationDelay: "100ms" }}>
                Research, development, and deployment of socio-technical systems that empower smallholder farmers as agents in digital markets across Africa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up flex-wrap" style={{ animationDelay: "200ms" }}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-2xl transition-all duration-300 text-base sm:text-lg px-8 py-6 h-auto rounded-2xl hover:scale-105 flex items-center gap-2" asChild>
                  <Link href="/research">
                    Explore Research
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold transition-all duration-300 text-base sm:text-lg px-8 py-6 h-auto rounded-2xl hover:scale-105" asChild>
                  <Link href="/contact">Get Involved</Link>
                </Button>
              </div>
            </div>

            <div className="pt-12 border-t border-white/20 animate-fade-in flex flex-col items-center justify-center " style={{ animationDelay: "300ms" }}>
              <p className="text-sm text-blue-100/70 mb-6 font-medium">Collaborative Partners</p>
              <div className="flex flex-col sm:flex-row items-center justify-start gap-8">
                <img 
                  src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafybeighh6omrl4r64z5wfjfbmcctfxglaty662zrxhpiaubdjnogkdjm4" 
                  alt="E.A Research" 
                  className="h-16 w-16 sm:h-20 sm:w-20 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110 filter drop-shadow-lg bg-card/50 rounded-md"
                />
                <div className="text-2xl text-white/30">—</div>
                <a
                  href="https://platform.addisassistant.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4" 
                    alt="Addis AI" 
                    className="h-16 w-16 sm:h-20 sm:w-20 opacity-80 hover:opacity-100 transition-all duration-300 filter drop-shadow-lg bg-card/50 rounded-md"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black dark:bg-slate-950 border-y border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="p-6 md:p-8 text-center rounded-2xl bg-slate-900/50 dark:bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">40+</div>
              <p className="text-sm md:text-base text-slate-400">Languages Supported</p>
            </div>
            <div className="p-6 md:p-8 text-center rounded-2xl bg-slate-900/50 dark:bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">2,500+</div>
              <p className="text-sm md:text-base text-slate-400">Farmers Reached</p>
            </div>
            <div className="p-6 md:p-8 text-center rounded-2xl bg-slate-900/50 dark:bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">12+</div>
              <p className="text-sm md:text-base text-slate-400">Active Deployments</p>
            </div>
            <div className="p-6 md:p-8 text-center rounded-2xl bg-slate-900/50 dark:bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">100%</div>
              <p className="text-sm md:text-base text-slate-400">Open Source</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-black dark:text-white animate-scale-in text-balance">
                Real-World <span className="text-blue-600 dark:text-blue-400">Applications</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                See how organizations across Africa are using our platforms to transform services and solve language challenges
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const isVisible = visibleCards.has(index);
                const cardHeight = index === 3 ? 'lg:row-span-2' : '';
                return (
                  <div
                    key={feature.title}
                    data-card-index={index}
                    className={`group relative overflow-hidden rounded-3xl transition-all duration-500 transform hover:-translate-y-2 ${cardHeight} ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    } ${index === 3 ? 'md:col-span-2 lg:col-span-1' : 'min-h-80'} flex flex-col ${feature.bg} hover:shadow-2xl hover:shadow-blue-500/30`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${index === 0 || index === 3 ? 'bg-gradient-to-br from-blue-100/20 to-transparent dark:from-blue-900/40' : 'bg-slate-700/20 dark:bg-slate-600/40'}`}></div>
                    
                    <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                      <div>
                        <div className={`text-6xl md:text-7xl font-black mb-6 ${index === 0 ? 'text-blue-600 dark:text-blue-500' : index === 3 ? 'text-white' : index === 2 ? 'text-slate-300' : 'text-slate-400'}`}>
                          {feature.number}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-black mb-4 ${index === 0 ? 'text-slate-900 dark:text-white' : index === 3 ? 'text-white' : 'text-white'}`}>
                          {feature.title}
                        </h3>
                        <p className={`leading-relaxed text-base ${index === 0 ? 'text-slate-700 dark:text-slate-300' : index === 3 ? 'text-blue-50' : 'text-slate-300'}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 ">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-balance">
                Research Focus Areas
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Four interconnected research domains driving innovation in equitable digital agriculture
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {researchAreas.map((area, index) => {
                const Icon = area.icon;
                const isVisible = visibleCards.has(7 + index);
                return (
                  <Card 
                    key={area.title}
                    data-card-index={7 + index}
                    className={`group relative p-8 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-border/50 backdrop-blur-sm bg-card/50 animate-slide-in-right group hover:border-primary/50 overflow-hidden ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 dark:from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-700/50 dark:to-blue-600/30 text-blue-600 dark:text-blue-300 flex items-center justify-center group-hover:scale-110 group-hover:from-blue-300 dark:group-hover:from-blue-600 transition-all duration-300 shadow-md">
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-300">{area.stat}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {area.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-balance">
                Explore Our Work
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Access publications, datasets, prototypes, and partnership information
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                const isVisible = visibleCards.has(7 + index);
                return (
                  <div
                    key={resource.title}
                    data-card-index={7 + index}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 cursor-pointer h-full transform hover:-translate-y-3 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-95 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-500"></div>
                    
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-sm text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/35 transition-all duration-300 shadow-lg">
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-sm">
                          {resource.description}
                        </p>
                      </div>
                      
                      <Link href={resource.link} className="inline-flex items-center gap-2 mt-6 font-semibold group-hover:gap-3 transition-all duration-300 hover:underline">
                        Explore <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-900/60 dark:via-indigo-900/60 dark:to-purple-900/60 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight text-balance">
              Join Us in Building Equitable Digital Systems
            </h2>
            <p className="text-lg sm:text-xl mb-12 opacity-95 leading-relaxed max-w-2xl mx-auto">
              We welcome collaboration on research initiatives, field deployments, policy frameworks, and capacity building programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-2xl text-base sm:text-lg px-8 py-6 h-auto rounded-xl hover:scale-105 transition-all" asChild>
                <Link href="/contact" className="gap-2">
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" className="border-2 border-white bg-transparent/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold text-base sm:text-lg px-8 py-6 h-auto rounded-xl hover:scale-105 transition-all" asChild>
                <Link href="/updates">Latest Updates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
