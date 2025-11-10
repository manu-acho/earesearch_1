import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const Publication = defineDocumentType(() => ({
  name: 'Publication',
  filePathPattern: `publications/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    abstract: { type: 'string', required: true },
    year: { type: 'number', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    pdfUrl: { type: 'string' },
    codeUrl: { type: 'string' },
    datasetUrl: { type: 'string' },
    doi: { type: 'string' },
    venue: { type: 'string' },
    citation: { type: 'string' },
    status: { 
      type: 'enum', 
      options: ['published', 'preprint', 'in-review'],
      default: 'preprint'
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/publications/${doc.slug}`,
    },
  },
}));

export const Dataset = defineDocumentType(() => ({
  name: 'Dataset',
  filePathPattern: `datasets/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    size: { type: 'string' },
    format: { type: 'string' },
    license: { type: 'string', required: true },
    version: { type: 'string', default: '1.0.0' },
    downloadUrl: { type: 'string' },
    documentationUrl: { type: 'string' },
    doi: { type: 'string' },
    languages: { type: 'list', of: { type: 'string' }, default: [] },
    domain: { type: 'string' },
    provenance: { type: 'string' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/datasets/${doc.slug}`,
    },
  },
}));

export const Prototype = defineDocumentType(() => ({
  name: 'Prototype',
  filePathPattern: `prototypes/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    description: { type: 'string', required: true },
    stack: { type: 'list', of: { type: 'string' }, default: [] },
    repoUrl: { type: 'string' },
    demoUrl: { type: 'string' },
    status: { 
      type: 'enum', 
      options: ['prototype', 'pilot', 'production'],
      default: 'prototype'
    },
    screenshots: { type: 'list', of: { type: 'string' }, default: [] },
    useCases: { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/prototypes/${doc.slug}`,
    },
  },
}));

export const Theme = defineDocumentType(() => ({
  name: 'Theme',
  filePathPattern: `themes/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    order: { type: 'number', default: 0 },
    icon: { type: 'string' },
    relatedPublications: { type: 'list', of: { type: 'string' }, default: [] },
    relatedPrototypes: { type: 'list', of: { type: 'string' }, default: [] },
    relatedDatasets: { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/research/${doc.slug}`,
    },
  },
}));

export const Update = defineDocumentType(() => ({
  name: 'Update',
  filePathPattern: `updates/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    author: { type: 'string', default: 'E.A Research Team' },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/updates/${doc.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Publication, Dataset, Prototype, Theme, Update],
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
