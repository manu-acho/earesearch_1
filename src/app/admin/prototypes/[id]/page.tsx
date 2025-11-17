"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus, Loader2 } from "lucide-react";

export default function EditPrototypePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [prototypeId, setPrototypeId] = useState<string>("");
  
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
    featured: false,
  });

  const [stack, setStack] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState("");
  const [useCaseInput, setUseCaseInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const loadPrototype = async () => {
      try {
        const resolvedParams = await params;
        setPrototypeId(resolvedParams.id);
        
        const response = await fetch(`/api/prototypes/${resolvedParams.id}`);
        if (!response.ok) throw new Error("Failed to fetch prototype");
        
        const prototype = await response.json();
        setFormData({
          name: prototype.name,
          slug: prototype.slug,
          description: prototype.description,
          fullDescription: prototype.fullDescription || "",
          status: prototype.status,
          demoUrl: prototype.demoUrl || "",
          repoUrl: prototype.repoUrl || "",
          externalUrl: prototype.externalUrl || "",
          videoUrl: prototype.videoUrl || "",
          featured: prototype.featured || false,
        });
        setStack(prototype.stack || []);
        setUseCases(prototype.useCases || []);
        setTags(prototype.tags || []);
      } catch (err) {
        setError("Failed to load prototype");
      } finally {
        setFetching(false);
      }
    };

    loadPrototype();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/prototypes/${prototypeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, stack, useCases, tags }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update prototype");
      }

      router.push("/admin/prototypes");
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
      <h1 className="text-3xl font-bold mb-6">Edit Prototype</h1>

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
              <label className="block text-sm font-medium mb-2">Description*</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={6}
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status*</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                required
              >
                <option value="prototype">Prototype</option>
                <option value="pilot">Pilot</option>
                <option value="production">Production</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Prototype</label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Demo URL</label>
              <Input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Repository URL</label>
              <Input
                type="url"
                value={formData.repoUrl}
                onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">External URL</label>
              <Input
                type="url"
                value={formData.externalUrl}
                onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video URL</label>
              <Input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {stack.map((tech) => (
              <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                {tech}
                <button type="button" onClick={() => removeItem(stack, setStack, tech)} className="ml-2">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add technology (e.g., Next.js, Python)"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(stack, setStack, stackInput, setStackInput))}
            />
            <Button type="button" onClick={() => addItem(stack, setStack, stackInput, setStackInput)} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
          
          <div className="space-y-2 mb-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                <span className="text-sm">{useCase}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(useCases, setUseCases, useCase)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add use case"
              value={useCaseInput}
              onChange={(e) => setUseCaseInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(useCases, setUseCases, useCaseInput, setUseCaseInput))}
            />
            <Button type="button" onClick={() => addItem(useCases, setUseCases, useCaseInput, setUseCaseInput)} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          
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
            onClick={() => router.push("/admin/prototypes")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
