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
      <Card className="h-full hover:-translate-y-2 border-l-4 border-l-orange-500">
        <CardHeader className="space-y-3">
          <CardTitle className="group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 text-xl font-bold group-hover:underline decoration-2 underline-offset-4">
            {theme.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {theme.summary}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {theme.relatedPublications && theme.relatedPublications.length > 0 && (
              <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-950 dark:to-orange-900 text-orange-700 dark:text-orange-300 border-0 font-semibold">
                {theme.relatedPublications.length} {theme.relatedPublications.length === 1 ? 'Publication' : 'Publications'}
              </Badge>
            )}
            {theme.relatedPrototypes && theme.relatedPrototypes.length > 0 && (
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-950 dark:to-blue-900 text-blue-700 dark:text-blue-300 border-0 font-semibold">
                {theme.relatedPrototypes.length} {theme.relatedPrototypes.length === 1 ? 'Prototype' : 'Prototypes'}
              </Badge>
            )}
            {theme.relatedDatasets && theme.relatedDatasets.length > 0 && (
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900 text-purple-700 dark:text-purple-300 border-0 font-semibold">
                {theme.relatedDatasets.length} {theme.relatedDatasets.length === 1 ? 'Dataset' : 'Datasets'}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
