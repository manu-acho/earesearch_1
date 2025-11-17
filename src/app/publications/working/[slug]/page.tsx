import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { workingPapers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Download, ArrowLeft, Calendar, Users, Tag } from "lucide-react";

// Use dynamic rendering - don't try to generate static params at build time
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  // Skip static generation if DB is not available
  if (!db) {
    return [];
  }
  
  try {
    const papers = await db.select().from(workingPapers);
    return papers.map((paper: typeof workingPapers.$inferSelect) => ({
      slug: paper.slug,
    }));
  } catch (error) {
    console.warn("Could not generate static params for working papers:", error);
    return [];
  }
}

async function getWorkingPaper(slug: string) {
  if (!db) {
    return null;
  }
  
  try {
    const papers = await db
      .select()
      .from(workingPapers)
      .where(eq(workingPapers.slug, slug))
      .limit(1);

    if (papers.length === 0) {
      return null;
    }

    const paper = papers[0];
    return {
      ...paper,
      authors: paper.authors ? JSON.parse(paper.authors) : [],
      coAuthors: paper.coAuthors ? JSON.parse(paper.coAuthors) : [],
      tags: paper.tags ? JSON.parse(paper.tags) : [],
      keywords: paper.keywords ? JSON.parse(paper.keywords) : [],
    };
  } catch (error) {
    console.error("Error fetching working paper:", error);
    return null;
  }
}

export default async function WorkingPaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = await getWorkingPaper(slug);

  if (!paper) {
    notFound();
  }

  const statusColors = {
    draft: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    "under-review": "bg-blue-500/10 text-blue-700 border-blue-500/20",
    revised: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    completed: "bg-green-500/10 text-green-700 border-green-500/20",
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 -ml-4" asChild>
            <Link href="/publications">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Publications
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge className={statusColors[paper.status as keyof typeof statusColors]}>
                {paper.status}
              </Badge>
              {paper.version && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <Badge variant="outline">{paper.version}</Badge>
                </>
              )}
              {paper.publishedDate && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {new Date(paper.publishedDate).getFullYear()}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {paper.title}
            </h1>

            {/* Authors */}
            <div className="flex items-start gap-2 text-lg text-muted-foreground mb-6">
              <Users className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                {paper.authors.join(", ")}
                {paper.coAuthors && paper.coAuthors.length > 0 && (
                  <span className="text-muted-foreground/70">
                    {" "}(with {paper.coAuthors.join(", ")})
                  </span>
                )}
              </div>
            </div>

            {/* Research Area */}
            {paper.researchArea && (
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <FileText className="w-4 h-4" />
                <span>{paper.researchArea}</span>
              </div>
            )}

            {/* Download Button */}
            {paper.pdfUrl && (
              <div className="flex gap-3 mb-8">
                <Button size="lg" className="glossy-blue glossy-blue-hover" asChild>
                  <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                    {paper.fileSize && (
                      <span className="ml-2 text-xs opacity-80">
                        ({(paper.fileSize / 1024).toFixed(0)} KB)
                      </span>
                    )}
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Abstract */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4">Abstract</h2>
            <p className="text-muted-foreground leading-relaxed">
              {paper.abstract}
            </p>
          </div>

          {/* Keywords */}
          {paper.keywords && paper.keywords.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {paper.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {paper.tags && paper.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="border-t pt-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Publication Details</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paper.publishedDate && (
                <>
                  <dt className="text-sm font-medium text-muted-foreground">Published Date</dt>
                  <dd className="text-sm">
                    {new Date(paper.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </>
              )}
              {paper.version && (
                <>
                  <dt className="text-sm font-medium text-muted-foreground">Version</dt>
                  <dd className="text-sm">{paper.version}</dd>
                </>
              )}
              <dt className="text-sm font-medium text-muted-foreground">Status</dt>
              <dd className="text-sm capitalize">{paper.status}</dd>
              {paper.lastUpdated && (
                <>
                  <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                  <dd className="text-sm">
                    {new Date(paper.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </>
              )}
            </dl>
          </div>

          {/* Citation */}
          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Citation</h3>
            <p className="text-sm font-mono text-muted-foreground">
              {paper.authors.join(", ")} ({paper.publishedDate ? new Date(paper.publishedDate).getFullYear() : new Date().getFullYear()}). 
              <em> {paper.title}</em>. 
              E.A Research Working Paper {paper.version}. 
              Available at: {typeof window !== 'undefined' ? window.location.href : `https://earesearch.net/publications/working/${paper.slug}`}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
