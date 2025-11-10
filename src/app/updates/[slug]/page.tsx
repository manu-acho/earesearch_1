"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, User, ArrowLeft, MapPin, FileText } from "lucide-react";

interface Update {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  location: string | null;
  updateType: string;
  tags: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export default function UpdatePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [update, setUpdate] = useState<Update | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/updates`)
      .then((res) => res.json())
      .then((data) => {
        const updates = Array.isArray(data) ? data : [];
        const foundUpdate = updates.find((u: Update) => u.slug === slug);
        setUpdate(foundUpdate || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching update:", error);
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

  if (!update) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Update Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The update you're looking for doesn't exist.
            </p>
            <Link href="/updates">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Updates
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
                    {/* Full Content */}
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: update.content }} />
          </article>
        </div>
      </div>
    </main>
  );
}
