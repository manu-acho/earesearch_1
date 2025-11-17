"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type WorkingPaper = {
  id: number;
  title: string;
  slug: string;
  abstract: string;
  authors: string[];
  status: string;
  version: string;
  researchArea: string | null;
  pdfUrl: string | null;
  tags: string[];
  lastUpdated: string;
  publishedDate: string | null;
};

export default function AdminWorkingPapersPage() {
  const router = useRouter();
  const [papers, setPapers] = useState<WorkingPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchPapers();
  }, [statusFilter]);

  const fetchPapers = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      
      const response = await fetch(`/api/publications/working?${params}`);
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
      const response = await fetch(`/api/publications/working/${id}`, {
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
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.authors.some(a => a.toLowerCase().includes(query))
    );
  });

  const statusColors = {
    draft: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    "under-review": "bg-blue-500/10 text-blue-700 border-blue-500/20",
    revised: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    completed: "bg-green-500/10 text-green-700 border-green-500/20",
  };

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Working Papers</h1>
          <p className="text-muted-foreground">
            Manage your research papers with version control and status tracking
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/publications/working/new">
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
              placeholder="Search papers by title, abstract, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={statusFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setStatusFilter(null)}
          >
            All ({papers.length})
          </Badge>
          {["draft", "under-review", "revised", "completed"].map((status) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setStatusFilter(status)}
            >
              {status.replace("-", " ")} ({papers.filter(p => p.status === status).length})
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
                    <Badge className={statusColors[paper.status as keyof typeof statusColors]}>
                      {paper.status}
                    </Badge>
                    {paper.version && (
                      <Badge variant="outline">{paper.version}</Badge>
                    )}
                    {paper.publishedDate && (
                      <span className="text-sm text-muted-foreground">
                        {new Date(paper.publishedDate).getFullYear()}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 hover:text-primary">
                    <Link href={`/publications/working/${paper.slug}`} target="_blank">
                      {paper.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    By {paper.authors.join(", ")}
                  </p>

                  {paper.researchArea && (
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium">Research Area:</span> {paper.researchArea}
                    </p>
                  )}

                  <p className="text-muted-foreground line-clamp-2 mb-3">
                    {paper.abstract}
                  </p>

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
                    Last updated: {new Date(paper.lastUpdated).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {paper.pdfUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/admin/publications/working/${paper.id}`)}
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
          <h3 className="text-xl font-semibold mb-2">No working papers yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first research paper to get started
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/publications/working/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Paper
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
