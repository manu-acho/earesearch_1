import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, Database, Code, BookOpen, Users, Globe, Sparkles } from "lucide-react";

export default function Home() {
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
      description: "Partnering with researchers, farmers, and organizations to advance digital agriculture in East Africa.",
      link: "/partners"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Enhanced with animation */}
      <section className="relative overflow-hidden border-b">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-primary shadow-sm">
              <Sparkles className="w-4 h-4" />
              Research • Innovation • Impact
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
              Building equitable digital systems for agricultural trade
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed animate-fade-in" style={{ animationDelay: "100ms" }}>
              We research, develop, and implement socio-technical systems that combine voice-first interfaces, data governance, and field practice — empowering farmers as agents in digital markets.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
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
          </div>
        </div>
      </section>

      {/* Research Areas Grid - Modern card layout */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Our Research Focus
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We work across four interconnected areas to advance equitable digital agriculture in East Africa
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {researchAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <Card 
                    key={area.title} 
                    className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 group"
                    style={{ animationDelay: `${index * 100}ms` }}
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

            <div className="mt-12 text-center">
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What We Do
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our approach combines rigorous research, practical prototyping, and community collaboration
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary" asChild>
                    <Link href={feature.link}>
                      Learn more
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </Card>
              ))}
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
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 group bg-gradient-to-br from-blue-50/50 to-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Publications</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Explore our research papers, literature reviews, and social media content advancing equitable digital systems.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full" asChild>
                  <Link href="/publications">
                    Browse Publications
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>

              {/* Datasets */}
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 group bg-gradient-to-br from-green-50/50 to-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Datasets</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Access open datasets and corpora supporting African language technologies and agricultural research.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full" asChild>
                  <Link href="/datasets">
                    Explore Datasets
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>

              {/* Prototypes */}
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 group bg-gradient-to-br from-purple-50/50 to-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Prototypes</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  View working prototypes and pilot deployments bringing research into practice with real communities.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full" asChild>
                  <Link href="/prototypes">
                    View Prototypes
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>

              {/* Partners */}
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 group bg-gradient-to-br from-orange-50/50 to-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Partners</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Learn about our collaborations with organizations advancing AI and digital agriculture in Africa.
                </p>
                <Button className="glossy-blue glossy-blue-hover w-full" asChild>
                  <Link href="/partners">
                    Meet Our Partners
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            </div>
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
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10" asChild>
                <Link href="/updates">Latest Updates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
