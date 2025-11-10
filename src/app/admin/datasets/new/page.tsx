"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export default function NewDatasetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    relatedPaper: "",
    featured: false,
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [domainInput, setDomainInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [stats, setStats] = useState<Record<string, any>>({});
  const [statsKey, setStatsKey] = useState("");
  const [statsValue, setStatsValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/datasets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          languages,
          domains,
          tags,
          stats: Object.keys(stats).length > 0 ? stats : null,
          relatedPaper: formData.relatedPaper ? parseInt(formData.relatedPaper) : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create dataset");
      }

      router.push("/datasets");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages([...languages, languageInput.trim()]);
      setLanguageInput("");
    }
  };

  const addDomain = () => {
    if (domainInput.trim() && !domains.includes(domainInput.trim())) {
      setDomains([...domains, domainInput.trim()]);
      setDomainInput("");
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addStat = () => {
    if (statsKey.trim() && statsValue.trim()) {
      const value = isNaN(Number(statsValue)) ? statsValue : Number(statsValue);
      setStats({ ...stats, [statsKey.trim()]: value });
      setStatsKey("");
      setStatsValue("");
    }
  };

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Add New Dataset</h1>
        <p className="text-muted-foreground">
          Add a new research dataset or corpus to the collection.
        </p>
      </div>

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
              <label className="block text-sm font-medium mb-2">
                Dataset Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Kiswahili Agriculture Voice Corpus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                placeholder="kiswahili-agriculture-voice-corpus"
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers, and hyphens only"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL-friendly identifier (lowercase, hyphens only)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Brief description of the dataset (shown in cards)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={6}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Detailed description with Markdown support..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Size
                </label>
                <Input
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  placeholder="e.g., 2.5 GB, 10,000 samples"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Format
                </label>
                <Input
                  value={formData.format}
                  onChange={(e) =>
                    setFormData({ ...formData, format: e.target.value })
                  }
                  placeholder="e.g., JSON, CSV, Audio (WAV)"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Dataset
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Licensing & Access</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                License <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.license}
                onChange={(e) =>
                  setFormData({ ...formData, license: e.target.value })
                }
                required
                placeholder="e.g., CC BY 4.0, MIT, Apache 2.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Version
              </label>
              <Input
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
                placeholder="1.0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Download URL
              </label>
              <Input
                type="url"
                value={formData.downloadUrl}
                onChange={(e) =>
                  setFormData({ ...formData, downloadUrl: e.target.value })
                }
                placeholder="https://storage.example.com/datasets/corpus.zip"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Documentation URL
              </label>
              <Input
                type="url"
                value={formData.documentationUrl}
                onChange={(e) =>
                  setFormData({ ...formData, documentationUrl: e.target.value })
                }
                placeholder="https://docs.example.com/dataset"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                DOI
              </label>
              <Input
                value={formData.doi}
                onChange={(e) =>
                  setFormData({ ...formData, doi: e.target.value })
                }
                placeholder="10.1234/example.doi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Citation
              </label>
              <textarea
                value={formData.citation}
                onChange={(e) =>
                  setFormData({ ...formData, citation: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Preferred citation format..."
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Classification</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Languages
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addLanguage();
                    }
                  }}
                  placeholder="e.g., Kiswahili, English"
                />
                <Button type="button" onClick={addLanguage} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => setLanguages(languages.filter((l) => l !== lang))}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Domains
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addDomain();
                    }
                  }}
                  placeholder="e.g., agriculture, voice, NLP"
                />
                <Button type="button" onClick={addDomain} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <span
                    key={domain}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {domain}
                    <button
                      type="button"
                      onClick={() => setDomains(domains.filter((d) => d !== domain))}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="e.g., speech, corpus, open-source"
                />
                <Button type="button" onClick={addTag} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Add Statistics
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={statsKey}
                  onChange={(e) => setStatsKey(e.target.value)}
                  placeholder="Key (e.g., samples, hours)"
                  className="flex-1"
                />
                <Input
                  value={statsValue}
                  onChange={(e) => setStatsValue(e.target.value)}
                  placeholder="Value (e.g., 10000, 50.5)"
                  className="flex-1"
                />
                <Button type="button" onClick={addStat} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {Object.entries(stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded"
                  >
                    <span className="font-medium">{key}:</span>
                    <span className="flex-1">{value}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newStats = { ...stats };
                        delete newStats[key];
                        setStats(newStats);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Related Paper ID
              </label>
              <Input
                type="number"
                value={formData.relatedPaper}
                onChange={(e) =>
                  setFormData({ ...formData, relatedPaper: e.target.value })
                }
                placeholder="1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                ID of related working paper or publication
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Creating..." : "Create Dataset"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/datasets")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
