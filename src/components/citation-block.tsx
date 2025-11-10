"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import type { Publication } from "contentlayer/generated";

interface CitationBlockProps {
  publication: Publication;
}

export function CitationBlock({ publication }: CitationBlockProps) {
  const [copied, setCopied] = useState(false);

  const bibtex = publication.citation || generateBibtex(publication);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-muted rounded-lg p-4 my-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Citation</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy BibTeX
            </>
          )}
        </Button>
      </div>
      <pre className="text-xs bg-background p-3 rounded overflow-x-auto">
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}

function generateBibtex(publication: Publication): string {
  const authors = publication.authors?.join(" and ") || "Unknown";
  const year = publication.year;
  const title = publication.title;
  const venue = publication.venue || "Unpublished";
  const key = `${publication.slug.replace(/-/g, "_")}_${year}`;

  return `@article{${key},
  author = {${authors}},
  title = {${title}},
  year = {${year}},
  journal = {${venue}}${publication.doi ? `,\n  doi = {${publication.doi}}` : ""}
}`;
}
