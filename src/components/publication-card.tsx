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
    <Card className="h-full flex flex-col group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">
              <Link href={publication.url} className="group-hover:text-primary transition-colors duration-300">
                {publication.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-sm">
              {publication.authors?.join(", ")} · {publication.year}
              {publication.venue && ` · ${publication.venue}`}
            </CardDescription>
          </div>
          <Badge variant={
            publication.status === 'published' ? 'default' :
            publication.status === 'preprint' ? 'secondary' : 'outline'
          } className={
            publication.status === 'published' ? 'bg-primary/10 text-primary border-primary/20' : ''
          }>
            {publication.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {publication.abstract}
        </p>
        <div className="flex flex-wrap gap-2">
          {publication.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
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
