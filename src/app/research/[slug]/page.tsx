"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar,
  Target,
  Users,
  MapPin,
  TrendingUp
} from "lucide-react";

interface ResearchQuestion {
  id: string;
  question: string;
  description?: string;
}

interface Finding {
  rqId: string;
  findings: string[];
}

interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "not-started" | "in-progress" | "completed";
  completedDate?: string;
}

interface TeamMember {
  name: string;
  role: string;
}

interface ResearchTheme {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  status: string;
  researchType: string | null;
  researchQuestions: ResearchQuestion[];
  keyFindings: Finding[];
  milestones: Milestone[];
  methodology?: string;
  geographicFocus: string[];
  tags: string[];
  relatedPublications: string[];
  references?: string;
  teamMembers: TeamMember[];
  fundingStatus: string | null;
  fundingSource?: string;
  startDate: string | null;
  estimatedCompletion: string | null;
  featured: boolean;
  createdAt: string;
  lastUpdated: string;
}

export default function ResearchThemeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [theme, setTheme] = useState<ResearchTheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/research-themes`)
      .then((res) => res.json())
      .then((data) => {
        const themes = Array.isArray(data) ? data : [];
        const foundTheme = themes.find((t: ResearchTheme) => t.slug === slug);
        setTheme(foundTheme || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching research theme:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!theme) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Research Theme Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The research theme you're looking for doesn't exist.
            </p>
            <Link href="/research">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Research
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  const completedMilestones = theme.milestones.filter(m => m.status === "completed").length;
  const progressPercentage = theme.milestones.length > 0 
    ? (completedMilestones / theme.milestones.length) * 100 
    : 0;

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link href="/research" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              {theme.researchType || "Research"}
            </Badge>
            <Badge variant="outline" className={
              theme.status === "active" ? "border-green-500 text-green-700" : 
              theme.status === "completed" ? "border-blue-500 text-blue-700" : 
              "border-orange-500 text-orange-700"
            }>
              {theme.status}
            </Badge>
            {theme.fundingStatus && (
              <Badge variant="outline">
                {theme.fundingStatus === "funded" ? "✓ Funded" : 
                 theme.fundingStatus === "seeking-funding" ? "Seeking Funding" : 
                 "Self-Funded"}
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {theme.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {theme.shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {theme.startDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Started: {new Date(theme.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            )}
            {theme.estimatedCompletion && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>
                  Est. Completion: {new Date(theme.estimatedCompletion).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            )}
            {theme.geographicFocus.length > 0 && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{theme.geographicFocus.join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Research Progress</h2>
            <span className="text-3xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-6">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{theme.researchQuestions.length}</div>
              <div className="text-sm text-muted-foreground">Research Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{completedMilestones}</div>
              <div className="text-sm text-muted-foreground">Milestones Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{theme.milestones.length - completedMilestones}</div>
              <div className="text-sm text-muted-foreground">Milestones Remaining</div>
            </div>
          </div>
        </Card>

        {/* Full Description */}
        {theme.fullDescription && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Overview</h2>
            <Card className="p-8">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {theme.fullDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* Research Questions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Research Questions</h2>
          <div className="space-y-6">
            {theme.researchQuestions.map((rq, index) => (
              <Card key={rq.id} className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      RQ{index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{rq.question}</h3>
                    {rq.description && (
                      <p className="text-muted-foreground">{rq.description}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Findings */}
        {theme.keyFindings && theme.keyFindings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Key Findings</h2>
            <div className="space-y-8">
              {theme.keyFindings.map((finding, idx) => {
                const rq = theme.researchQuestions.find(q => q.id === finding.rqId);
                return (
                  <Card key={idx} className="p-6 bg-gradient-to-br from-green-50 to-white">
                    {rq && (
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          RQ{theme.researchQuestions.indexOf(rq) + 1}
                        </Badge>
                        <span className="text-sm font-medium text-muted-foreground">{rq.question}</span>
                      </div>
                    )}
                    <ul className="space-y-3">
                      {finding.findings.map((f, fidx) => (
                        <li key={fidx} className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Milestone Roadmap */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Milestone Roadmap</h2>
          <Card className="p-8">
            <div className="space-y-6">
              {theme.milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-6">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    {milestone.status === "completed" ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                    ) : milestone.status === "in-progress" ? (
                      <Clock className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                    )}
                    {index < theme.milestones.length - 1 && (
                      <div className={`w-0.5 h-full min-h-[60px] mt-2 ${
                        milestone.status === "completed" ? "bg-green-600" : "bg-muted"
                      }`} />
                    )}
                  </div>

                  {/* Milestone content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-lg">{milestone.title}</h3>
                      <Badge variant="outline" className={
                        milestone.status === "completed" ? "border-green-500 text-green-700" : 
                        milestone.status === "in-progress" ? "border-orange-500 text-orange-700" : 
                        "border-gray-400 text-gray-600"
                      }>
                        {milestone.status.replace("-", " ")}
                      </Badge>
                    </div>
                    {milestone.description && (
                      <p className="text-muted-foreground mb-3">{milestone.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {milestone.dueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      )}
                      {milestone.completedDate && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completed: {new Date(milestone.completedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Methodology */}
        {theme.methodology && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Methodology</h2>
            <Card className="p-8">
              <div className="prose prose-lg max-w-none">
                {theme.methodology.split('\n\n').map((section, idx) => {
                  // Handle bold headers like **Search Strategy:**
                  if (section.trim().startsWith('**')) {
                    const parts = section.split('**');
                    return (
                      <div key={idx} className="mb-6">
                        <h3 className="font-bold text-lg mb-2">{parts[1]}</h3>
                        <p className="text-muted-foreground leading-relaxed">{parts[2]?.trim()}</p>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                      {section}
                    </p>
                  );
                })}
              </div>
            </Card>
          </section>
        )}

        {/* Team */}
        {theme.teamMembers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Research Team</h2>
            <Card className="p-8">
              <div className="grid gap-6 md:grid-cols-2">
                {theme.teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* Tags */}
        {theme.tags.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {theme.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline">{tag}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {theme.references && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">References</h2>
            <Card className="p-8">
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {theme.references}
              </div>
            </Card>
          </section>
        )}

        {/* Funding Notice */}
        {theme.fundingStatus === "seeking-funding" && (
          <Card className="p-8 bg-gradient-to-br from-orange-50 to-white border-orange-200">
            <h3 className="text-xl font-bold mb-3">Support This Research</h3>
            <p className="text-muted-foreground mb-4">
              This research program is currently seeking funding. If you're interested in supporting our work, please get in touch.
            </p>
            <Link href="/contact">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Contact Us About Funding
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  );
}
