"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

export default function NewExternalPaperPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    year: new Date().getFullYear(),
    abstract: "",
    downloadUrl: "",
    sourceWebsite: "",
    doi: "",
    category: "",
    notes: "",
    featured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/publications/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year.toString()),
          tags,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add paper");
      }

      // Success - redirect back to publications page
      router.push("/publications?tab=library");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add paper");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8 -ml-4" asChild>
            <Link href="/publications">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Publications
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Add External Paper</h1>
            <p className="text-muted-foreground">
              Add a paper from another researcher to your library
            </p>
          </div>

          {/* Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Paper Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Voice-First Technologies for African Agriculture"
                />
              </div>

              {/* Authors */}
              <div>
                <label htmlFor="authors" className="block text-sm font-medium mb-2">
                  Authors *
                </label>
                <Input
                  id="authors"
                  name="authors"
                  type="text"
                  required
                  value={formData.authors}
                  onChange={handleChange}
                  placeholder="e.g., John Doe, Jane Smith"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate multiple authors with commas
                </p>
              </div>

              {/* Year and Category */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium mb-2">
                    Year *
                  </label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <Input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Voice AI, Agriculture"
                  />
                </div>
              </div>

              {/* Download URL */}
              <div>
                <label htmlFor="downloadUrl" className="block text-sm font-medium mb-2">
                  Download URL *
                </label>
                <Input
                  id="downloadUrl"
                  name="downloadUrl"
                  type="url"
                  required
                  value={formData.downloadUrl}
                  onChange={handleChange}
                  placeholder="https://arxiv.org/pdf/..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Link to where the paper can be downloaded
                </p>
              </div>

              {/* Source Website and DOI */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sourceWebsite"
                    className="block text-sm font-medium mb-2"
                  >
                    Source Website
                  </label>
                  <Input
                    id="sourceWebsite"
                    name="sourceWebsite"
                    type="text"
                    value={formData.sourceWebsite}
                    onChange={handleChange}
                    placeholder="e.g., arXiv, ResearchGate"
                  />
                </div>
                <div>
                  <label htmlFor="doi" className="block text-sm font-medium mb-2">
                    DOI
                  </label>
                  <Input
                    id="doi"
                    name="doi"
                    type="text"
                    value={formData.doi}
                    onChange={handleChange}
                    placeholder="10.1234/example"
                  />
                </div>
              </div>

              {/* Abstract */}
              <div>
                <label htmlFor="abstract" className="block text-sm font-medium mb-2">
                  Abstract
                </label>
                <textarea
                  id="abstract"
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none"
                  placeholder="Brief summary of the paper..."
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                  Personal Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none"
                  placeholder="Why is this paper relevant to your research?"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add a tag..."
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-input"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Mark as featured
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 glossy-blue glossy-blue-hover"
                >
                  {isSubmitting ? "Adding Paper..." : "Add Paper"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
