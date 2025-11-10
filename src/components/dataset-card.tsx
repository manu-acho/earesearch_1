import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, FileText, ExternalLink } from "lucide-react";

type DatasetType = {
  name: string;
  slug: string;
  summary: string;
  size?: string | null;
  format?: string | null;
  license: string;
  version?: string | null;
  downloadUrl?: string | null;
  documentationUrl?: string | null;
  doi?: string | null;
  languages?: string[];
  domains?: string[];
  tags?: string[];
  featured?: boolean;
};

interface DatasetCardProps {
  dataset: DatasetType;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const url = `/datasets/${dataset.slug}`;
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">
            <Link href={url} className="hover:text-primary transition-colors">
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
          {dataset.domains?.map((domain) => (
            <Badge key={domain} variant="outline" className="text-xs">
              {domain}
            </Badge>
          ))}
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
