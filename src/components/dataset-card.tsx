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
    <Card className="h-full flex flex-col group hover:-translate-y-2 border-l-4 border-l-blue-500">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-bold">
            <Link href={url} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors group-hover:underline decoration-2 underline-offset-4">
              {dataset.name}
            </Link>
          </CardTitle>
          {dataset.license && (
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium">
              {dataset.license}
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {dataset.version && `v${dataset.version}`}
          {dataset.size && ` · ${dataset.size}`}
          {dataset.format && ` · ${dataset.format}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
          {dataset.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {dataset.languages?.map((lang) => (
            <Badge key={lang} variant="secondary" className="text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-950 dark:to-blue-900 text-blue-700 dark:text-blue-300 border-0">
              {lang}
            </Badge>
          ))}
          {dataset.domains?.map((domain) => (
            <Badge key={domain} variant="outline" className="text-xs font-medium bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
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
