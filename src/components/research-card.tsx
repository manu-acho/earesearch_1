import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Theme } from "contentlayer/generated";

interface ResearchCardProps {
  theme: Theme;
}

export function ResearchCard({ theme }: ResearchCardProps) {
  return (
    <Link href={theme.url} className="group block h-full">
      <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors duration-300 text-xl">
            {theme.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed">
            {theme.summary}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {theme.relatedPublications && theme.relatedPublications.length > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {theme.relatedPublications.length} {theme.relatedPublications.length === 1 ? 'Publication' : 'Publications'}
              </Badge>
            )}
            {theme.relatedPrototypes && theme.relatedPrototypes.length > 0 && (
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                {theme.relatedPrototypes.length} {theme.relatedPrototypes.length === 1 ? 'Prototype' : 'Prototypes'}
              </Badge>
            )}
            {theme.relatedDatasets && theme.relatedDatasets.length > 0 && (
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                {theme.relatedDatasets.length} {theme.relatedDatasets.length === 1 ? 'Dataset' : 'Datasets'}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
