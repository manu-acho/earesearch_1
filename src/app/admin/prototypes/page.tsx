"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink, Play, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Prototype = {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string | null;
  status: string;
  demoUrl: string | null;
  repoUrl: string | null;
  externalUrl: string | null;
  stack: string[];
  useCases: string[];
  tags: string[];
  screenshots: string[];
  videoUrl: string | null;
  featured: boolean;
  lastUpdated: string;
  createdAt: string;
};

const statusColors = {
  prototype: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  pilot: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  production: "bg-green-500/10 text-green-700 border-green-500/20",
  archived: "bg-gray-500/10 text-gray-700 border-gray-500/20",
};

export default function AdminPrototypesPage() {
  const router = useRouter();
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchPrototypes();
  }, [statusFilter]);

  const fetchPrototypes = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      
      const response = await fetch(`/api/prototypes?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPrototypes(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching prototypes:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/prototypes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPrototypes(prototypes.filter((p) => p.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete prototype");
      }
    } catch (error) {
      console.error("Error deleting prototype:", error);
      alert("Failed to delete prototype");
    }
  };

  const filteredPrototypes = prototypes.filter((prototype) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      prototype.name.toLowerCase().includes(query) ||
      prototype.description.toLowerCase().includes(query) ||
      prototype.stack.some(s => s.toLowerCase().includes(query))
    );
  });

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Prototypes</h1>
          <p className="text-muted-foreground">
            Manage experimental systems, tools, and applications
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/prototypes/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Prototype
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search prototypes by name, description, or tech stack..."
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
            All ({prototypes.length})
          </Badge>
          {["prototype", "pilot", "production", "archived"].map((status) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setStatusFilter(status)}
            >
              {status} ({prototypes.filter(p => p.status === status).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Prototypes List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading prototypes...</p>
        </div>
      ) : filteredPrototypes.length > 0 ? (
        <div className="space-y-4">
          {filteredPrototypes.map((prototype) => (
            <Card key={prototype.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  {prototype.screenshots && prototype.screenshots.length > 0 && (
                    <img 
                      src={prototype.screenshots[0]} 
                      alt={prototype.name}
                      className="w-40 h-32 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={statusColors[prototype.status as keyof typeof statusColors]}>
                        {prototype.status}
                      </Badge>
                      {prototype.featured && (
                        <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 hover:text-primary">
                      <Link href={`/prototypes/${prototype.slug}`} target="_blank">
                        {prototype.name}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {prototype.description}
                    </p>

                    {prototype.stack && prototype.stack.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-2">Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {prototype.stack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {prototype.useCases && prototype.useCases.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-3">
                        <span className="font-medium">Use Cases:</span> {prototype.useCases.length}
                      </p>
                    )}

                    {prototype.tags && prototype.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {prototype.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Last updated: {new Date(prototype.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {prototype.demoUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={prototype.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {prototype.repoUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={prototype.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/admin/prototypes/${prototype.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {deleteConfirm === prototype.id ? (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(prototype.id)}
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
                      onClick={() => setDeleteConfirm(prototype.id)}
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
          <h3 className="text-xl font-semibold mb-2">No prototypes yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first prototype or experimental system
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/prototypes/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Prototype
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
