import { getAllThemes } from "@/lib/content";
import { ResearchCard } from "@/components/research-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Database, Lock, Scale, GitBranch, Users } from "lucide-react";

export default function ResearchPage() {
  const themes = getAllThemes();

  const researchAreas = [
    {
      icon: Mic,
      title: "Voice-First & ASR Systems",
      description: "Developing automatic speech recognition systems for low-resource African languages, with focus on agricultural contexts and low-literacy environments.",
      highlights: [
        "Multilingual ASR for Amharic, Afan Oromo, Kiswahili",
        "Edge deployment for offline functionality",
        "Cultural and dialectical adaptation",
        "Integration with agricultural advisory services"
      ],
      color: "text-blue-600"
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Privacy & Tokenization",
      description: "Building blockchain-based systems that enable transparency and traceability while protecting competitive business data through cryptographic proofs.",
      highlights: [
        "ZK-SNARKs for selective disclosure",
        "Tokenization of agricultural commodities",
        "Privacy-preserving compliance verification",
        "Smart contract frameworks for trade"
      ],
      color: "text-purple-600"
    },
    {
      icon: Scale,
      title: "Regulatory Compliance & Digital Product Passports",
      description: "Researching technical and policy frameworks for regulatory compliance in agricultural trade, including deforestation regulations and traceability requirements.",
      highlights: [
        "EUDR compliance automation",
        "Digital Product Passport implementations",
        "Blockchain-EPCIS integration patterns",
        "Cross-border trade facilitation"
      ],
      color: "text-green-600"
    },
    {
      icon: GitBranch,
      title: "Supply Chain Finance & Digital Infrastructure",
      description: "Exploring on-chain financial mechanisms that improve access to working capital for smallholder farmers and SMEs while managing risk.",
      highlights: [
        "Tokenized invoice financing",
        "Collateral management systems",
        "DeFi protocols for agricultural credit",
        "Risk mitigation through smart contracts"
      ],
      color: "text-orange-600"
    }
  ];

  const methodologies = [
    {
      title: "Technical Development",
      items: ["Model fine-tuning & quantization", "Smart contract architecture", "Zero-knowledge circuit design", "Edge deployment optimization"]
    },
    {
      title: "Field Research",
      items: ["Participatory design with farmers", "Usability testing in rural contexts", "Impact evaluation & measurement", "Community feedback integration"]
    },
    {
      title: "Policy Engagement",
      items: ["Regulatory framework analysis", "Multi-stakeholder dialogue", "Standards development", "Policy brief production"]
    }
  ];

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Research Themes
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Our research addresses critical challenges in digital agriculture through interconnected programs that combine technical innovation, socio-technical design, field practice, and governance frameworks. We work at the intersection of AI/voice technologies, blockchain systems, and agricultural development in East Africa.
          </p>
        </div>

        {/* Core Research Areas */}
        <section className="mb-20">
          <div className="mb-12 animate-slide-in-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Research Areas</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Our work spans four interconnected domains, each addressing specific technical and social challenges in bringing equitable digital systems to agricultural markets.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card 
                  key={area.title} 
                  className="p-8 hover:shadow-xl transition-all duration-300 border-2 animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center ${area.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="space-y-2">
                    {area.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Research Methodologies */}
        <section className="mb-20">
          <div className="mb-12 animate-slide-in-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Methodologies</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              We employ mixed-methods approaches that integrate technical development, participatory field research, and policy engagement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {methodologies.map((methodology, index) => (
              <Card 
                key={methodology.title} 
                className="p-6 border-2 animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-bold mb-4">{methodology.title}</h3>
                <ul className="space-y-2">
                  {methodology.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Focus Areas */}
        <section className="mb-20 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-8 md:p-12">
          <div className="mb-8 animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Focus Areas</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Our technical research emphasizes practical, production-ready systems designed for resource-constrained environments.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-white animate-fade-in">
              <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">Speech Technologies</Badge>
              <h4 className="font-bold mb-2">Low-Resource ASR</h4>
              <p className="text-sm text-muted-foreground">Fine-tuning and quantization of speech models for African languages with limited training data.</p>
            </Card>

            <Card className="p-6 bg-white animate-fade-in" style={{ animationDelay: "100ms" }}>
              <Badge className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-100">Cryptography</Badge>
              <h4 className="font-bold mb-2">Practical ZK Proofs</h4>
              <p className="text-sm text-muted-foreground">Implementing zero-knowledge circuits for supply chain privacy and regulatory compliance.</p>
            </Card>

            <Card className="p-6 bg-white animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Badge className="mb-3 bg-green-100 text-green-700 hover:bg-green-100">Blockchain</Badge>
              <h4 className="font-bold mb-2">Smart Contract Systems</h4>
              <p className="text-sm text-muted-foreground">Designing scalable, secure contracts for tokenization, compliance, and finance.</p>
            </Card>

            <Card className="p-6 bg-white animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">Edge Computing</Badge>
              <h4 className="font-bold mb-2">Offline-First Systems</h4>
              <p className="text-sm text-muted-foreground">Optimizing AI models for edge deployment without internet connectivity.</p>
            </Card>

            <Card className="p-6 bg-white animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Badge className="mb-3 bg-red-100 text-red-700 hover:bg-red-100">Data Standards</Badge>
              <h4 className="font-bold mb-2">EPCIS Integration</h4>
              <p className="text-sm text-muted-foreground">Blockchain-EPCIS patterns for verifiable supply chain traceability.</p>
            </Card>

            <Card className="p-6 bg-white animate-fade-in" style={{ animationDelay: "500ms" }}>
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">DeFi</Badge>
              <h4 className="font-bold mb-2">Agricultural Finance</h4>
              <p className="text-sm text-muted-foreground">On-chain mechanisms for working capital access and risk management.</p>
            </Card>
          </div>
        </section>

        {/* Research Themes from Content */}
        {themes.length > 0 && (
          <section className="mb-20">
            <div className="mb-12 animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Research Themes</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Explore our active research programs addressing specific challenges in voice technologies, digital infrastructure, and agricultural systems.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {themes.map((theme, index) => (
                <div key={theme.slug} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                  <ResearchCard theme={theme} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Open Science Commitment */}
        <section className="max-w-4xl animate-fade-in">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-white border-2">
            <Database className="w-12 h-12 text-primary mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Open Science & Digital Public Goods</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We are committed to open science principles. All language models, datasets, and tools developed through our research are released as digital public goods, enabling Ethiopian-led innovation and building sovereign AI capacity.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Open Source Models</Badge>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Public Datasets</Badge>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Reproducible Research</Badge>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Knowledge Transfer</Badge>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
