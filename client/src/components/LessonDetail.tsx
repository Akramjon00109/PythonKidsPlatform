import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Star, Lightbulb, Code2 } from "lucide-react";
import CodeBlock from "./CodeBlock";
import ExerciseZone from "./ExerciseZone";

interface LessonDetailProps {
  lessonNumber: number;
  title: string;
  difficulty: string;
  duration: string;
  onBack?: () => void;
}

export default function LessonDetail({
  lessonNumber,
  title,
  difficulty,
  duration,
  onBack
}: LessonDetailProps) {
  const handleBack = () => {
    console.log("Going back to lessons");
    onBack?.();
  };

  const sampleCode = `# O'zgaruvchi yaratish
ism = "Ali"
yosh = 12

# Ekranga chiqarish
print("Mening ismim:", ism)
print("Yoshim:", yosh)`;

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
              Dars #{lessonNumber}
            </Badge>
            <Badge className="gap-1" data-testid="badge-difficulty">
              <Star className="h-3 w-3" />
              {difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span data-testid="text-duration">{duration}</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground md:text-4xl" data-testid="text-lesson-title">
            {title}
          </h1>
        </div>
      </div>
      
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Nimani o'rganamiz?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="leading-relaxed text-card-foreground">
            Bu darsda biz o'zgaruvchilar haqida bilib olamiz. O'zgaruvchi - bu ma'lumotni saqlaydigan quti kabi narsa.
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
            <li>O'zgaruvchi nima va nima uchun kerak</li>
            <li>O'zgaruvchi qanday yaratiladi</li>
            <li>O'zgaruvchiga qiymat qanday beriladi</li>
            <li>O'zgaruvchini qanday ishlatish mumkin</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            Tushuntirish
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-card-foreground">
            O'zgaruvchi - bu kompyuter xotirasida ma'lumot saqlaydigan joy. Misol uchun, qutiga biror narsani solib, unga nom berishingiz mumkin. Keyinchalik bu nom orqali qutidagi narsani topish oson bo'ladi.
          </p>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Misol:</h3>
            <CodeBlock code={sampleCode} showLineNumbers />
          </div>
          
          <p className="leading-relaxed text-muted-foreground">
            Bu kodda biz ikki ta o'zgaruvchi yaratdik: <code className="px-2 py-1 rounded bg-muted font-mono text-sm">ism</code> va <code className="px-2 py-1 rounded bg-muted font-mono text-sm">yosh</code>. 
            Keyin ularni print funksiyasi yordamida ekranga chiqardik.
          </p>
        </CardContent>
      </Card>
      
      <ExerciseZone
        title="O'zingiz sinab ko'ring!"
        instructions="O'zingiz haqingizda ma'lumot bering. Ismingiz va yoshingizni o'zgaruvchilarda saqlang va ekranga chiqaring."
        initialCode={`# O'zgaruvchilarni yarating
ism = "Sizning ismingiz"
yosh = 0

# Print qiling`}
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