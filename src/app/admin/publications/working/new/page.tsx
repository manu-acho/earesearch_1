"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export default function NewWorkingPaperPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    abstract: "",
    authors: "",
    coAuthors: "",
    version: "1.0",
    status: "draft" as "draft" | "under-review" | "revised" | "completed",
    pdfUrl: "",
    fileSize: "",
    researchArea: "",
    publishedDate: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/publications/working", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags,
          keywords,
          fileSize: formData.fileSize ? parseInt(formData.fileSize) : null,
          publishedDate: formData.publishedDate || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create working paper");
      }

      router.push("/publications?tab=working");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Add Working Paper</h1>
        <p className="text-muted-foreground">
          Upload a new working paper with version control and status tracking.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Paper Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Voice-First ASR for Agricultural Markets"
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
                placeholder="voice-first-asr-agricultural-markets"
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers, and hyphens only"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL-friendly identifier (lowercase, hyphens only)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Abstract <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.abstract}
                onChange={(e) =>
                  setFormData({ ...formData, abstract: e.target.value })
                }
                required
                rows={6}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Brief summary of the research paper..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Lead Author(s) <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.authors}
                onChange={(e) =>
                  setFormData({ ...formData, authors: e.target.value })
                }
                required
                placeholder="Jane Doe, John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Co-Authors
              </label>
              <Input
                value={formData.coAuthors}
                onChange={(e) =>
                  setFormData({ ...formData, coAuthors: e.target.value })
                }
                placeholder="Additional contributors..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Version <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  required
                  placeholder="1.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="under-review">Under Review</option>
                  <option value="revised">Revised</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">File & Research Area</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                PDF URL <span className="text-red-500">*</span>
              </label>
              <Input
                type="url"
                value={formData.pdfUrl}
                onChange={(e) =>
                  setFormData({ ...formData, pdfUrl: e.target.value })
                }
                required
                placeholder="https://storage.example.com/papers/paper.pdf"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload PDF to cloud storage first, then paste URL here
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                File Size (KB)
              </label>
              <Input
                type="number"
                value={formData.fileSize}
                onChange={(e) =>
                  setFormData({ ...formData, fileSize: e.target.value })
                }
                placeholder="2048"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Research Area
              </label>
              <Input
                value={formData.researchArea}
                onChange={(e) =>
                  setFormData({ ...formData, researchArea: e.target.value })
                }
                placeholder="e.g., Voice Technology, Agricultural Economics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Published Date
              </label>
              <Input
                type="date"
                value={formData.publishedDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishedDate: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty if not yet published
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tags & Keywords</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
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
                  placeholder="e.g., voice-technology, agriculture, kenya"
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

            <div>
              <label className="block text-sm font-medium mb-2">
                Keywords
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  placeholder="e.g., ASR, NLP, zero-shot learning"
                />
                <Button type="button" onClick={addKeyword} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() =>
                        setKeywords(keywords.filter((k) => k !== keyword))
                      }
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

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Creating..." : "Create Working Paper"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/publications?tab=working")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
