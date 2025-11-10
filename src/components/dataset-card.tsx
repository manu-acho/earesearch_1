import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, FileText, ExternalLink } from "lucide-react";
import type { Dataset } from "contentlayer/generated";

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">
            <Link href={dataset.url} className="hover:text-primary transition-colors">
              {dataset.name}
            </Link>
          </CardTitle>
          {dataset.license && (
            <Badge variant="outline">{dataset.license}</Badge>
          )}
        </div>
        <CardDescription>
          {dataset.version && `v${dataset.version}`}
          {dataset.size && ` · ${dataset.size}`}
          {dataset.format && ` · ${dataset.format}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {dataset.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {dataset.languages?.map((lang) => (
            <Badge key={lang} variant="secondary" className="text-xs">
              {lang}
            </Badge>
          ))}
          {dataset.domain && (
            <Badge variant="outline" className="text-xs">
              {dataset.domain}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {dataset.downloadUrl && (
          <Button variant="default" size="sm" asChild>
            <a href={dataset.downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              Download
            </a>
          </Button>
        )}
        {dataset.documentationUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={dataset.documentationUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" />
              Docs
            </a>
          </Button>
        )}
        {dataset.doi && (
          <Button variant="outline" size="sm" asChild>
            <a href={`https://doi.org/${dataset.doi}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              DOI
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
