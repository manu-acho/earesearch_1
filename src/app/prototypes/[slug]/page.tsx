"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ExternalLink, Code, ArrowLeft, Layers, CheckCircle2, FileText } from "lucide-react";

interface Prototype {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string | null;
  status: string;
  demoUrl: string | null;
  repoUrl: string | null;
  externalUrl: string | null;
  stack: string[];
  useCases: string[];
  tags: string[];
  screenshots: string[];
  videoUrl: string | null;
  relatedPaper: number | null;
  relatedDataset: number | null;
  featured: boolean;
  createdAt: string;
  lastUpdated: string;
}

export default function PrototypePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [prototype, setPrototype] = useState<Prototype | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/prototypes`)
      .then((res) => res.json())
      .then((data) => {
        const prototypes = Array.isArray(data) ? data : [];
        const foundPrototype = prototypes.find((p: Prototype) => p.slug === slug);
        setPrototype(foundPrototype || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching prototype:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!prototype) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Prototype Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The prototype you're looking for doesn't exist.
            </p>
            <Link href="/prototypes">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Prototypes
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  const statusColors: Record<string, string> = {
    prototype: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    pilot: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    production: "bg-green-500/10 text-green-700 border-green-500/20",
    archived: "bg-gray-500/10 text-gray-700 border-gray-500/20",
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 -ml-4" asChild>
            <Link href="/prototypes">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Prototypes
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge className={statusColors[prototype.status] || statusColors.prototype}>
                {prototype.status.toUpperCase()}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {prototype.name}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {prototype.description}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 p-6 bg-muted/30 rounded-lg border mb-8">
              {prototype.demoUrl && (
                <Button variant="default" className="glossy-blue glossy-blue-hover" asChild>
                  <a href={prototype.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Demo
                  </a>
                </Button>
              )}
              {prototype.repoUrl && (
                <Button variant="outline" asChild>
                  <a href={prototype.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Code className="w-4 h-4 mr-2" />
                    View Repository
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Technology Stack */}
          {prototype.stack && prototype.stack.length > 0 && (
            <Card className="p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Technology Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {prototype.stack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Use Cases */}
          {prototype.useCases && prototype.useCases.length > 0 && (
            <Card className="p-6 mb-12 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Use Cases</h3>
              </div>
              <ul className="space-y-2">
                {prototype.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{useCase}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Full Description */}
          {prototype.fullDescription && (
            <article className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line">{prototype.fullDescription}</div>
            </article>
          )}
        </div>
      </div>
    </main>
  );
}
