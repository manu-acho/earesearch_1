"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus, Loader2 } from "lucide-react";

export default function EditWorkingPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [paperId, setPaperId] = useState<string>("");
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    abstract: "",
    authors: [] as string[],
    coAuthors: [] as string[],
    version: "v1.0",
    status: "draft" as "draft" | "under-review" | "revised" | "completed",
    pdfUrl: "",
    fileSize: 0,
    researchArea: "",
    publishedDate: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [coAuthorInput, setCoAuthorInput] = useState("");

  useEffect(() => {
    const loadPaper = async () => {
      try {
        const resolvedParams = await params;
        setPaperId(resolvedParams.id);
        
        const response = await fetch(`/api/publications/working/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch paper");
        }
        
        const paper = await response.json();
        setFormData({
          title: paper.title,
          slug: paper.slug,
          abstract: paper.abstract,
          authors: paper.authors || [],
          coAuthors: paper.coAuthors || [],
          version: paper.version || "v1.0",
          status: paper.status,
          pdfUrl: paper.pdfUrl || "",
          fileSize: paper.fileSize || 0,
          researchArea: paper.researchArea || "",
          publishedDate: paper.publishedDate ? new Date(paper.publishedDate).toISOString().split('T')[0] : "",
        });
        setTags(paper.tags || []);
        setKeywords(paper.keywords || []);
      } catch (err) {
        setError("Failed to load paper");
      } finally {
        setFetching(false);
      }
    };

    loadPaper();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/publications/working/${paperId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags,
          keywords,
          publishedDate: formData.publishedDate || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update working paper");
      }

      router.push("/publications?tab=working");
      router.refresh();
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

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const addAuthor = () => {
    if (authorInput.trim() && !formData.authors.includes(authorInput.trim())) {
      setFormData({
        ...formData,
        authors: [...formData.authors, authorInput.trim()]
      });
      setAuthorInput("");
    }
  };

  const removeAuthor = (author: string) => {
    setFormData({
      ...formData,
      authors: formData.authors.filter((a) => a !== author)
    });
  };

  const addCoAuthor = () => {
    if (coAuthorInput.trim() && !formData.coAuthors.includes(coAuthorInput.trim())) {
      setFormData({
        ...formData,
        coAuthors: [...formData.coAuthors, coAuthorInput.trim()]
      });
      setCoAuthorInput("");
    }
  };

  const removeCoAuthor = (coAuthor: string) => {
    setFormData({
      ...formData,
      coAuthors: formData.coAuthors.filter((ca) => ca !== coAuthor)
    });
  };

  if (fetching) {
    return (
      <div className="container py-12 max-w-3xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Edit Working Paper</h1>
        <p className="text-muted-foreground">
          Update paper metadata, version, status, and content.
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
                Title *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Paper title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Slug (URL-friendly) *
              </label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                placeholder="paper-url-slug"
                pattern="[a-z0-9-]+"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lowercase letters, numbers, and hyphens only
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Abstract *
              </label>
              <textarea
                className="w-full min-h-[150px] px-3 py-2 border rounded-md"
                value={formData.abstract}
                onChange={(e) =>
                  setFormData({ ...formData, abstract: e.target.value })
                }
                required
                placeholder="Paper abstract..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Authors *
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  placeholder="Author name"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAuthor())}
                />
                <Button type="button" onClick={addAuthor} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.authors.map((author) => (
                  <span
                    key={author}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {author}
                    <button
                      type="button"
                      onClick={() => removeAuthor(author)}
                      className="hover:text-primary/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Co-Authors (Optional)
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  value={coAuthorInput}
                  onChange={(e) => setCoAuthorInput(e.target.value)}
                  placeholder="Co-author name"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCoAuthor())}
                />
                <Button type="button" onClick={addCoAuthor} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.coAuthors.map((coAuthor) => (
                  <span
                    key={coAuthor}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {coAuthor}
                    <button
                      type="button"
                      onClick={() => removeCoAuthor(coAuthor)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Version
                </label>
                <Input
                  type="text"
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  placeholder="v1.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Status *
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as typeof formData.status,
                    })
                  }
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="under-review">Under Review</option>
                  <option value="revised">Revised</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Research Area
              </label>
              <Input
                type="text"
                value={formData.researchArea}
                onChange={(e) =>
                  setFormData({ ...formData, researchArea: e.target.value })
                }
                placeholder="e.g., Voice-First Interfaces"
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
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">PDF & Files</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                PDF URL
              </label>
              <Input
                type="url"
                value={formData.pdfUrl}
                onChange={(e) =>
                  setFormData({ ...formData, pdfUrl: e.target.value })
                }
                placeholder="https://storage.example.com/papers/paper.pdf"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                File Size (bytes)
              </label>
              <Input
                type="number"
                value={formData.fileSize}
                onChange={(e) =>
                  setFormData({ ...formData, fileSize: parseInt(e.target.value) || 0 })
                }
                placeholder="2048000"
              />
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
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Add a keyword"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                />
                <Button type="button" onClick={addKeyword} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="hover:text-green-500"
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
          <Button
            type="submit"
            disabled={loading}
            className="glossy-blue glossy-blue-hover"
          >
            {loading ? "Updating..." : "Update Paper"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
