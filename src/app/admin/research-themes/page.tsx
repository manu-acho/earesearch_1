"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ResearchProject = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  status: string;
  researchType: string | null;
  researchQuestions: any[];
  keyFindings: any[];
  milestones: any[];
  methodology: string | null;
  geographicFocus: string[];
  tags: string[];
  teamMembers: any[];
  fundingStatus: string | null;
  fundingSource: string | null;
  startDate: string | null;
  estimatedCompletion: string | null;
  featured: boolean;
  lastUpdated: string;
};

const statusColors = {
  active: "bg-green-500/10 text-green-700 border-green-500/20",
  completed: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  "on-hold": "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
};

const fundingColors = {
  funded: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  "seeking-funding": "bg-amber-500/10 text-amber-700 border-amber-500/20",
  "self-funded": "bg-gray-500/10 text-gray-700 border-gray-500/20",
};

export default function AdminResearchProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      
      const response = await fetch(`/api/research-themes?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/research-themes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.shortDescription.toLowerCase().includes(query) ||
      (project.researchType && project.researchType.toLowerCase().includes(query))
    );
  });

  const getCompletedMilestones = (milestones: any[]) => {
    if (!milestones || !Array.isArray(milestones)) return 0;
    return milestones.filter(m => m.status === "completed").length;
  };

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Research Projects</h1>
          <p className="text-muted-foreground">
            Manage active research programs, questions, findings, and milestones
          </p>
        </div>
        <Button className="glossy-blue glossy-blue-hover" asChild>
          <Link href="/admin/research-themes/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search projects by title, description, or research type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={statusFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setStatusFilter(null)}
          >
            All ({projects.length})
          </Badge>
          {["active", "completed", "on-hold"].map((status) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setStatusFilter(status)}
            >
              {status.replace("-", " ")} ({projects.filter(p => p.status === status).length})
            </Badge>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {project.status}
                    </Badge>
                    {project.researchType && (
                      <Badge variant="outline" className="capitalize">
                        {project.researchType.replace("-", " ")}
                      </Badge>
                    )}
                    {project.fundingStatus && (
                      <Badge className={fundingColors[project.fundingStatus as keyof typeof fundingColors]}>
                        {project.fundingStatus.replace("-", " ")}
                      </Badge>
                    )}
                    {project.featured && (
                      <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 hover:text-primary">
                    <Link href={`/research/${project.slug}`} target="_blank">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground line-clamp-2 mb-3">
                    {project.shortDescription}
                  </p>

                  {project.researchQuestions && project.researchQuestions.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Research Questions:</span> {project.researchQuestions.length}
                    </p>
                  )}

                  {project.milestones && project.milestones.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Milestones:</span>{" "}
                      {getCompletedMilestones(project.milestones)}/{project.milestones.length} completed
                    </p>
                  )}

                  {project.geographicFocus && project.geographicFocus.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium">Geographic Focus:</span> {project.geographicFocus.join(", ")}
                    </p>
                  )}

                  {project.teamMembers && project.teamMembers.length > 0 && (
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium">Team:</span>{" "}
                      {project.teamMembers.map((m: any) => m.name).join(", ")}
                    </p>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {project.startDate && (
                      <span>
                        Started: {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    )}
                    {project.estimatedCompletion && (
                      <span>
                        Est. Completion: {new Date(project.estimatedCompletion).toLocaleDateString()}
                      </span>
                    )}
                    <span>
                      Last updated: {new Date(project.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    asChild
                  >
                    <Link href={`/research/${project.slug}`} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/admin/research-themes/${project.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {deleteConfirm === project.id ? (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(project.id)}
                      >
                        Confirm?
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(project.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-muted/30 border-dashed border-2">
          <h3 className="text-xl font-semibold mb-2">No research projects yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first research project with questions, milestones, and findings
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/research-themes/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
