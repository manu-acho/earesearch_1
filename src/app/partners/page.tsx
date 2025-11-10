import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Brain, Mic, Globe, Target, Zap, Shield } from "lucide-react";
import Image from "next/image";

export default function PartnersPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our Partners
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Collaborating with innovative organizations to bridge Africa's digital divide through culture-aware AI
          </p>
          <p className="text-lg text-muted-foreground">
            Featuring our strategic technology partner: <span className="font-semibold text-primary">Addis AI</span>
          </p>
        </div>

        {/* Featured Partner - Addis AI */}
        <div className="max-w-6xl mx-auto mb-20">
          <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Column - Company Info */}
              <div>
                <div className="mb-6">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                    Strategic Partner
                  </Badge>
                  <h2 className="text-4xl font-bold mb-4 text-primary">
                    Addis AI
                  </h2>
                  <p className="text-xl text-muted-foreground mb-6">
                    Bridging Africa's Digital Divide Through Culture-Aware Language AI
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Vision
                    </h3>
                    <p className="text-muted-foreground">
                      Building Africa's first comprehensive culture-aware language AI platform that serves 2,000+ languages and 1.5B people across the continent.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Mission
                    </h3>
                    <p className="text-muted-foreground">
                      Making AI accessible, affordable, and culturally relevant for African businesses through multi-modal language technology for voice, text, and translation.
                    </p>
                  </div>

                  <div>
                    <Button variant="default" className="glossy-blue glossy-blue-hover" asChild>
                      <a href="https://addisassistant.com/en/" target="_blank" rel="noopener noreferrer">
                        Visit Addis AI
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Key Capabilities */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Core Platform Capabilities</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mic className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Speech Technology</h4>
                      <p className="text-sm text-muted-foreground">
                        Voice-to-text and text-to-speech for 30+ African languages with cultural context awareness
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Translation Services</h4>
                      <p className="text-sm text-muted-foreground">
                        Seamless translation between African languages and global languages, preserving cultural nuances
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">AI Assistant Platform</h4>
                      <p className="text-sm text-muted-foreground">
                        Customizable AI assistants for customer service, education, and business operations
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Enterprise Solutions</h4>
                      <p className="text-sm text-muted-foreground">
                        Scalable API infrastructure with privacy-first design and on-premise deployment options
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Market Opportunity Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Market Opportunity</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">$28B+</div>
              <div className="text-muted-foreground">
                African AI market projected by 2030
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">1.5B</div>
              <div className="text-muted-foreground">
                People speaking 2,000+ African languages
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">70%</div>
              <div className="text-muted-foreground">
                Growth in mobile connectivity across Africa
              </div>
            </Card>
          </div>
        </div>

        {/* Product Modules Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Product Modules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Voice AI Suite</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Real-time speech-to-text transcription</li>
                <li>• Natural-sounding text-to-speech synthesis</li>
                <li>• Voice biometric authentication</li>
                <li>• Call center automation</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Translation Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Document translation with context preservation</li>
                <li>• Real-time conversation translation</li>
                <li>• Localization for apps and websites</li>
                <li>• Cultural adaptation services</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Business Intelligence</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Sentiment analysis for African markets</li>
                <li>• Customer feedback processing</li>
                <li>• Multi-lingual data analytics</li>
                <li>• Market trend identification</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Developer Tools</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• RESTful API with comprehensive documentation</li>
                <li>• SDKs for popular programming languages</li>
                <li>• Pre-built integrations (WhatsApp, Telegram, etc.)</li>
                <li>• Custom model fine-tuning capabilities</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Competitive Advantage Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Addis AI Stands Out</h2>
          <Card className="p-8 bg-blue-50/50 border-primary/20">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Culture-First Approach</h4>
                  <p className="text-muted-foreground">
                    Unlike generic AI models, Addis AI is built from the ground up with African languages, dialects, and cultural contexts at its core
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Comprehensive Language Coverage</h4>
                  <p className="text-muted-foreground">
                    Support for 30+ African languages with plans to expand to 100+, covering major languages and underserved dialects
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Local Data & Privacy</h4>
                  <p className="text-muted-foreground">
                    African data stays in Africa with on-premise deployment options and compliance with local regulations
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Affordable & Accessible</h4>
                  <p className="text-muted-foreground">
                    Pricing models designed for African businesses with flexible plans and pay-as-you-grow options
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Collaboration Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-blue-50/30 border-primary/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Collaboration with E.A Research</h2>
              <p className="text-lg text-muted-foreground mb-8">
                E.A Research and Addis AI are working together to advance equitable digital agriculture through voice-first technologies, 
                combining cutting-edge research with practical AI solutions to empower smallholder farmers across East Africa.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge variant="outline" className="text-base py-2 px-4">
                  Voice-First ASR Systems
                </Badge>
                <Badge variant="outline" className="text-base py-2 px-4">
                  Agricultural Knowledge Graphs
                </Badge>
                <Badge variant="outline" className="text-base py-2 px-4">
                  Cultural Context Preservation
                </Badge>
                <Badge variant="outline" className="text-base py-2 px-4">
                  Low-Resource Language Models
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Future Partners Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center p-12 border-2 border-dashed border-muted-foreground/20 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Interested in Partnering?</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for innovative organizations to collaborate with on equitable digital agriculture research.
            </p>
            <Button variant="outline" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
