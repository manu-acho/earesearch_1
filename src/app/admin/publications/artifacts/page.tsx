"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink, FileVideo, FileAudio, FileImage, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ResearchArtifact = {
  id: number;
  title: string;
  type: string;
  description: string;
  fileUrl: string | null;
  externalUrl: string | null;
  youtubeId: string | null;
  metadata: any;
  tags: string[];
  collectionDate: string | null;
  thumbnail: string | null;
  fileSize: number | null;
  featured: boolean;
  createdAt: string;
};

const typeIcons = {
  video: FileVideo,
  audio: FileAudio,
  image: FileImage,
  interview: FileText,
  fieldnotes: FileText,
  dataset: FileText,
};

export default function AdminArtifactsPage() {
  const router = useRouter();
  const [artifacts, setArtifacts] = useState<ResearchArtifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    try {
      const response = await fetch('/api/publications/artifacts');
      if (response.ok) {
        const data = await response.json();
        setArtifacts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artifacts:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/publications/artifacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setArtifacts(artifacts.filter((a) => a.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete artifact");
      }
    } catch (error) {
      console.error("Error deleting artifact:", error);
      alert("Failed to delete artifact");
    }
  };

  const filteredArtifacts = artifacts.filter((artifact) => {
    const matchesSearch = !searchQuery || 
      artifact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = !typeFilter || artifact.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const types = Array.from(new Set(artifacts.map(a => a.type)));

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return null;
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Research Artifacts</h1>
          <p className="text-muted-foreground">
            Manage research materials including interviews, videos, field notes, and datasets
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/publications/artifacts/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Artifact
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search artifacts by title or description..."
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
            All ({artifacts.length})
          </Badge>
          {types.map((type) => (
            <Badge
              key={type}
              variant={typeFilter === type ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setTypeFilter(type)}
            >
              {type} ({artifacts.filter(a => a.type === type).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Artifacts List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading artifacts...</p>
        </div>
      ) : filteredArtifacts.length > 0 ? (
        <div className="space-y-4">
          {filteredArtifacts.map((artifact) => {
            const Icon = typeIcons[artifact.type as keyof typeof typeIcons] || FileText;
            return (
              <Card key={artifact.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    {artifact.thumbnail && (
                      <img 
                        src={artifact.thumbnail} 
                        alt={artifact.title}
                        className="w-32 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className="capitalize">
                          <Icon className="w-3 h-3 mr-1" />
                          {artifact.type}
                        </Badge>
                        {artifact.featured && (
                          <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                            Featured
                          </Badge>
                        )}
                        {artifact.collectionDate && (
                          <span className="text-sm text-muted-foreground">
                            {new Date(artifact.collectionDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2">
                        {artifact.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2 mb-3">
                        {artifact.description}
                      </p>

                      {artifact.fileSize && (
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">Size:</span> {formatFileSize(artifact.fileSize)}
                        </p>
                      )}

                      {artifact.metadata && Object.keys(artifact.metadata).length > 0 && (
                        <div className="text-sm text-muted-foreground mb-3">
                          <span className="font-medium">Metadata:</span>{" "}
                          {Object.entries(artifact.metadata).map(([key, value]) => (
                            <span key={key} className="mr-3">
                              {key}: {String(value)}
                            </span>
                          ))}
                        </div>
                      )}

                      {artifact.tags && artifact.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {artifact.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        Added: {new Date(artifact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {(artifact.fileUrl || artifact.externalUrl) && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={artifact.fileUrl || artifact.externalUrl || '#'} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </a>
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => router.push(`/admin/publications/artifacts/${artifact.id}`)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    {deleteConfirm === artifact.id ? (
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(artifact.id)}
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
                        onClick={() => setDeleteConfirm(artifact.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
          <h3 className="text-xl font-semibold mb-2">No research artifacts yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first research material to build your collection
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/publications/artifacts/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Artifact
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
