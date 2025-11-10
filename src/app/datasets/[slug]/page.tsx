"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Download, FileText, Code, ArrowLeft, Database, Users, Calendar } from "lucide-react";

interface Dataset {
  id: number;
  name: string;
  slug: string;
  summary: string;
  description: string | null;
  size: string | null;
  format: string | null;
  license: string;
  version: string | null;
  downloadUrl: string | null;
  documentationUrl: string | null;
  doi: string | null;
  languages: string[];
  domains: string[];
  tags: string[];
  stats: Record<string, any> | null;
  citation: string | null;
  relatedPaper: number | null;
  featured: boolean;
  createdAt: string;
  lastUpdated: string;
}

export default function DatasetPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/datasets`)
      .then((res) => res.json())
      .then((data) => {
        const datasets = Array.isArray(data) ? data : [];
        const foundDataset = datasets.find((d: Dataset) => d.slug === slug);
        setDataset(foundDataset || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dataset:", error);
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

  if (!dataset) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Dataset Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The dataset you're looking for doesn't exist.
            </p>
            <Link href="/datasets">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Datasets
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

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
              {dataset.domains?.map((domain) => (
                <Badge key={domain} variant="outline">
                  {domain}
                </Badge>
              ))}
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

          {/* Full Description */}
          {dataset.description && (
            <article className="prose prose-lg max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: dataset.description }} />
            </article>
          )}

          {/* Statistics */}
          {dataset.stats && (
            <Card className="p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4">Dataset Statistics</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(dataset.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Citation */}
          {dataset.citation && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Citation</h2>
              <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
                {dataset.citation}
              </pre>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
