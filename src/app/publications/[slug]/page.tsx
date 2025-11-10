import { notFound } from "next/navigation";
import { getAllPublications, getPublicationBySlug } from "@/lib/content";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "@/components/mdx-components";
import { CitationBlock } from "@/components/citation-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Code, Database, ExternalLink, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const publications = getAllPublications();
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const MDXContent = getMDXComponent(publication.body.code);

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
              <Badge variant={
                publication.status === 'published' ? 'default' :
                publication.status === 'preprint' ? 'secondary' : 'outline'
              }>
                {publication.status}
              </Badge>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{publication.year}</span>
              {publication.venue && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{publication.venue}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {publication.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {publication.authors?.map((author) => (
                <Badge key={author} variant="outline">
                  {author}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {publication.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3 p-6 bg-muted/30 rounded-lg border">
              {publication.pdfUrl && (
                <Button variant="default" className="glossy-blue glossy-blue-hover" asChild>
                  <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              )}
              {publication.codeUrl && (
                <Button variant="outline" asChild>
                  <a href={publication.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Code className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
              {publication.datasetUrl && (
                <Button variant="outline" asChild>
                  <a href={publication.datasetUrl} target="_blank" rel="noopener noreferrer">
                    <Database className="w-4 h-4 mr-2" />
                    Access Dataset
                  </a>
                </Button>
              )}
              {publication.doi && (
                <Button variant="outline" asChild>
                  <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    DOI
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Abstract */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Abstract</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {publication.abstract}
            </p>
          </div>

          {/* Full Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <MDXContent components={mdxComponents} />
          </article>

          {/* Citation */}
          <CitationBlock publication={publication} />
        </div>
      </div>
    </main>
  );
}
