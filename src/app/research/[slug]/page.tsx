import { notFound } from "next/navigation";
import { getAllThemes, getThemeBySlug, getRelatedPublications, getRelatedPrototypes, getRelatedDatasets } from "@/lib/content";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "@/components/mdx-components";
import { PublicationCard } from "@/components/publication-card";
import { PrototypeCard } from "@/components/prototype-card";
import { DatasetCard } from "@/components/dataset-card";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const themes = getAllThemes();
  return themes.map((theme) => ({
    slug: theme.slug,
  }));
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);

  if (!theme) {
    notFound();
  }

  const MDXContent = getMDXComponent(theme.body.code);
  const relatedPublications = getRelatedPublications(theme.relatedPublications || []);
  const relatedPrototypes = getRelatedPrototypes(theme.relatedPrototypes || []);
  const relatedDatasets = getRelatedDatasets(theme.relatedDatasets || []);

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <Badge className="mb-4">Research Theme</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {theme.title}
            </h1>
            <p className="text-xl text-muted-foreground">{theme.summary}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <MDXContent components={mdxComponents} />
          </article>
        </div>

        {/* Related Content */}
        {(relatedPublications.length > 0 || relatedPrototypes.length > 0 || relatedDatasets.length > 0) && (
          <div className="mt-20 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Related Content</h2>
            
            {relatedPublications.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Publications</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPublications.map((pub) => (
                    <PublicationCard key={pub.slug} publication={pub} />
                  ))}
                </div>
              </div>
            )}

            {relatedPrototypes.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Prototypes</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedPrototypes.map((proto) => (
                    <PrototypeCard key={proto.slug} prototype={proto} />
                  ))}
                </div>
              </div>
            )}

            {relatedDatasets.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Datasets</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedDatasets.map((dataset) => (
                    <DatasetCard key={dataset.slug} dataset={dataset} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
