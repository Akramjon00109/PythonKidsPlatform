import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Clock, Target, CheckCircle2, Circle, 
  Lightbulb, Code2, Play, Loader2, AlertCircle, Trophy, PartyPopper 
} from "lucide-react";
import type { Project } from "@shared/schema";
import ExerciseZone from "./ExerciseZone";
import CodeBlock from "./CodeBlock";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface ProjectDetailProps {
  projectId: string;
  userId: string;
  onBack?: () => void;
}

async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`/api/projects/${id}`);
  if (!response.ok) {
    throw new Error("Loyihani yuklashda xatolik");
  }
  return response.json();
}

export default function ProjectDetail({ projectId, userId, onBack }: ProjectDetailProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [userProjectId, setUserProjectId] = useState<string | null>(null);

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject(projectId),
    refetchOnWindowFocus: false,
  });

  const startProjectMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/user-projects`, { userId, projectId });
      return await res.json();
    },
    onSuccess: (data) => {
      setUserProjectId(data.id);
      if (data.completedSteps && data.completedSteps.length > 0) {
        setCompletedSteps(data.completedSteps);
      }
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ step, completed }: { step: number; completed: boolean }) => {
      if (!userProjectId) return;
      
      const newCompletedSteps = completed 
        ? [...completedSteps, step]
        : completedSteps.filter(s => s !== step);
      
      const res = await apiRequest("PATCH", `/api/user-projects/${userProjectId}`, { 
        completedSteps: newCompletedSteps,
        status: newCompletedSteps.length === project?.steps.length ? "completed" : "started",
        completedAt: newCompletedSteps.length === project?.steps.length ? new Date().toISOString() : null,
      });
      return await res.json();
    },
    onSuccess: (_, variables) => {
      if (variables.completed) {
        setCompletedSteps(prev => [...prev, variables.step]);
      } else {
        setCompletedSteps(prev => prev.filter(s => s !== variables.step));
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loyiha yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-4">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Loyihani yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!userProjectId && !startProjectMutation.isPending) {
    startProjectMutation.mutate();
  }

  const progress = (completedSteps.length / project.steps.length) * 100;
  const isCompleted = completedSteps.length === project.steps.length;

  const handleStepComplete = (step: number) => {
    const isCurrentlyCompleted = completedSteps.includes(step);
    updateProgressMutation.mutate({ step, completed: !isCurrentlyCompleted });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className={
              project.difficulty === "oson" ? "bg-green-500/10 text-green-600" :
              project.difficulty === "o'rta" ? "bg-yellow-500/10 text-yellow-600" :
              "bg-red-500/10 text-red-600"
            }>
              {project.difficulty}
            </Badge>
            <Badge variant="outline">{project.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{project.duration}</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {project.title}
          </h1>
          <p className="text-muted-foreground mt-2">{project.description}</p>
        </div>
      </div>

      {isCompleted && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <PartyPopper className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600 dark:text-green-400 font-medium">
            🎉 Tabriklaymiz! Siz bu loyihani muvaffaqiyatli yakunladingiz!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Progress
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {completedSteps.length} / {project.steps.length} bosqich
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Loyiha maqsadi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{project.objective}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Bosqichlar</h2>
          {project.hints && project.hints.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              data-testid="button-toggle-hints"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHints ? "Maslahatlarni yashirish" : "Maslahatlar"}
            </Button>
          )}
        </div>

        {showHints && project.hints && project.hints.length > 0 && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {project.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {project.steps.map((step, index) => {
          const isStepCompleted = completedSteps.includes(index);
          const isCurrentStep = currentStep === index;

          return (
            <Card 
              key={index}
              className={`${isCurrentStep ? 'ring-2 ring-primary' : ''} ${isStepCompleted ? 'bg-green-500/5' : ''}`}
              data-testid={`step-card-${index}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {isStepCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    Bosqich {index + 1}
                  </CardTitle>
                  <div className="flex gap-2">
                    {!isCurrentStep && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(index)}
                        data-testid={`button-view-step-${index}`}
                      >
                        Ko'rish
                      </Button>
                    )}
                    <Button
                      variant={isStepCompleted ? "secondary" : "default"}
                      size="sm"
                      onClick={() => handleStepComplete(index)}
                      data-testid={`button-complete-step-${index}`}
                    >
                      {isStepCompleted ? "Bajarildi ✓" : "Bajarildi deb belgilash"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {isCurrentStep && (
                <CardContent className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{step}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Boshlang'ich kod
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={project.starterCode} showLineNumbers />
        </CardContent>
      </Card>

      <ExerciseZone
        title="Loyihani bajaring"
        instructions={project.requirements.join("\n")}
        initialCode={project.starterCode}
        expectedOutput=""
      />

      {isCompleted && project.solutionCode && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Yechim kodi (Faqat taqqoslash uchun)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>
                Eslatma: Bu kod faqat sizning yechimingiz bilan taqqoslash uchun. 
                Avval o'zingiz harakat qiling!
              </AlertDescription>
            </Alert>
            <CodeBlock code={project.solutionCode} showLineNumbers />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
