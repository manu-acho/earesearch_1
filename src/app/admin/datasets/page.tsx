"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Dataset = {
  id: number;
  name: string;
  slug: string;
  summary: string;
  description: string | null;
  size: string | null;
  format: string | null;
  license: string;
  version: string | null;
  downloadUrl: string | null;
  documentationUrl: string | null;
  doi: string | null;
  languages: string[];
  domains: string[];
  tags: string[];
  stats: any;
  featured: boolean;
  lastUpdated: string;
  createdAt: string;
};

export default function AdminDatasetsPage() {
  const router = useRouter();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const response = await fetch('/api/datasets');
      if (response.ok) {
        const data = await response.json();
        setDatasets(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching datasets:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/datasets/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDatasets(datasets.filter((d) => d.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete dataset");
      }
    } catch (error) {
      console.error("Error deleting dataset:", error);
      alert("Failed to delete dataset");
    }
  };

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = !searchQuery || 
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = !domainFilter || 
      (dataset.domains && dataset.domains.includes(domainFilter));

    return matchesSearch && matchesDomain;
  });

  const allDomains = Array.from(
    new Set(datasets.flatMap(d => d.domains || []))
  );

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Datasets</h1>
          <p className="text-muted-foreground">
            Manage research datasets, corpora, and data collections
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/datasets/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Dataset
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search datasets by name or summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={domainFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setDomainFilter(null)}
          >
            All ({datasets.length})
          </Badge>
          {allDomains.map((domain) => (
            <Badge
              key={domain}
              variant={domainFilter === domain ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setDomainFilter(domain)}
            >
              {domain} ({datasets.filter(d => d.domains?.includes(domain)).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Datasets List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading datasets...</p>
        </div>
      ) : filteredDatasets.length > 0 ? (
        <div className="space-y-4">
          {filteredDatasets.map((dataset) => (
            <Card key={dataset.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {dataset.version && (
                      <Badge variant="outline">v{dataset.version}</Badge>
                    )}
                    {dataset.featured && (
                      <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                        Featured
                      </Badge>
                    )}
                    {dataset.format && (
                      <Badge variant="outline">{dataset.format}</Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 hover:text-primary">
                    <Link href={`/datasets/${dataset.slug}`} target="_blank">
                      {dataset.name}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground line-clamp-2 mb-3">
                    {dataset.summary}
                  </p>

                  {dataset.size && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Size:</span> {dataset.size}
                    </p>
                  )}

                  {dataset.license && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">License:</span> {dataset.license}
                    </p>
                  )}

                  {dataset.languages && dataset.languages.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium">Languages:</span> {dataset.languages.join(", ")}
                    </p>
                  )}

                  {dataset.domains && dataset.domains.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {dataset.domains.map((domain) => (
                        <Badge key={domain} variant="secondary" className="text-xs">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {dataset.tags && dataset.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {dataset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(dataset.lastUpdated).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {dataset.downloadUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={dataset.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  )}
                  {dataset.documentationUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={dataset.documentationUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Docs
                      </a>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/admin/datasets/${dataset.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {deleteConfirm === dataset.id ? (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(dataset.id)}
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
                      onClick={() => setDeleteConfirm(dataset.id)}
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
          <h3 className="text-xl font-semibold mb-2">No datasets yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first dataset to share research data
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/datasets/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Dataset
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
