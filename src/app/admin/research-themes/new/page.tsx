"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ResearchQuestion {
  id: string;
  question: string;
  description: string;
}

interface Finding {
  rqId: string;
  findings: string[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "not-started" | "in-progress" | "completed";
  completedDate: string;
}

interface TeamMember {
  name: string;
  role: string;
}

export default function NewResearchThemePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Basic fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [researchType, setResearchType] = useState("systematic-review");
  const [methodology, setMethodology] = useState("");
  const [fundingStatus, setFundingStatus] = useState("seeking-funding");
  const [fundingSource, setFundingSource] = useState("");
  const [startDate, setStartDate] = useState("");
  const [estimatedCompletion, setEstimatedCompletion] = useState("");
  const [featured, setFeatured] = useState(false);
  
  // Array fields
  const [researchQuestions, setResearchQuestions] = useState<ResearchQuestion[]>([
    { id: "rq1", question: "", description: "" }
  ]);
  const [keyFindings, setKeyFindings] = useState<Finding[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "m1", title: "", description: "", dueDate: "", status: "not-started", completedDate: "" }
  ]);
  const [geographicFocus, setGeographicFocus] = useState<string[]>(["Sub Saharan Africa"]);
  const [tags, setTags] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "", role: "" }
  ]);
  const [references, setReferences] = useState("");
  
  // Temp input states
  const [newGeoFocus, setNewGeoFocus] = useState("");
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

  const addResearchQuestion = () => {
    const newId = `rq${researchQuestions.length + 1}`;
    setResearchQuestions([...researchQuestions, { id: newId, question: "", description: "" }]);
  };

  const removeResearchQuestion = (index: number) => {
    setResearchQuestions(researchQuestions.filter((_, i) => i !== index));
  };

  const updateResearchQuestion = (index: number, field: keyof ResearchQuestion, value: string) => {
    const updated = [...researchQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setResearchQuestions(updated);
  };

  const addMilestone = () => {
    const newId = `m${milestones.length + 1}`;
    setMilestones([...milestones, { 
      id: newId, 
      title: "", 
      description: "", 
      dueDate: "", 
      status: "not-started", 
      completedDate: "" 
    }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "" }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  const addGeographicFocus = () => {
    if (newGeoFocus.trim() && !geographicFocus.includes(newGeoFocus.trim())) {
      setGeographicFocus([...geographicFocus, newGeoFocus.trim()]);
      setNewGeoFocus("");
    }
  };

  const removeGeographicFocus = (index: number) => {
    setGeographicFocus(geographicFocus.filter((_, i) => i !== index));
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
      shortDescription,
      fullDescription,
      status,
      researchType,
      researchQuestions: researchQuestions.filter(rq => rq.question.trim()),
      keyFindings,
      milestones: milestones.filter(m => m.title.trim()),
      methodology,
      geographicFocus,
      tags,
      references,
      teamMembers: teamMembers.filter(tm => tm.name.trim()),
      fundingStatus,
      fundingSource,
      startDate: startDate || null,
      estimatedCompletion: estimatedCompletion || null,
      featured,
    };

    try {
      const response = await fetch("/api/research-themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/research");
      } else {
        alert("Failed to create research project");
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
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/research" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Add New Research Project</h1>

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
                  placeholder="Voice-First AI, Blockchain, and Agricultural Supply Chains"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="voice-first-blockchain-agriculture"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Short Description * (for listing pages)</label>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[100px]"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="A brief summary of the research theme..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Description (detailed context)</label>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[200px]"
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Detailed background and context for the research..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status *</label>
                  <select
                    className="w-full p-3 border rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Research Type</label>
                  <select
                    className="w-full p-3 border rounded-md"
                    value={researchType}
                    onChange={(e) => setResearchType(e.target.value)}
                  >
                    <option value="systematic-review">Systematic Review</option>
                    <option value="empirical-study">Empirical Study</option>
                    <option value="field-research">Field Research</option>
                    <option value="theoretical">Theoretical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Completion</label>
                  <Input
                    type="date"
                    value={estimatedCompletion}
                    onChange={(e) => setEstimatedCompletion(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Funding Status</label>
                  <select
                    className="w-full p-3 border rounded-md"
                    value={fundingStatus}
                    onChange={(e) => setFundingStatus(e.target.value)}
                  >
                    <option value="seeking-funding">Seeking Funding</option>
                    <option value="funded">Funded</option>
                    <option value="self-funded">Self-Funded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Funding Source</label>
                  <Input
                    value={fundingSource}
                    onChange={(e) => setFundingSource(e.target.value)}
                    placeholder="Name of funder or organization"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">Feature this research theme</label>
              </div>
            </div>
          </Card>

          {/* Research Questions */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Research Questions</h2>
              <Button type="button" onClick={addResearchQuestion} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>
            <div className="space-y-6">
              {researchQuestions.map((rq, index) => (
                <Card key={rq.id} className="p-6 bg-muted/30">
                  <div className="flex items-start justify-between mb-4">
                    <Badge>RQ{index + 1}</Badge>
                    {researchQuestions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeResearchQuestion(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Question</label>
                      <Input
                        value={rq.question}
                        onChange={(e) => updateResearchQuestion(index, "question", e.target.value)}
                        placeholder="How do voice-first AI technologies..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description (optional)</label>
                      <textarea
                        className="w-full p-3 border rounded-md min-h-[80px]"
                        value={rq.description}
                        onChange={(e) => updateResearchQuestion(index, "description", e.target.value)}
                        placeholder="Additional context or sub-questions..."
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Milestones */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Milestone Roadmap</h2>
              <Button type="button" onClick={addMilestone} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </div>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <Card key={milestone.id} className="p-6 bg-muted/30">
                  <div className="flex items-start justify-between mb-4">
                    <Badge>M{index + 1}</Badge>
                    {milestones.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, "title", e.target.value)}
                        placeholder="Complete literature review"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        className="w-full p-3 border rounded-md min-h-[80px]"
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, "description", e.target.value)}
                        placeholder="Detailed description of milestone..."
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <select
                          className="w-full p-3 border rounded-md"
                          value={milestone.status}
                          onChange={(e) => updateMilestone(index, "status", e.target.value)}
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Due Date</label>
                        <Input
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) => updateMilestone(index, "dueDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Completed Date</label>
                        <Input
                          type="date"
                          value={milestone.completedDate}
                          onChange={(e) => updateMilestone(index, "completedDate", e.target.value)}
                          disabled={milestone.status !== "completed"}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Methodology */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Methodology</h2>
            <textarea
              className="w-full p-3 border rounded-md min-h-[200px]"
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
              placeholder="Describe the research approach, methods, and procedures..."
            />
          </Card>

          {/* Team Members */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Research Team</h2>
              <Button type="button" onClick={addTeamMember} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Input
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                      placeholder="Role (e.g., Principal Investigator)"
                    />
                  </div>
                  {teamMembers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Geographic Focus & Tags */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Geographic Focus & Tags</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Geographic Focus</label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newGeoFocus}
                    onChange={(e) => setNewGeoFocus(e.target.value)}
                    placeholder="Add region or country"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addGeographicFocus())}
                  />
                  <Button type="button" onClick={addGeographicFocus}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {geographicFocus.map((geo, index) => (
                    <Badge key={index} variant="outline" className="pl-3 pr-1">
                      {geo}
                      <button
                        type="button"
                        onClick={() => removeGeographicFocus(index)}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
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
            </div>
          </Card>

          {/* References */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">References</h2>
            <textarea
              className="w-full p-3 border rounded-md min-h-[300px] font-mono text-sm"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="Paste references here (one per line or in any format)..."
            />
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Link href="/research">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Create Research Project"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
