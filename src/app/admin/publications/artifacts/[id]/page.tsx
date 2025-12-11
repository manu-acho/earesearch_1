"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus, Loader2 } from "lucide-react";

export default function EditArtifactPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [artifactId, setArtifactId] = useState<string>("");
  
  const [formData, setFormData] = useState({
    title: "",
    type: "video" as "interview" | "video" | "fieldnotes" | "dataset" | "image" | "audio" | "course",
    description: "",
    fileUrl: "",
    externalUrl: "",
    youtubeId: "",
    gammaEmbedId: "",
    metadata: "",
    collectionDate: "",
    relatedPaper: "",
    thumbnail: "",
    fileSize: "",
    featured: false,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const loadArtifact = async () => {
      try {
        const resolvedParams = await params;
        setArtifactId(resolvedParams.id);
        
        const response = await fetch(`/api/publications/artifacts/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch artifact");
        }
        
        const artifact = await response.json();
        setFormData({
          title: artifact.title,
          type: artifact.type,
          description: artifact.description,
          fileUrl: artifact.fileUrl || "",
          externalUrl: artifact.externalUrl || "",
          youtubeId: artifact.youtubeId || "",
          gammaEmbedId: artifact.gammaEmbedId || "",
          metadata: artifact.metadata ? JSON.stringify(artifact.metadata, null, 2) : "",
          collectionDate: artifact.collectionDate ? new Date(artifact.collectionDate).toISOString().split('T')[0] : "",
          relatedPaper: artifact.relatedPaper?.toString() || "",
          thumbnail: artifact.thumbnail || "",
          fileSize: artifact.fileSize?.toString() || "",
          featured: artifact.featured || false,
        });
        setTags(artifact.tags || []);
      } catch (err) {
        setError("Failed to load artifact");
      } finally {
        setFetching(false);
      }
    };

    loadArtifact();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/publications/artifacts/${artifactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags,
          relatedPaper: formData.relatedPaper ? parseInt(formData.relatedPaper) : null,
          fileSize: formData.fileSize ? parseInt(formData.fileSize) : null,
          collectionDate: formData.collectionDate || null,
          metadata: formData.metadata || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update artifact");
      }

      router.push("/publications?tab=artifacts");
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

  if (fetching) {
    return (
      <div className="container py-12 max-w-3xl">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Edit Research Artifact</h1>
        <p className="text-muted-foreground">
          Update research artifact details, files, and metadata.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Artifact Details</h2>

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
                placeholder="Interview with Smallholder Farmer in Kiambu County"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="video">Video</option>
                <option value="interview">Interview</option>
                <option value="fieldnotes">Field Notes</option>
                <option value="dataset">Dataset</option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
                <option value="course">Course</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Detailed description of the artifact..."
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
                Featured Artifact
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">File & URLs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Provide at least one: File URL, External URL, YouTube ID, or Gamma Embed ID
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                File URL
              </label>
              <Input
                type="url"
                value={formData.fileUrl}
                onChange={(e) =>
                  setFormData({ ...formData, fileUrl: e.target.value })
                }
                placeholder="https://storage.example.com/artifacts/file.mp4"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Direct link to hosted file
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                External URL
              </label>
              <Input
                type="url"
                value={formData.externalUrl}
                onChange={(e) =>
                  setFormData({ ...formData, externalUrl: e.target.value })
                }
                placeholder="https://external-platform.com/artifact"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Link to artifact on external platform
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                YouTube Video ID
              </label>
              <Input
                value={formData.youtubeId}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeId: e.target.value })
                }
                placeholder="dQw4w9WgXcQ"
                maxLength={11}
              />
              <p className="text-xs text-muted-foreground mt-1">
                11-character ID from YouTube URL (e.g., from youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Gamma Embed ID
              </label>
              <Input
                value={formData.gammaEmbedId}
                onChange={(e) =>
                  setFormData({ ...formData, gammaEmbedId: e.target.value })
                }
                placeholder="31w35vrv6wj0n7m"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Embed ID from Gamma URL (e.g., from gamma.app/embed/<strong>31w35vrv6wj0n7m</strong>)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Thumbnail URL
              </label>
              <Input
                type="url"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                placeholder="https://example.com/thumbnail.jpg"
              />
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
                placeholder="5120"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Collection Date
              </label>
              <Input
                type="date"
                value={formData.collectionDate}
                onChange={(e) =>
                  setFormData({ ...formData, collectionDate: e.target.value })
                }
              />
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

            <div>
              <label className="block text-sm font-medium mb-2">
                Metadata (JSON)
              </label>
              <textarea
                value={formData.metadata}
                onChange={(e) =>
                  setFormData({ ...formData, metadata: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                placeholder='{"location": "Kiambu County", "participants": 5, "duration": "45 minutes"}'
              />
              <p className="text-xs text-muted-foreground mt-1">
                Optional: Additional metadata in JSON format
              </p>
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
                  placeholder="e.g., interview, field-research, kenya"
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
                      onClick={() => removeTag(tag)}
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/publications?tab=artifacts")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
