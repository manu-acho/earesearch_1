"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus, Loader2, Trash2 } from "lucide-react";

type ResearchQuestion = {
  id: number;
  question: string;
  description: string;
};

type Milestone = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  completedDate?: string;
};

type TeamMember = {
  name: string;
  role: string;
};

export default function EditResearchProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    status: "active" as "active" | "completed" | "on-hold",
    researchType: "field-research",
    methodology: "",
    fundingStatus: "seeking-funding",
    fundingSource: "",
    startDate: "",
    estimatedCompletion: "",
    references: "",
    featured: false,
  });

  const [researchQuestions, setResearchQuestions] = useState<ResearchQuestion[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [geographicFocus, setGeographicFocus] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  const [newQuestion, setNewQuestion] = useState({ question: "", description: "" });
  const [newMilestone, setNewMilestone] = useState({ title: "", description: "", dueDate: "", status: "planned" });
  const [newMember, setNewMember] = useState({ name: "", role: "" });
  const [geoInput, setGeoInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const resolvedParams = await params;
        setProjectId(resolvedParams.id);
        
        const response = await fetch(`/api/research-themes/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        
        const project = await response.json();
        setFormData({
          title: project.title,
          slug: project.slug,
          shortDescription: project.shortDescription,
          fullDescription: project.fullDescription || "",
          status: project.status,
          researchType: project.researchType || "field-research",
          methodology: project.methodology || "",
          fundingStatus: project.fundingStatus || "seeking-funding",
          fundingSource: project.fundingSource || "",
          startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
          estimatedCompletion: project.estimatedCompletion ? new Date(project.estimatedCompletion).toISOString().split('T')[0] : "",
          references: project.references || "",
          featured: project.featured || false,
        });
        setResearchQuestions(project.researchQuestions || []);
        setMilestones(project.milestones || []);
        setTeamMembers(project.teamMembers || []);
        setGeographicFocus(project.geographicFocus || []);
        setTags(project.tags || []);
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setFetching(false);
      }
    };

    loadProject();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/research-themes/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          researchQuestions,
          milestones,
          teamMembers,
          geographicFocus,
          tags,
          startDate: formData.startDate || null,
          estimatedCompletion: formData.estimatedCompletion || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update project");
      }

      router.push("/admin/research-themes");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addResearchQuestion = () => {
    if (newQuestion.question.trim()) {
      setResearchQuestions([...researchQuestions, {
        id: researchQuestions.length + 1,
        ...newQuestion
      }]);
      setNewQuestion({ question: "", description: "" });
    }
  };

  const removeResearchQuestion = (id: number) => {
    setResearchQuestions(researchQuestions.filter(q => q.id !== id));
  };

  const addMilestone = () => {
    if (newMilestone.title.trim()) {
      setMilestones([...milestones, {
        id: milestones.length + 1,
        ...newMilestone
      }]);
      setNewMilestone({ title: "", description: "", dueDate: "", status: "planned" });
    }
  };

  const removeMilestone = (id: number) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const addTeamMember = () => {
    if (newMember.name.trim()) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember({ name: "", role: "" });
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const addGeo = () => {
    if (geoInput.trim() && !geographicFocus.includes(geoInput.trim())) {
      setGeographicFocus([...geographicFocus, geoInput.trim()]);
      setGeoInput("");
    }
  };

  const removeGeo = (geo: string) => {
    setGeographicFocus(geographicFocus.filter(g => g !== geo));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
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
      <h1 className="text-3xl font-bold mb-6">Edit Research Project</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title*</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                placeholder="lowercase-with-hyphens"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Short Description*</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status*</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  required
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Research Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.researchType}
                  onChange={(e) => setFormData({ ...formData, researchType: e.target.value })}
                >
                  <option value="systematic-review">Systematic Review</option>
                  <option value="empirical-study">Empirical Study</option>
                  <option value="field-research">Field Research</option>
                  <option value="theoretical">Theoretical</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
            </div>
          </div>
        </Card>

        {/* Research Questions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Research Questions</h2>
          
          <div className="space-y-4 mb-4">
            {researchQuestions.map((rq) => (
              <div key={rq.id} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">RQ{rq.id}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResearchQuestion(rq.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mb-1">{rq.question}</p>
                <p className="text-xs text-gray-600">{rq.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Research question"
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newQuestion.description}
              onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
            />
            <Button type="button" onClick={addResearchQuestion} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Research Question
            </Button>
          </div>
        </Card>

        {/* Milestones */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Milestones</h2>
          
          <div className="space-y-4 mb-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {milestone.dueDate} | Status: {milestone.status}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMilestone(milestone.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Milestone title"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newMilestone.description}
              onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                value={newMilestone.dueDate}
                onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={newMilestone.status}
                onChange={(e) => setNewMilestone({ ...newMilestone, status: e.target.value })}
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
            <Button type="button" onClick={addMilestone} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Milestone
            </Button>
          </div>
        </Card>

        {/* Team Members */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          
          <div className="space-y-2 mb-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                <div>
                  <span className="font-medium">{member.name}</span>
                  <span className="text-sm text-gray-600 ml-2">({member.role})</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTeamMember(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            />
            <Button type="button" onClick={addTeamMember} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Methodology & References */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Methodology & References</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Methodology</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                value={formData.methodology}
                onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">References</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                value={formData.references}
                onChange={(e) => setFormData({ ...formData, references: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Geographic Focus & Tags */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Geographic Focus & Tags</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Geographic Focus</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {geographicFocus.map((geo) => (
                  <span key={geo} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {geo}
                    <button type="button" onClick={() => removeGeo(geo)} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add location"
                  value={geoInput}
                  onChange={(e) => setGeoInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGeo())}
                />
                <Button type="button" onClick={addGeo} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-2">
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
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Funding & Timeline */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Funding & Timeline</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Funding Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.fundingStatus}
                  onChange={(e) => setFormData({ ...formData, fundingStatus: e.target.value })}
                >
                  <option value="funded">Funded</option>
                  <option value="seeking-funding">Seeking Funding</option>
                  <option value="self-funded">Self-Funded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Funding Source</label>
                <Input
                  value={formData.fundingSource}
                  onChange={(e) => setFormData({ ...formData, fundingSource: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Estimated Completion</label>
                <Input
                  type="date"
                  value={formData.estimatedCompletion}
                  onChange={(e) => setFormData({ ...formData, estimatedCompletion: e.target.value })}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Submit Buttons */}
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
            onClick={() => router.push("/admin/research-themes")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
