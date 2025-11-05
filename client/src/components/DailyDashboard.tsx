import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, Target } from "lucide-react";
import LessonCard from "./LessonCard";
import variablesIcon from "@assets/generated_images/Variables_concept_illustration_5088f7a0.png";
import loopsIcon from "@assets/generated_images/Loops_concept_illustration_5d3a56d2.png";
import conditionalsIcon from "@assets/generated_images/Conditionals_concept_illustration_1179c1af.png";

export default function DailyDashboard() {
  const today = new Date().toLocaleDateString("uz-UZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const lessons = [
    {
      id: 1,
      title: "Python nima?",
      description: "Python dasturlash tili bilan tanishish. Nima uchun Python o'rganish muhim va qiziqarli ekanligini bilib olamiz.",
      difficulty: "oson" as const,
      duration: "10 daqiqa",
      icon: variablesIcon
    },
    {
      id: 2,
      title: "O'zgaruvchilar",
      description: "O'zgaruvchilar yordamida ma'lumotlarni saqlashni o'rganamiz. Quti misoli orqali tushuntiramiz.",
      difficulty: "oson" as const,
      duration: "15 daqiqa",
      icon: variablesIcon
    },
    {
      id: 3,
      title: "Print funksiyasi",
      description: "Ekranga matn va raqamlarni chiqarishni o'rganamiz. Birinchi dasturimizni yozamiz!",
      difficulty: "oson" as const,
      duration: "12 daqiqa",
      icon: variablesIcon
    },
    {
      id: 4,
      title: "Raqamlar va matematika",
      description: "Python yordamida hisob-kitob qilishni o'rganamiz. Qo'shish, ayirish, ko'paytirish va bo'lish.",
      difficulty: "o'rta" as const,
      duration: "18 daqiqa",
      icon: loopsIcon
    },
    {
      id: 5,
      title: "Kiritish va chiqarish",
      description: "Foydalanuvchidan ma'lumot so'rash va javob berishni o'rganamiz. Interaktiv dasturlar yaratamiz!",
      difficulty: "o'rta" as const,
      duration: "20 daqiqa",
      icon: conditionalsIcon
    }
  ];

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
          Bugun 5 ta qiziqarli dars tayyorladik. Keling, birga Python o'rganamiz!
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-elevate">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground" data-testid="text-total-lessons">5</p>
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
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} {...lesson} />
        ))}
      </div>
    </div>
  );
}