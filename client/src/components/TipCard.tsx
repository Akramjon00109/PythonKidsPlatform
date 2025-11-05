import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface TipCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
  icon?: string;
}

const categoryColors: Record<string, string> = {
  "motivatsiya": "bg-chart-1/10 text-chart-1 border-chart-1/20",
  "o'rganish": "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "amaliyot": "bg-chart-3/10 text-chart-3 border-chart-3/20",
  "texnik": "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "ko'nikma": "bg-chart-5/10 text-chart-5 border-chart-5/20",
  "manba": "bg-primary/10 text-primary border-primary/20",
  "general": "bg-muted text-muted-foreground border-muted"
};

export default function TipCard({
  id,
  title,
  content,
  category,
  icon
}: TipCardProps) {
  return (
    <Card className="group relative overflow-visible hover-elevate transition-all" data-testid={`card-tip-${id}`}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs font-medium" data-testid={`badge-tip-number-${id}`}>
            Maslahat #{id}
          </Badge>
          <Badge className={`text-xs border ${categoryColors[category] || categoryColors.general}`} data-testid={`badge-category-${id}`}>
            {category}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
            <Lightbulb className="h-6 w-6 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold leading-tight text-card-foreground" data-testid={`text-tip-title-${id}`}>
            {title}
          </h3>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap" data-testid={`text-tip-content-${id}`}>
          {content}
        </p>
      </CardContent>
    </Card>
  );
}
