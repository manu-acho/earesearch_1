"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export default function NewLiteratureReviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    topic: "",
    summary: "",
    fullReview: "",
    papersCovered: "",
    pdfUrl: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [keyFindings, setKeyFindings] = useState<string[]>([]);
  const [findingInput, setFindingInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/publications/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags,
          keyFindings,
          papersCovered: formData.papersCovered
            ? parseInt(formData.papersCovered)
            : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create literature review");
      }

      router.push("/publications?tab=reviews");
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

  const addFinding = () => {
    if (findingInput.trim() && !keyFindings.includes(findingInput.trim())) {
      setKeyFindings([...keyFindings, findingInput.trim()]);
      setFindingInput("");
    }
  };

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Add Literature Review</h1>
        <p className="text-muted-foreground">
          Create a comprehensive literature review synthesizing research on a specific topic.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Review Details</h2>

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
                placeholder="Voice Technology in African Agriculture: A Review"
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
                placeholder="voice-tech-african-agriculture-review"
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers, and hyphens only"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL-friendly identifier (lowercase, hyphens only)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Topic <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                required
                placeholder="Voice-First Interfaces, ASR, Agricultural Technology"
              />
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
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Brief overview of the review (shown in cards)..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.fullReview}
                onChange={(e) =>
                  setFormData({ ...formData, fullReview: e.target.value })
                }
                required
                rows={12}
                className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                placeholder="Complete literature review content. Supports Markdown formatting..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use Markdown for formatting (headings, lists, links, etc.)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Papers Covered
              </label>
              <Input
                type="number"
                value={formData.papersCovered}
                onChange={(e) =>
                  setFormData({ ...formData, papersCovered: e.target.value })
                }
                placeholder="25"
                min="1"
                max="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                PDF URL (Optional)
              </label>
              <Input
                type="url"
                value={formData.pdfUrl}
                onChange={(e) =>
                  setFormData({ ...formData, pdfUrl: e.target.value })
                }
                placeholder="https://storage.example.com/reviews/review.pdf"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Optional: Link to downloadable PDF version
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Key Findings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Add Key Findings
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={findingInput}
                  onChange={(e) => setFindingInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFinding();
                    }
                  }}
                  placeholder="e.g., Voice interfaces improve accessibility for low-literacy users"
                />
                <Button type="button" onClick={addFinding} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {keyFindings.map((finding, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-gray-50 rounded"
                  >
                    <span className="text-sm font-medium text-primary min-w-6">
                      {index + 1}.
                    </span>
                    <span className="flex-1 text-sm">{finding}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setKeyFindings(
                          keyFindings.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Add Tags
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
                  placeholder="e.g., literature-review, voice-tech, agriculture"
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

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Creating..." : "Create Literature Review"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/publications?tab=reviews")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
