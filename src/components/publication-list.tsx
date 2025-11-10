import { PublicationCard } from "./publication-card";
import type { Publication } from "contentlayer/generated";

interface PublicationListProps {
  publications: Publication[];
  showCount?: boolean;
}

export function PublicationList({ publications, showCount = true }: PublicationListProps) {
  if (publications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No publications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showCount && (
        <p className="text-sm text-muted-foreground">
          {publications.length} {publications.length === 1 ? 'publication' : 'publications'}
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publications.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </div>
    </div>
  );
}
