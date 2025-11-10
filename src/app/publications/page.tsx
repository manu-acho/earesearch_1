"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Brain, FileText, Library, Lightbulb, Share2, Video } from "lucide-react";
import Link from "next/link";

// Types for database records
type ExternalPaper = {
  id: number;
  title: string;
  authors: string;
  year: number;
  abstract?: string;
  downloadUrl: string;
  sourceWebsite?: string;
  doi?: string;
  tags?: string[];
  category?: string;
  notes?: string;
  featured: boolean;
};

type WorkingPaper = {
  id: number;
  title: string;
  slug: string;
  abstract: string;
  authors: string[];
  status: string;
  version: string;
  pdfUrl?: string;
  tags?: string[];
  lastUpdated: Date;
};

type LiteratureReview = {
  id: number;
  title: string;
  slug: string;
  topic: string;
  summary: string;
  papersCovered?: number;
  tags?: string[];
  lastUpdated: Date;
};

type SocialPost = {
  id: number;
  title: string;
  platform: string;
  postUrl: string;
  excerpt?: string;
  publishedDate: Date;
  tags?: string[];
  featured: boolean;
};

type ResearchArtifact = {
  id: number;
  title: string;
  type: string;
  description: string;
  externalUrl?: string;
  youtubeId?: string;
  tags?: string[];
  featured: boolean;
};

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [externalPapers, setExternalPapers] = useState<ExternalPaper[]>([]);
  const [workingPapers, setWorkingPapers] = useState<WorkingPaper[]>([]);
  const [literatureReviews, setLiteratureReviews] = useState<LiteratureReview[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [researchArtifacts, setResearchArtifacts] = useState<ResearchArtifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API endpoints
    const fetchData = async () => {
      try {
        const [libRes, workRes, revRes, socRes, artRes] = await Promise.all([
          fetch("/api/publications/library"),
          fetch("/api/publications/working"),
          fetch("/api/publications/reviews"),
          fetch("/api/publications/social"),
          fetch("/api/publications/artifacts"),
        ]);

        if (libRes.ok) {
          const data = await libRes.json();
          setExternalPapers(data);
        }
        if (workRes.ok) {
          const data = await workRes.json();
          setWorkingPapers(data);
        }
        if (revRes.ok) {
          const data = await revRes.json();
          setLiteratureReviews(data);
        }
        if (socRes.ok) {
          const data = await socRes.json();
          setSocialPosts(data);
        }
        if (artRes.ok) {
          const data = await artRes.json();
          setResearchArtifacts(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching publications:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterBySearch = <T extends { title: string }>(items: T[]) => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Publications & Research
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Comprehensive research knowledge base: working papers, curated library, literature reviews, and research artifacts.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search across all publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>

        {/* Main Tabs */}
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="library" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-10 h-auto">
              <TabsTrigger value="library" className="flex flex-col gap-1 py-3">
                <Library className="w-5 h-5" />
                <span className="text-xs">Library</span>
              </TabsTrigger>
              <TabsTrigger value="working" className="flex flex-col gap-1 py-3">
                <FileText className="w-5 h-5" />
                <span className="text-xs">Working Papers</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex flex-col gap-1 py-3">
                <Lightbulb className="w-5 h-5" />
                <span className="text-xs">Reviews</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex flex-col gap-1 py-3">
                <Share2 className="w-5 h-5" />
                <span className="text-xs">Social Posts</span>
              </TabsTrigger>
              <TabsTrigger value="artifacts" className="flex flex-col gap-1 py-3">
                <Video className="w-5 h-5" />
                <span className="text-xs">Artifacts</span>
              </TabsTrigger>
              <TabsTrigger value="rag" className="flex flex-col gap-1 py-3">
                <Brain className="w-5 h-5" />
                <span className="text-xs">AI Assistant</span>
              </TabsTrigger>
            </TabsList>

            {/* External Papers Library */}
            <TabsContent value="library" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">External Papers Library</h2>
                  <p className="text-muted-foreground">
                    Curated research from other authors with links to download sites
                  </p>
                </div>
                <Button className="glossy-blue glossy-blue-hover" asChild>
                  <Link href="/admin/publications/library/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Paper
                  </Link>
                </Button>
              </div>

              {filterBySearch(externalPapers).length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filterBySearch(externalPapers).map((paper) => (
                    <Card key={paper.id} className="p-6 hover:shadow-lg transition-shadow">
                      {paper.featured && (
                        <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                          Featured
                        </Badge>
                      )}
                      <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{paper.authors} ({paper.year})</p>
                      {paper.abstract && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {paper.abstract}
                        </p>
                      )}
                      {paper.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {paper.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="default" size="sm" asChild>
                          <a href={paper.downloadUrl} target="_blank" rel="noopener noreferrer">
                            Download
                          </a>
                        </Button>
                        {paper.sourceWebsite && (
                          <Badge variant="secondary">{paper.sourceWebsite}</Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
                  <Library className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No external papers yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start building your research library by adding papers from other researchers
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/admin/publications/library/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Paper
                    </Link>
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* Working Papers */}
            <TabsContent value="working" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Working Papers</h2>
                  <p className="text-muted-foreground">
                    Your original research papers with version control and PDF uploads
                  </p>
                </div>
                <Button className="glossy-blue glossy-blue-hover" asChild>
                  <Link href="/admin/publications/working/new">
                    <Plus className="w-4 h-4 mr-2" />
                    New Paper
                  </Link>
                </Button>
              </div>

              {filterBySearch(workingPapers).length > 0 ? (
                <div className="space-y-4">
                  {filterBySearch(workingPapers).map((paper) => (
                    <Card key={paper.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{paper.title}</h3>
                            <Badge variant="outline">{paper.version}</Badge>
                            <Badge
                              variant={
                                paper.status === "completed" ? "default" :
                                paper.status === "under-review" ? "secondary" : "outline"
                              }
                            >
                              {paper.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {paper.authors.join(", ")}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {paper.abstract}
                          </p>
                          {paper.tags && (
                            <div className="flex flex-wrap gap-2">
                              {paper.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          {paper.pdfUrl && (
                            <Button size="sm" asChild>
                              <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                                View PDF
                              </a>
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/publications/working/${paper.slug}`}>
                              Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No working papers yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your research papers with version control and metadata
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/admin/publications/working/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Your First Paper
                    </Link>
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* Literature Reviews */}
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Literature Reviews</h2>
                  <p className="text-muted-foreground">
                    Comprehensive reviews synthesizing research from multiple papers
                  </p>
                </div>
                <Button className="glossy-blue glossy-blue-hover" asChild>
                  <Link href="/admin/publications/reviews/new">
                    <Plus className="w-4 h-4 mr-2" />
                    New Review
                  </Link>
                </Button>
              </div>

              {filterBySearch(literatureReviews).length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filterBySearch(literatureReviews).map((review) => (
                    <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
                      <p className="text-sm text-primary mb-3">{review.topic}</p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {review.summary}
                      </p>
                      {review.papersCovered && (
                        <p className="text-xs text-muted-foreground mb-4">
                          Covers {review.papersCovered} papers
                        </p>
                      )}
                      {review.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {review.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/publications/reviews/${review.slug}`}>
                          Read Review
                        </Link>
                      </Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
                  <Lightbulb className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No literature reviews yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create comprehensive reviews synthesizing multiple research papers
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/admin/publications/reviews/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Write Your First Review
                    </Link>
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* Social Posts */}
            <TabsContent value="social" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Social Media Posts</h2>
                  <p className="text-muted-foreground">
                    Research insights shared on LinkedIn, Twitter, and other platforms
                  </p>
                </div>
                <Button className="glossy-blue glossy-blue-hover" asChild>
                  <Link href="/admin/publications/social/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Post
                  </Link>
                </Button>
              </div>

              {filterBySearch(socialPosts).length > 0 ? (
                <div className="grid md:grid-cols-3 gap-4">
                  {filterBySearch(socialPosts).map((post) => (
                    <Card key={post.id} className="p-5 hover:shadow-lg transition-shadow">
                      {post.featured && (
                        <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 text-xs">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="mb-3 text-xs">
                        {post.platform}
                      </Badge>
                      <h4 className="font-semibold mb-2 line-clamp-2">{post.title}</h4>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
                          View Post
                        </a>
                      </Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
                  <Share2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No social posts yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Share your LinkedIn posts and research insights from social media
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/admin/publications/social/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Post
                    </Link>
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* Research Artifacts */}
            <TabsContent value="artifacts" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Research Artifacts</h2>
                  <p className="text-muted-foreground">
                    Videos, interviews, field notes, and other research materials
                  </p>
                </div>
                <Button className="glossy-blue glossy-blue-hover" asChild>
                  <Link href="/admin/publications/artifacts/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Artifact
                  </Link>
                </Button>
              </div>

              {filterBySearch(researchArtifacts).length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {filterBySearch(researchArtifacts).map((artifact) => (
                    <Card key={artifact.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {artifact.youtubeId && (
                        <div className="aspect-video bg-muted">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${artifact.youtubeId}`}
                            title={artifact.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {artifact.type}
                        </Badge>
                        <h4 className="font-semibold mb-2">{artifact.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {artifact.description}
                        </p>
                        {artifact.externalUrl && !artifact.youtubeId && (
                          <Button size="sm" variant="outline" className="w-full" asChild>
                            <a href={artifact.externalUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
                  <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-2">No research artifacts yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload videos, interviews, field notes, and other research materials
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/admin/publications/artifacts/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Artifact
                    </Link>
                  </Button>
                </Card>
              )}
            </TabsContent>

            {/* RAG AI Assistant */}
            <TabsContent value="rag" className="space-y-6">
              <Card className="p-12 bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">AI Research Assistant</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Ask questions about our entire research corpus using natural language. 
                    Our assistant will search across all publications, reviews, and artifacts to provide relevant insights.
                  </p>
                  <div className="bg-background/50 rounded-lg p-6 mb-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Coming Soon:</strong> Powered by RAG (Retrieval Augmented Generation)
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
                      <Badge variant="outline">Flowise Integration</Badge>
                      <Badge variant="outline">n8n Workflows</Badge>
                      <Badge variant="outline">Vector Search</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This feature will be enabled once we have sufficient content in our publication database
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
