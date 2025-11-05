import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, Target, Loader2, AlertCircle, Lightbulb } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LessonCard from "./LessonCard";
import TipCard from "./TipCard";
import type { Lesson, Tip } from "@shared/schema";

async function fetchDailyLessons(): Promise<Lesson[]> {
  const response = await fetch("/api/lessons/daily");
  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error("Darslarni yuklashda xatolik");
  }
  return response.json();
}

async function fetchDailyTips(): Promise<Tip[]> {
  const response = await fetch("/api/tips/daily");
  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error("Maslahatlarni yuklashda xatolik");
  }
  return response.json();
}

async function fetchStats() {
  const response = await fetch("/api/stats");
  if (!response.ok) {
    throw new Error("Statistikani yuklashda xatolik");
  }
  return response.json();
}

async function generateDailyLessons() {
  const response = await fetch("/api/lessons/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date: new Date().toISOString().split("T")[0] })
  });
  if (!response.ok) {
    throw new Error("Darslarni yaratishda xatolik");
  }
  return response.json();
}

async function generateDailyTips() {
  const response = await fetch("/api/tips/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date: new Date().toISOString().split("T")[0] })
  });
  if (!response.ok) {
    throw new Error("Maslahatlarni yaratishda xatolik");
  }
  return response.json();
}

interface DailyDashboardProps {
  onLessonSelect?: (lessonId: string) => void;
}

export default function DailyDashboard({ onLessonSelect }: DailyDashboardProps) {
  const today = new Date().toLocaleDateString("uz-UZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const { data: lessons = [], isLoading, error, refetch: refetchLessons } = useQuery<Lesson[]>({
    queryKey: ["dailyLessons"],
    queryFn: fetchDailyLessons,
    refetchOnWindowFocus: false,
  });

  const { data: tips = [], isLoading: tipsLoading, refetch: refetchTips } = useQuery<Tip[]>({
    queryKey: ["dailyTips"],
    queryFn: fetchDailyTips,
    refetchOnWindowFocus: false,
  });

  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    refetchOnWindowFocus: false,
  });

  const handleGenerateLessons = async () => {
    try {
      await generateDailyLessons();
      await Promise.all([refetchLessons(), refetchStats()]);
    } catch (error) {
      console.error("Error generating lessons:", error);
    }
  };

  const handleGenerateTips = async () => {
    try {
      await generateDailyTips();
      await refetchTips();
    } catch (error) {
      console.error("Error generating tips:", error);
    }
  };

  if (isLoading || tipsLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Xatolik</AlertTitle>
        <AlertDescription>
          Darslarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
        </AlertDescription>
      </Alert>
    );
  }

  if (lessons.length === 0 && tips.length === 0) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid="text-today-date">{today}</span>
          </div>
          
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Bugungi darslar va maslahatlar
          </h2>
        </div>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Bugun uchun kontent topilmadi</AlertTitle>
          <AlertDescription>
            Bugun uchun hali darslar va maslahatlar yaratilmagan. Server avtomatik ravishda yaratadi yoki siz quyidagi tugmalardan birini bosing.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4">
          <Button onClick={handleGenerateLessons} size="lg">
            Darslar yaratish
          </Button>
          <Button onClick={handleGenerateTips} size="lg" variant="outline">
            Maslahatlar yaratish
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span data-testid="text-today-date">{today}</span>
        </div>
        
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Bugungi darslar
        </h2>
        
        <p className="text-lg leading-relaxed text-muted-foreground">
          Bugun {lessons.length} ta qiziqarli dars tayyorladik. Keling, birga Python o'rganamiz!
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-elevate">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="text-total-lessons">{stats?.lessonsToday || lessons.length}</p>
              <p className="text-sm text-muted-foreground">Jami darslar</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/10">
              <TrendingUp className="h-6 w-6 text-chart-4" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="text-completed-lessons">0</p>
              <p className="text-sm text-muted-foreground">Tugallangan</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-elevate">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/10">
              <Calendar className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="text-streak-days">1</p>
              <p className="text-sm text-muted-foreground">Kun ketma-ket</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {lessons.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard 
              key={lesson.id} 
              id={lesson.lessonNumber}
              title={lesson.title}
              description={lesson.description}
              difficulty={lesson.difficulty as "oson" | "o'rta" | "qiyin"}
              duration={lesson.duration}
              icon={lesson.iconUrl || undefined}
              onStart={() => onLessonSelect?.(lesson.id)}
            />
          ))}
        </div>
      )}

      {tips.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Lightbulb className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Bugungi maslahatlar
              </h3>
              <p className="text-sm text-muted-foreground">
                Dasturlashni 0 dan boshlash uchun foydali maslahatlar
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip) => (
              <TipCard 
                key={tip.id} 
                id={tip.tipNumber}
                title={tip.title}
                content={tip.content}
                category={tip.category}
                icon={tip.iconUrl || undefined}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}