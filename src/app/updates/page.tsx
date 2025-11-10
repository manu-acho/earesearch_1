"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ArrowRight, FileText, MapPin } from "lucide-react";

interface Update {
  id: number;
  title: string;
  slug: string;
  summary: string;
  author: string;
  date: string;
  location: string | null;
  updateType: string;
  tags: string[];
  featured: boolean;
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/updates")
      .then((res) => res.json())
      .then((data) => {
        setUpdates(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching updates:", error);
        setUpdates([]);
        setLoading(false);
      });
  }, []);

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

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Research Updates
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Latest news, field notes, and insights from our ongoing research in equitable digital agriculture.
          </p>
          <Link href="/admin/updates/new">
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Add New Update
            </Button>
          </Link>
        </div>

        {/* Updates List */}
        {updates.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {updates.map((update, index) => (
              <Link key={update.slug} href={`/updates/${update.slug}`}>
                <Card
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {update.featured && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="capitalize">
                          {update.updateType.replace("-", " ")}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(update.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        {update.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {update.location}
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                        {update.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4">
                        {update.summary}
                      </p>

                      {update.tags && update.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {update.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="text-sm text-muted-foreground">
                        By {update.author}
                      </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-muted/30 max-w-2xl mx-auto">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Updates Yet</h3>
            <p className="text-muted-foreground mb-6">
              Research updates, field notes, and announcements will appear here once they are published.
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
