import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, FileText, Code, Database } from "lucide-react";
import type { Publication } from "contentlayer/generated";

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Card className="h-full flex flex-col group hover:-translate-y-2 border-l-4 border-l-green-500">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold mb-2">
              <Link href={publication.url} className="hover:text-green-600 dark:hover:text-green-400 transition-colors group-hover:underline decoration-2 underline-offset-4">
                {publication.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {publication.authors?.join(", ")} · {publication.year}
              {publication.venue && ` · ${publication.venue}`}
            </CardDescription>
          </div>
          <Badge variant={
            publication.status === 'published' ? 'default' :
            publication.status === 'preprint' ? 'secondary' : 'outline'
          } className={
            publication.status === 'published' 
              ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-medium' 
              : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium'
          }>
            {publication.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
          {publication.abstract}
        </p>
        <div className="flex flex-wrap gap-2">
          {publication.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-medium bg-gradient-to-r from-green-100 to-green-50 dark:from-green-950 dark:to-green-900 text-green-700 dark:text-green-300 border-0">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {publication.pdfUrl && (
          <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all" asChild>
            <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </a>
          </Button>
        )}
        {publication.codeUrl && (
          <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all" asChild>
            <a href={publication.codeUrl} target="_blank" rel="noopener noreferrer">
              <Code className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        )}
        {publication.datasetUrl && (
          <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all" asChild>
            <a href={publication.datasetUrl} target="_blank" rel="noopener noreferrer">
              <Database className="w-4 h-4 mr-2" />
              Dataset
            </a>
          </Button>
        )}
        {publication.doi && (
          <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all" asChild>
            <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              DOI
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
