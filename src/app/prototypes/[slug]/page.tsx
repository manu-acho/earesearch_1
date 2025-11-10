import { notFound } from "next/navigation";
import { getAllPrototypes, getPrototypeBySlug } from "@/lib/content";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ExternalLink, Code, ArrowLeft, Layers, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const prototypes = getAllPrototypes();
  return prototypes.map((prototype) => ({
    slug: prototype.slug,
  }));
}

export default async function PrototypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prototype = getPrototypeBySlug(slug);

  if (!prototype) {
    notFound();
  }

  const MDXContent = getMDXComponent(prototype.body.code);

  const statusColors = {
    prototype: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    pilot: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    production: "bg-green-500/10 text-green-700 border-green-500/20",
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
              <Badge className={statusColors[prototype.status]}>
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

          {/* Full Content */}
          <article className="prose prose-lg max-w-none">
            <MDXContent components={mdxComponents} />
          </article>
        </div>
      </div>
    </main>
  );
}
