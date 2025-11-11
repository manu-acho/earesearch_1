import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Prototype } from "contentlayer/generated";

interface PrototypeCardProps {
  prototype: Prototype;
}

export function PrototypeCard({ prototype }: PrototypeCardProps) {
  const statusColors = {
    prototype: 'secondary',
    pilot: 'default',
    production: 'default',
  } as const;

  return (
    <Card className="h-full flex flex-col group hover:-translate-y-2 border-l-4 border-l-purple-500">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-bold">
            <Link href={prototype.url} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors group-hover:underline decoration-2 underline-offset-4">
              {prototype.name}
            </Link>
          </CardTitle>
          <Badge 
            variant={statusColors[prototype.status || 'prototype']} 
            className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-medium capitalize"
          >
            {prototype.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 text-gray-700 dark:text-gray-300 leading-relaxed">
          {prototype.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {prototype.stack && prototype.stack.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {prototype.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs font-medium bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900 text-purple-700 dark:text-purple-300 border-0">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {prototype.useCases && prototype.useCases.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Use Cases</p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5 leading-relaxed">
              {prototype.useCases.slice(0, 3).map((useCase) => (
                <li key={useCase} className="line-clamp-1 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="flex-1">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {prototype.demoUrl && (
          <Button variant="default" size="sm" asChild>
            <a href={prototype.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo
            </a>
          </Button>
        )}
        {prototype.repoUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={prototype.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
