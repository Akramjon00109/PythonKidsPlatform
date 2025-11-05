import { Button } from "@/components/ui/button";
import { Sparkles, Users, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/Children_learning_Python_together_15f080db.png";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Har kuni yangi darslar!</span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Har kuni Python o'rganamiz!
            </h1>
            
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              10+ yoshdagi bolalar uchun maxsus tayyorlangan darslar. Kuniga 5 ta yangi mavzu bilan dasturlashni oson va qiziqarli o'rganing!
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" data-testid="button-start-lessons" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Bugungi darslarni boshlash
              </Button>
              <Button size="lg" variant="outline" data-testid="button-how-it-works">
                Qanday ishlaydi?
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">10,000+</p>
                  <p className="text-sm text-muted-foreground">O'quvchilar</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/10">
                  <TrendingUp className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">5 ta</p>
                  <p className="text-sm text-muted-foreground">Kunlik dars</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={heroImage} 
                alt="Bolalar Python o'rganyapti"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}