"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ExternalPaper = {
  id: number;
  title: string;
  authors: string;
  year: number;
  abstract: string | null;
  downloadUrl: string;
  sourceWebsite: string | null;
  doi: string | null;
  tags: string[];
  category: string | null;
  notes: string | null;
  featured: boolean;
  createdAt: string;
};

export default function AdminLibraryPage() {
  const router = useRouter();
  const [papers, setPapers] = useState<ExternalPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/publications/library');
      if (response.ok) {
        const data = await response.json();
        setPapers(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching papers:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/publications/library/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPapers(papers.filter((p) => p.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete paper");
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
      alert("Failed to delete paper");
    }
  };

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = !searchQuery || 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (paper.abstract && paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !categoryFilter || paper.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(papers.map(p => p.category).filter(Boolean)));

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">External Papers Library</h1>
          <p className="text-muted-foreground">
            Manage external research papers and references
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/publications/library/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Paper
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search papers by title, author, or abstract..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={categoryFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter(null)}
          >
            All ({papers.length})
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategoryFilter(category)}
            >
              {category} ({papers.filter(p => p.category === category).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Papers List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading papers...</p>
        </div>
      ) : filteredPapers.length > 0 ? (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {paper.category && (
                      <Badge variant="outline">{paper.category}</Badge>
                    )}
                    {paper.featured && (
                      <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                        Featured
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">{paper.year}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    By {paper.authors}
                  </p>

                  {paper.sourceWebsite && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Source:</span> {paper.sourceWebsite}
                    </p>
                  )}

                  {paper.doi && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">DOI:</span> {paper.doi}
                    </p>
                  )}

                  {paper.abstract && (
                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {paper.abstract}
                    </p>
                  )}

                  {paper.notes && (
                    <p className="text-sm text-muted-foreground mb-3 italic">
                      <span className="font-medium">Notes:</span> {paper.notes}
                    </p>
                  )}

                  {paper.tags && paper.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {paper.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Added: {new Date(paper.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={paper.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Source
                    </a>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/admin/publications/library/${paper.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {deleteConfirm === paper.id ? (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(paper.id)}
                      >
                        Confirm?
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(paper.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
          <h3 className="text-xl font-semibold mb-2">No external papers yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first external paper to build your research library
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/publications/library/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Paper
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
