import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, Code2, ArrowRight } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  onSelect: (projectId: string) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const difficultyColor = {
    "oson": "bg-green-500/10 text-green-600 dark:text-green-400",
    "o'rta": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    "qiyin": "bg-red-500/10 text-red-600 dark:text-red-400",
  }[project.difficulty] || "bg-gray-500/10 text-gray-600";

  const categoryIcon = {
    "o'yin": "🎮",
    "kalkulyator": "🧮",
    "veb": "🌐",
    "ma'lumot": "📊",
    "amaliy": "🛠️",
  }[project.category] || "💻";

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 cursor-pointer"
      onClick={() => onSelect(project.id)}
      data-testid={`card-project-${project.id}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{categoryIcon}</span>
            <Badge className={difficultyColor} data-testid={`badge-difficulty-${project.difficulty}`}>
              {project.difficulty}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Code2 className="h-4 w-4" />
            <span>{project.steps.length} bosqich</span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm font-medium text-foreground mb-2">Maqsad:</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.objective}</p>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Button 
          className="w-full gap-2 group-hover:gap-3 transition-all"
          data-testid="button-start-project"
        >
          Boshlash
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
