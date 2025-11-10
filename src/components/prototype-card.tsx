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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">
            <Link href={prototype.url} className="hover:text-primary transition-colors">
              {prototype.name}
            </Link>
          </CardTitle>
          <Badge variant={statusColors[prototype.status || 'prototype']}>
            {prototype.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {prototype.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {prototype.stack && prototype.stack.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {prototype.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {prototype.useCases && prototype.useCases.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Use Cases</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {prototype.useCases.slice(0, 3).map((useCase) => (
                <li key={useCase} className="line-clamp-1">• {useCase}</li>
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
