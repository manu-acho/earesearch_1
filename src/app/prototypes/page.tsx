"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ExternalLink, Code, Play } from "lucide-react";
import Link from "next/link";

type Prototype = {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: string;
  demoUrl?: string;
  repoUrl?: string;
  externalUrl?: string;
  stack?: string[];
  useCases?: string[];
  tags?: string[];
  videoUrl?: string;
  featured: boolean;
};

export default function PrototypesPage() {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
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

    fetchPrototypes();
  }, [statusFilter]);

  const filteredPrototypes = prototypes.filter((proto) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      proto.name.toLowerCase().includes(query) ||
      proto.description.toLowerCase().includes(query)
    );
  });

  const statusColors = {
    prototype: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    pilot: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    production: "bg-green-500/10 text-green-700 border-green-500/20",
    archived: "bg-gray-500/10 text-gray-700 border-gray-500/20",
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Prototypes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experimental systems and tools for equitable socio-technical designs. 
            These prototypes demonstrate practical applications of our research.
          </p>

          {/* Partnership Badge */}
          <div className="flex items-center justify-center gap-4 md:gap-6 py-6 border-y border-muted/30">
            <img 
              src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafybeighh6omrl4r64z5wfjfbmcctfxglaty662zrxhpiaubdjnogkdjm4" 
              alt="E.A Research" 
              className="h-12 w-12 md:h-16 md:w-16 opacity-80 hover:opacity-100 transition-opacity"
            />
            <span className="text-xl md:text-2xl text-muted-foreground/50">—</span>
            <a
              href="https://platform.addisassistant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              <img 
                src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4" 
                alt="Addis AI" 
                className="h-10 w-10 md:h-14 md:w-14 opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          {/* Add Button */}
          <div className="mt-6">
            <Button className="glossy-blue glossy-blue-hover" asChild>
              <Link href="/admin/prototypes/new">
                <Plus className="w-4 h-4 mr-2" />
                Add Prototype
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search prototypes..."
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
              All
            </Badge>
            {["prototype", "pilot", "production", "archived"].map((status) => (
              <Badge
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        {/* Prototypes Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading prototypes...</p>
          </div>
        ) : filteredPrototypes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPrototypes.map((prototype, index) => (
              <Card
                key={prototype.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {prototype.featured && (
                  <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                    Featured
                  </Badge>
                )}
                
                <Badge className={`mb-3 capitalize ${statusColors[prototype.status as keyof typeof statusColors]}`}>
                  {prototype.status}
                </Badge>

                <h3 className="text-xl font-bold mb-2">{prototype.name}</h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {prototype.description}
                </p>

                {prototype.stack && prototype.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {prototype.stack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {prototype.stack.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{prototype.stack.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {prototype.tags && prototype.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {prototype.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {prototype.demoUrl && (
                    <Button size="sm" variant="default" asChild>
                      <a href={prototype.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="w-3 h-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {prototype.repoUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={prototype.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Code className="w-3 h-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {prototype.externalUrl && !prototype.demoUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={prototype.externalUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/prototypes/${prototype.slug}`}>
                      Details
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-muted/30 border-dashed border-2 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No prototypes yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your first experimental system or tool to showcase practical applications of your research.
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
    </main>
  );
}
