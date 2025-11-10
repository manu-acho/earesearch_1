"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export default function NewPrototypePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    fullDescription: "",
    status: "prototype" as "prototype" | "pilot" | "production" | "archived",
    demoUrl: "",
    repoUrl: "",
    externalUrl: "",
    videoUrl: "",
    relatedPaper: "",
    relatedDataset: "",
    featured: false,
  });

  const [stack, setStack] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState("");
  const [useCases, setUseCases] = useState<string[]>([]);
  const [useCaseInput, setUseCaseInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [screenshotInput, setScreenshotInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/prototypes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          stack,
          useCases,
          tags,
          screenshots,
          relatedPaper: formData.relatedPaper ? parseInt(formData.relatedPaper) : null,
          relatedDataset: formData.relatedDataset || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create prototype");
      }

      router.push("/prototypes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addStack = () => {
    if (stackInput.trim() && !stack.includes(stackInput.trim())) {
      setStack([...stack, stackInput.trim()]);
      setStackInput("");
    }
  };

  const addUseCase = () => {
    if (useCaseInput.trim() && !useCases.includes(useCaseInput.trim())) {
      setUseCases([...useCases, useCaseInput.trim()]);
      setUseCaseInput("");
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addScreenshot = () => {
    if (screenshotInput.trim() && !screenshots.includes(screenshotInput.trim())) {
      setScreenshots([...screenshots, screenshotInput.trim()]);
      setScreenshotInput("");
    }
  };

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Add New Prototype</h1>
        <p className="text-muted-foreground">
          Add a new prototype to showcase your experimental systems and research implementations.
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
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Voice Market Prices"
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
                placeholder="voice-market-prices"
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers, and hyphens only"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL-friendly identifier (lowercase, hyphens only)
              </p>
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
                <option value="prototype">Prototype</option>
                <option value="pilot">Pilot</option>
                <option value="production">Production</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="A brief overview of the prototype (shown in cards)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Description
              </label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) =>
                  setFormData({ ...formData, fullDescription: e.target.value })
                }
                rows={6}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Detailed description, features, implementation notes..."
              />
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
                Featured Prototype
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Links & Resources</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Demo URL
              </label>
              <Input
                type="url"
                value={formData.demoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, demoUrl: e.target.value })
                }
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Repository URL
              </label>
              <Input
                type="url"
                value={formData.repoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, repoUrl: e.target.value })
                }
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                External Project URL
              </label>
              <Input
                type="url"
                value={formData.externalUrl}
                onChange={(e) =>
                  setFormData({ ...formData, externalUrl: e.target.value })
                }
                placeholder="https://project-website.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Video Demo URL
              </label>
              <Input
                type="url"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Technical Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tech Stack
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addStack();
                    }
                  }}
                  placeholder="e.g., Next.js, Python, PostgreSQL"
                />
                <Button type="button" onClick={addStack} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => setStack(stack.filter((t) => t !== tech))}
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
                Use Cases
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={useCaseInput}
                  onChange={(e) => setUseCaseInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addUseCase();
                    }
                  }}
                  placeholder="e.g., Smallholder farmers, Market vendors"
                />
                <Button type="button" onClick={addUseCase} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {useCase}
                    <button
                      type="button"
                      onClick={() =>
                        setUseCases(useCases.filter((u) => u !== useCase))
                      }
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

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
                  placeholder="e.g., voice-interface, agriculture, kenya"
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
                Screenshot URLs
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  type="url"
                  value={screenshotInput}
                  onChange={(e) => setScreenshotInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addScreenshot();
                    }
                  }}
                  placeholder="https://example.com/screenshot.png"
                />
                <Button type="button" onClick={addScreenshot} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {screenshots.map((url) => (
                  <div
                    key={url}
                    className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded"
                  >
                    <span className="flex-1 truncate">{url}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setScreenshots(screenshots.filter((s) => s !== url))
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
          <h2 className="text-xl font-semibold mb-4">Related Content</h2>

          <div className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium mb-2">
                Related Dataset Slug
              </label>
              <Input
                value={formData.relatedDataset}
                onChange={(e) =>
                  setFormData({ ...formData, relatedDataset: e.target.value })
                }
                placeholder="kiswahili-agriculture-corpus"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Slug of related dataset
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Creating..." : "Create Prototype"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/prototypes")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
