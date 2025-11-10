"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export default function NewSocialPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    platform: "linkedin" as "linkedin" | "twitter" | "medium" | "youtube",
    postUrl: "",
    excerpt: "",
    publishedDate: "",
    engagement: "",
    featured: false,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/publications/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags,
          engagement: formData.engagement
            ? parseInt(formData.engagement)
            : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create social post");
      }

      router.push("/publications?tab=social");
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

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Add Social Media Post</h1>
        <p className="text-muted-foreground">
          Track and showcase social media content from LinkedIn, Twitter, Medium, and YouTube.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Post Details</h2>

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
                placeholder="Announcing New Voice Market Prices Prototype"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Platform <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.platform}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    platform: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="medium">Medium</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Post URL <span className="text-red-500">*</span>
              </label>
              <Input
                type="url"
                value={formData.postUrl}
                onChange={(e) =>
                  setFormData({ ...formData, postUrl: e.target.value })
                }
                required
                placeholder="https://linkedin.com/posts/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Brief summary or key highlights from the post..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Published Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={formData.publishedDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishedDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Engagement Count
              </label>
              <Input
                type="number"
                value={formData.engagement}
                onChange={(e) =>
                  setFormData({ ...formData, engagement: e.target.value })
                }
                placeholder="125"
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total likes, shares, comments, or views
              </p>
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
                Featured Post
              </label>
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
                  placeholder="e.g., research, prototype, announcement"
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
            {loading ? "Creating..." : "Create Social Post"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/publications?tab=social")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
