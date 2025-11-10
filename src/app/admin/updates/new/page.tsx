"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewUpdatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [updateType, setUpdateType] = useState("research-update");
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  
  const [newTag, setNewTag] = useState("");

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      slug,
      summary,
      content,
      author,
      date,
      location: location || null,
      updateType,
      tags,
      featured,
      published,
    };

    try {
      const response = await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/updates");
      } else {
        alert("Failed to create update");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/updates" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Updates</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Add New Update</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Field Notes: Kiambu Coffee Farmers October 2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="field-notes-kiambu-october-2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Summary * (brief overview)</label>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[100px]"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="A brief summary of this update..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Content * (supports Markdown)</label>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[400px] font-mono text-sm"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full update content here. You can use Markdown formatting..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author *</label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date *</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location (optional)</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Kiambu, Kenya"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Update Type</label>
                  <select
                    className="w-full p-3 border rounded-md"
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value)}
                  >
                    <option value="field-note">Field Note</option>
                    <option value="research-update">Research Update</option>
                    <option value="announcement">Announcement</option>
                    <option value="blog">Blog Post</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="pl-3 pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Feature this update</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
                </div>
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Link href="/updates">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Create Update"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
