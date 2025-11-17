"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus, Loader2 } from "lucide-react";

export default function EditDatasetPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [datasetId, setDatasetId] = useState<string>("");
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    summary: "",
    description: "",
    size: "",
    format: "",
    license: "",
    version: "1.0.0",
    downloadUrl: "",
    documentationUrl: "",
    doi: "",
    citation: "",
    featured: false,
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [langInput, setLangInput] = useState("");
  const [domainInput, setDomainInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const loadDataset = async () => {
      try {
        const resolvedParams = await params;
        setDatasetId(resolvedParams.id);
        
        const response = await fetch(`/api/datasets/${resolvedParams.id}`);
        if (!response.ok) throw new Error("Failed to fetch dataset");
        
        const dataset = await response.json();
        setFormData({
          name: dataset.name,
          slug: dataset.slug,
          summary: dataset.summary,
          description: dataset.description || "",
          size: dataset.size || "",
          format: dataset.format || "",
          license: dataset.license || "",
          version: dataset.version || "1.0.0",
          downloadUrl: dataset.downloadUrl || "",
          documentationUrl: dataset.documentationUrl || "",
          doi: dataset.doi || "",
          citation: dataset.citation || "",
          featured: dataset.featured || false,
        });
        setLanguages(dataset.languages || []);
        setDomains(dataset.domains || []);
        setTags(dataset.tags || []);
      } catch (err) {
        setError("Failed to load dataset");
      } finally {
        setFetching(false);
      }
    };

    loadDataset();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/datasets/${datasetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, languages, domains, tags }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update dataset");
      }

      router.push("/admin/datasets");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addItem = (list: string[], setList: (v: string[]) => void, input: string, setInput: (v: string) => void) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()]);
      setInput("");
    }
  };

  const removeItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.filter(i => i !== item));
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Edit Dataset</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name*</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug*</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                pattern="[a-z0-9-]+"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Summary*</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <Input
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 2.5 GB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <Input
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  placeholder="e.g., JSON, CSV"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">License*</label>
                <Input
                  value={formData.license}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                  placeholder="e.g., CC BY 4.0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Version</label>
                <Input
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Download URL</label>
              <Input
                type="url"
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Documentation URL</label>
              <Input
                type="url"
                value={formData.documentationUrl}
                onChange={(e) => setFormData({ ...formData, documentationUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">DOI</label>
              <Input
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Citation</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
                value={formData.citation}
                onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Dataset</label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Languages</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {languages.map((lang) => (
              <span key={lang} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {lang}
                <button type="button" onClick={() => removeItem(languages, setLanguages, lang)} className="ml-2">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add language"
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(languages, setLanguages, langInput, setLangInput))}
            />
            <Button type="button" onClick={() => addItem(languages, setLanguages, langInput, setLangInput)} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Domains & Tags</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Domains</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {domains.map((domain) => (
                  <span key={domain} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {domain}
                    <button type="button" onClick={() => removeItem(domains, setDomains, domain)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add domain"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(domains, setDomains, domainInput, setDomainInput))}
                />
                <Button type="button" onClick={() => addItem(domains, setDomains, domainInput, setDomainInput)} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                    {tag}
                    <button type="button" onClick={() => removeItem(tags, setTags, tag)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(tags, setTags, tagInput, setTagInput))}
                />
                <Button type="button" onClick={() => addItem(tags, setTags, tagInput, setTagInput)} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/datasets")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
