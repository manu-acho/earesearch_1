"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Update = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  location: string | null;
  updateType: string | null;
  tags: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  lastUpdated: string;
  createdAt: string;
};

const typeColors = {
  "field-note": "bg-green-500/10 text-green-700 border-green-500/20",
  "research-update": "bg-blue-500/10 text-blue-700 border-blue-500/20",
  "announcement": "bg-purple-500/10 text-purple-700 border-purple-500/20",
  "blog": "bg-orange-500/10 text-orange-700 border-orange-500/20",
};

export default function AdminUpdatesPage() {
  const router = useRouter();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('/api/updates');
      if (response.ok) {
        const data = await response.json();
        setUpdates(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching updates:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/updates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUpdates(updates.filter((u) => u.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete update");
      }
    } catch (error) {
      console.error("Error deleting update:", error);
      alert("Failed to delete update");
    }
  };

  const filteredUpdates = updates.filter((update) => {
    const matchesSearch = !searchQuery || 
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = !typeFilter || update.updateType === typeFilter;

    return matchesSearch && matchesType;
  });

  const types = Array.from(new Set(updates.map(u => u.updateType).filter(Boolean)));

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Updates & Field Notes</h1>
          <p className="text-muted-foreground">
            Manage research updates, field notes, announcements, and blog posts
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/updates/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Update
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search updates by title, summary, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={typeFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setTypeFilter(null)}
          >
            All ({updates.length})
          </Badge>
          {types.map((type) => (
            <Badge
              key={type}
              variant={typeFilter === type ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setTypeFilter(type)}
            >
              {type?.replace("-", " ")} ({updates.filter(u => u.updateType === type).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Updates List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading updates...</p>
        </div>
      ) : filteredUpdates.length > 0 ? (
        <div className="space-y-4">
          {filteredUpdates.map((update) => (
            <Card key={update.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  {update.images && update.images.length > 0 && (
                    <img 
                      src={update.images[0]} 
                      alt={update.title}
                      className="w-32 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {update.updateType && (
                        <Badge className={typeColors[update.updateType as keyof typeof typeColors]}>
                          {update.updateType.replace("-", " ")}
                        </Badge>
                      )}
                      {update.featured && (
                        <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                          Featured
                        </Badge>
                      )}
                      {!update.published && (
                        <Badge variant="outline">Draft</Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {new Date(update.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 hover:text-primary">
                      <Link href={`/updates/${update.slug}`} target="_blank">
                        {update.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-muted-foreground mb-2">
                      By {update.author}
                    </p>

                    {update.location && (
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {update.location}
                      </p>
                    )}

                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {update.summary}
                    </p>

                    {update.tags && update.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {update.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Last updated: {new Date(update.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    asChild
                  >
                    <Link href={`/updates/${update.slug}`} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/admin/updates/${update.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {deleteConfirm === update.id ? (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(update.id)}
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
                      onClick={() => setDeleteConfirm(update.id)}
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
          <h3 className="text-xl font-semibold mb-2">No updates yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first update, field note, or blog post
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/updates/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Update
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
