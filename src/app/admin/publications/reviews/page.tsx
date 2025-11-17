"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LiteratureReview = {
  id: number;
  title: string;
  slug: string;
  topic: string;
  summary: string;
  fullReview: string;
  papersCovered: number | null;
  tags: string[];
  keyFindings: string[];
  pdfUrl: string | null;
  lastUpdated: string;
  createdAt: string;
};

export default function AdminLiteratureReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<LiteratureReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/publications/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/publications/reviews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      review.title.toLowerCase().includes(query) ||
      review.topic.toLowerCase().includes(query) ||
      review.summary.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Literature Reviews</h1>
          <p className="text-muted-foreground">
            Manage systematic reviews and literature synthesis documents
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/publications/reviews/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search reviews by title, topic, or summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {review.papersCovered && (
                      <Badge variant="outline">
                        {review.papersCovered} papers covered
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 hover:text-primary">
                    <Link href={`/publications/reviews/${review.slug}`} target="_blank">
                      {review.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Topic:</span> {review.topic}
                  </p>

                  <p className="text-muted-foreground line-clamp-2 mb-3">
                    {review.summary}
                  </p>

                  {review.keyFindings && review.keyFindings.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Key Findings:</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                        {review.keyFindings.slice(0, 3).map((finding, idx) => (
                          <li key={idx} className="line-clamp-1">{finding}</li>
                        ))}
                        {review.keyFindings.length > 3 && (
                          <li className="text-xs italic">+{review.keyFindings.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {review.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(review.lastUpdated).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {review.pdfUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={review.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/admin/publications/reviews/${review.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {deleteConfirm === review.id ? (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(review.id)}
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
                      onClick={() => setDeleteConfirm(review.id)}
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
          <h3 className="text-xl font-semibold mb-2">No literature reviews yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first systematic review or literature synthesis
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/publications/reviews/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Review
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
