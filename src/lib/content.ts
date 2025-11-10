import { allPublications, allDatasets, allPrototypes, allThemes, allUpdates } from 'contentlayer/generated';
import type { Publication, Dataset, Prototype, Theme, Update } from 'contentlayer/generated';

// Publications
export function getAllPublications(): Publication[] {
  return allPublications.sort((a, b) => b.year - a.year);
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return allPublications.find((pub) => pub.slug === slug);
}

export function getPublicationsByTag(tag: string): Publication[] {
  return allPublications.filter((pub) => 
    pub.tags?.includes(tag)
  ).sort((a, b) => b.year - a.year);
}

export function getPublicationsByYear(year: number): Publication[] {
  return allPublications.filter((pub) => pub.year === year);
}

// Datasets
export function getAllDatasets(): Dataset[] {
  return allDatasets.sort((a, b) => a.name.localeCompare(b.name));
}

export function getDatasetBySlug(slug: string): Dataset | undefined {
  return allDatasets.find((dataset) => dataset.slug === slug);
}

// Prototypes
export function getAllPrototypes(): Prototype[] {
  return allPrototypes.sort((a, b) => a.name.localeCompare(b.name));
}

export function getPrototypeBySlug(slug: string): Prototype | undefined {
  return allPrototypes.find((proto) => proto.slug === slug);
}

export function getPrototypesByStatus(status: 'prototype' | 'pilot' | 'production'): Prototype[] {
  return allPrototypes.filter((proto) => proto.status === status);
}

// Themes
export function getAllThemes(): Theme[] {
  return allThemes.sort((a, b) => a.order - b.order);
}

export function getThemeBySlug(slug: string): Theme | undefined {
  return allThemes.find((theme) => theme.slug === slug);
}

// Updates
export function getAllUpdates(): Update[] {
  return allUpdates.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedUpdates(): Update[] {
  return allUpdates
    .filter((update) => update.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getUpdateBySlug(slug: string): Update | undefined {
  return allUpdates.find((update) => update.slug === slug);
}

export function getUpdatesByTag(tag: string): Update[] {
  return allUpdates
    .filter((update) => update.tags?.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Related content
export function getRelatedPublications(slugs: string[]): Publication[] {
  return allPublications.filter((pub) => slugs.includes(pub.slug));
}

export function getRelatedPrototypes(slugs: string[]): Prototype[] {
  return allPrototypes.filter((proto) => slugs.includes(proto.slug));
}

export function getRelatedDatasets(slugs: string[]): Dataset[] {
  return allDatasets.filter((dataset) => slugs.includes(dataset.slug));
}

// Search/Filter helpers
export function filterPublications(filters: {
  year?: number;
  tag?: string;
  status?: 'published' | 'preprint' | 'in-review';
  author?: string;
}): Publication[] {
  let results = allPublications;

  if (filters.year) {
    results = results.filter((pub) => pub.year === filters.year);
  }

  if (filters.tag) {
    results = results.filter((pub) => pub.tags?.includes(filters.tag!));
  }

  if (filters.status) {
    results = results.filter((pub) => pub.status === filters.status);
  }

  if (filters.author) {
    results = results.filter((pub) => 
      pub.authors?.some(author => 
        author.toLowerCase().includes(filters.author!.toLowerCase())
      )
    );
  }

  return results.sort((a, b) => b.year - a.year);
}

// Get unique tags across all publications
export function getAllPublicationTags(): string[] {
  const tags = new Set<string>();
  allPublications.forEach((pub) => {
    pub.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// Get unique years
export function getAllPublicationYears(): number[] {
  const years = new Set(allPublications.map((pub) => pub.year));
  return Array.from(years).sort((a, b) => b - a);
}
