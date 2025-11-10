import { getAllUpdates } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function UpdatesPage() {
  const updates = getAllUpdates().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Research Updates
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest news, field notes, and insights from our ongoing research in equitable digital agriculture.
          </p>
        </div>

        {/* Updates List */}
        {updates.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {updates.map((update, index) => (
              <Card
                key={update.slug}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={update.url}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {update.featured && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Featured
                          </Badge>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(update.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {update.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4">
                        {update.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {update.tags?.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        By {update.author}
                      </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No updates available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
