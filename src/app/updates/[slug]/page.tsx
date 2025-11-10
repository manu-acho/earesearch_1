import { notFound } from "next/navigation";
import { getAllUpdates, getUpdateBySlug } from "@/lib/content";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const updates = getAllUpdates();
  return updates.map((update) => ({
    slug: update.slug,
  }));
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  const MDXContent = getMDXComponent(update.body.code);

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 -ml-4" asChild>
            <Link href="/updates">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Updates
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-12">
            {update.featured && (
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Featured
              </Badge>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {update.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(update.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {update.author}
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-8">
              {update.summary}
            </p>

            {update.tags && update.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {update.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Full Content */}
          <article className="prose prose-lg max-w-none">
            <MDXContent components={mdxComponents} />
          </article>
        </div>
      </div>
    </main>
  );
}
