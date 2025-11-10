import { getAllThemes } from "@/lib/content";
import { ResearchCard } from "@/components/research-card";

export default function ResearchPage() {
  const themes = getAllThemes();

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Research Themes
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our research addresses critical challenges in digital agriculture through four interconnected programs. Each theme combines technical innovation with socio-technical design, field research, and governance frameworks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme, index) => (
            <div key={theme.slug} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
              <ResearchCard theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
