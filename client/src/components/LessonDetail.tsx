import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Clock, Star, Lightbulb, Code2, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CodeBlock from "./CodeBlock";
import ExerciseZone from "./ExerciseZone";
import type { Lesson } from "@shared/schema";

interface LessonDetailProps {
  lessonId: string;
  onBack?: () => void;
}

async function fetchLesson(id: string): Promise<Lesson> {
  const response = await fetch(`/api/lessons/${id}`);
  if (!response.ok) {
    throw new Error("Darsni yuklashda xatolik");
  }
  return response.json();
}

export default function LessonDetail({
  lessonId,
  onBack
}: LessonDetailProps) {
  const { data: lesson, isLoading, error } = useQuery<Lesson>({
    queryKey: ["lesson", lessonId],
    queryFn: () => fetchLesson(lessonId),
    refetchOnWindowFocus: false,
  });

  const handleBack = () => {
    console.log("Going back to lessons");
    onBack?.();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Dars yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Xatolik</AlertTitle>
          <AlertDescription>
            Darsni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" data-testid="badge-lesson-number">
              Dars #{lesson.lessonNumber}
            </Badge>
            <Badge className="gap-1" data-testid="badge-difficulty">
              <Star className="h-3 w-3" />
              {lesson.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span data-testid="text-duration">{lesson.duration}</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground md:text-4xl" data-testid="text-lesson-title">
            {lesson.title}
          </h1>
        </div>
      </div>
      
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            {lesson.description}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="leading-relaxed text-card-foreground whitespace-pre-wrap">
            {lesson.content}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Kod misoli
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <CodeBlock code={lesson.codeExample} showLineNumbers />
          </div>
        </CardContent>
      </Card>
      
      <ExerciseZone
        title="O'zingiz sinab ko'ring!"
        instructions={lesson.exercisePrompt}
        initialCode={lesson.exerciseStarterCode || ""}
        expectedOutput={lesson.expectedOutput || ""}
      />
      
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={handleBack} data-testid="button-back-bottom">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Orqaga
        </Button>
        
        <Button data-testid="button-next-lesson">
          Keyingi dars
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  );
}
