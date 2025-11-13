"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DatasetCard } from "@/components/dataset-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Database } from "lucide-react";

type Dataset = {
  id: number;
  name: string;
  slug: string;
  summary: string;
  size: string | null;
  format: string | null;
  license: string;
  languages: string[];
  domains: string[];
  tags: string[];
  featured: boolean;
};

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/datasets")
      .then((res) => res.json())
      .then((data) => {
        setDatasets(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching datasets:", error);
        setDatasets([]);
        setLoading(false);
      });
  }, []);

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Datasets
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Provided by Addis AI, access open datasets for advancing equitable socio-technical systems. 
              All datasets are freely available to support researchers and developers working on African language technologies.
            </p>

            {/* Partnership Badge */}
            <div className="flex items-center justify-center gap-3 py-6 border-y border-muted/30">
              <a
                href="https://platform.addisassistant.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <img 
                  src="https://violet-rainy-toad-577.mypinata.cloud/ipfs/bafkreia5cbdyqqubj2t6lklekcds72bxzmzavkdwqrx47fegbzanxfe6d4" 
                  alt="Addis AI" 
                  className="h-20 w-20 md:h-24 md:w-24"
                />
              </a>
            </div>

            {/* Add Button */}
            <div className="mt-6">
              <Button className="glossy-blue glossy-blue-hover" asChild>
                <Link href="/admin/datasets/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Dataset
                </Link>
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading datasets...</p>
            </div>
          ) : filteredDatasets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDatasets.map((dataset, index) => (
                <div
                  key={dataset.slug}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <DatasetCard dataset={dataset} />
                </div>
              ))}
            </div>
          ) : datasets.length === 0 ? (
            <div className="text-center py-16 bg-muted/20 rounded-lg border-2 border-dashed">
              <Database className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-2">No Datasets Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start building your research data collection by adding your first dataset.
              </p>
              <Button className="glossy-blue glossy-blue-hover" asChild>
                <Link href="/admin/datasets/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Dataset
                </Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No datasets match your search.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
