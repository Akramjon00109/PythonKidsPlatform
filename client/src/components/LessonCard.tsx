import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, CheckCircle2 } from "lucide-react";

interface LessonCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: "oson" | "o'rta" | "qiyin";
  duration: string;
  completed?: boolean;
  icon?: string;
  onStart?: () => void;
}

const difficultyColors = {
  "oson": "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "o'rta": "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "qiyin": "bg-chart-3/10 text-chart-3 border-chart-3/20"
};

export default function LessonCard({
  id,
  title,
  description,
  difficulty,
  duration,
  completed = false,
  icon,
  onStart
}: LessonCardProps) {
  const handleStart = () => {
    console.log(`Starting lesson ${id}: ${title}`);
    onStart?.();
  };

  return (
    <Card className="group relative overflow-visible hover-elevate transition-all" data-testid={`card-lesson-${id}`}>
      {completed && (
        <div className="absolute -right-2 -top-2 z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-4 text-white shadow-md">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>
      )}
      
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs font-medium" data-testid={`badge-lesson-number-${id}`}>
            Dars #{id}
          </Badge>
          <Badge className={`text-xs border ${difficultyColors[difficulty]}`} data-testid={`badge-difficulty-${id}`}>
            <Star className="mr-1 h-3 w-3" />
            {difficulty}
          </Badge>
        </div>
        
        {icon && (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/5">
            <img src={icon} alt="" className="h-12 w-12 object-contain" />
          </div>
        )}
        
        <h3 className="text-xl font-semibold leading-tight text-card-foreground" data-testid={`text-lesson-title-${id}`}>
          {title}
        </h3>
      </CardHeader>
      
      <CardContent>
        <p className="leading-relaxed text-muted-foreground" data-testid={`text-lesson-description-${id}`}>
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span data-testid={`text-duration-${id}`}>{duration}</span>
        </div>
        
        <Button 
          onClick={handleStart}
          data-testid={`button-start-lesson-${id}`}
          disabled={completed}
        >
          {completed ? "Tugatilgan" : "Boshlash"}
        </Button>
      </CardFooter>
    </Card>
  );
}