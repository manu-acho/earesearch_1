import { notFound } from "next/navigation";
import { getAllDatasets, getDatasetBySlug } from "@/lib/content";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Download, FileText, Code, ArrowLeft, Database, Users, Calendar } from "lucide-react";

export async function generateStaticParams() {
  const datasets = getAllDatasets();
  return datasets.map((dataset) => ({
    slug: dataset.slug,
  }));
}

export default async function DatasetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);

  if (!dataset) {
    notFound();
  }

  const MDXContent = getMDXComponent(dataset.body.code);

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 -ml-4" asChild>
            <Link href="/datasets">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Datasets
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {dataset.name}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {dataset.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {dataset.languages?.map((lang) => (
                <Badge key={lang} variant="secondary" className="bg-primary/10 text-primary">
                  {lang}
                </Badge>
              ))}
              {dataset.domain && (
                <Badge variant="outline">
                  {dataset.domain}
                </Badge>
              )}
            </div>

            {/* Metadata Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Size</div>
                    <div className="font-semibold">{dataset.size || "N/A"}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Format</div>
                    <div className="font-semibold">{dataset.format || "N/A"}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Version</div>
                    <div className="font-semibold">{dataset.version || "1.0.0"}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 p-6 bg-muted/30 rounded-lg border">
              {dataset.downloadUrl && (
                <Button variant="default" className="glossy-blue glossy-blue-hover" asChild>
                  <a href={dataset.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Dataset
                  </a>
                </Button>
              )}
              {dataset.documentationUrl && (
                <Button variant="outline" asChild>
                  <a href={dataset.documentationUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentation
                  </a>
                </Button>
              )}
              {dataset.doi && (
                <Button variant="outline" asChild>
                  <a href={`https://doi.org/${dataset.doi}`} target="_blank" rel="noopener noreferrer">
                    <Code className="w-4 h-4 mr-2" />
                    DOI
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* License Info */}
          {dataset.license && (
            <Card className="p-6 mb-12 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="border-primary/30">
                  License
                </Badge>
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    This dataset is released under the <strong>{dataset.license}</strong> license.
                  </p>
                </div>
              </div>
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
