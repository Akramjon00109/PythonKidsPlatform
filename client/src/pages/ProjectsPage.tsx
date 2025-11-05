import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Rocket, Code2 } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@shared/schema";

async function fetchProjects(category?: string, difficulty?: string): Promise<Project[]> {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (difficulty) params.append("difficulty", difficulty);
  
  const url = `/api/projects${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Loyihalarni yuklashda xatolik");
  }
  
  return response.json();
}

interface ProjectsPageProps {
  onProjectSelect: (projectId: string) => void;
}

export default function ProjectsPage({ onProjectSelect }: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(undefined);

  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects", selectedCategory, selectedDifficulty],
    queryFn: () => fetchProjects(selectedCategory, selectedDifficulty),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
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
          Loyihalarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Mini Loyihalar
            </h1>
            <p className="text-muted-foreground">
              Real loyihalar bilan dasturlashni o'rganing
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 p-6 rounded-xl border">
          <div className="flex items-start gap-4">
            <Code2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Haqiqiy dasturchi bo'ling!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bu loyihalar orqali siz o'rgangan bilimlaringizni amaliyotda qo'llaysiz. 
                Har bir loyiha bosqichma-bosqich yo'riqnoma bilan keladi va real kod yozishni o'rgatadi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="all" onClick={() => { setSelectedCategory(undefined); setSelectedDifficulty(undefined); }}>
            Barchasi
          </TabsTrigger>
          <TabsTrigger value="oson" onClick={() => { setSelectedCategory(undefined); setSelectedDifficulty("oson"); }}>
            Oson
          </TabsTrigger>
          <TabsTrigger value="o'rta" onClick={() => { setSelectedCategory(undefined); setSelectedDifficulty("o'rta"); }}>
            O'rta
          </TabsTrigger>
          <TabsTrigger value="qiyin" onClick={() => { setSelectedCategory(undefined); setSelectedDifficulty("qiyin"); }}>
            Qiyin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(undefined)}
              data-testid="filter-all-categories"
            >
              Barcha toifalar
            </Button>
            <Button
              variant={selectedCategory === "o'yin" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("o'yin")}
              data-testid="filter-category-game"
            >
              🎮 O'yinlar
            </Button>
            <Button
              variant={selectedCategory === "kalkulyator" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("kalkulyator")}
              data-testid="filter-category-calculator"
            >
              🧮 Kalkulyatorlar
            </Button>
            <Button
              variant={selectedCategory === "veb" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("veb")}
              data-testid="filter-category-web"
            >
              🌐 Veb
            </Button>
            <Button
              variant={selectedCategory === "amaliy" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("amaliy")}
              data-testid="filter-category-practical"
            >
              🛠️ Amaliy
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16">
              <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Loyihalar topilmadi
              </h3>
              <p className="text-muted-foreground">
                Tez orada yangi loyihalar qo'shiladi!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={onProjectSelect}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="oson" className="space-y-6">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Oson loyihalar topilmadi</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={onProjectSelect}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="o'rta" className="space-y-6">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">O'rta loyihalar topilmadi</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={onProjectSelect}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="qiyin" className="space-y-6">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Qiyin loyihalar topilmadi</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={onProjectSelect}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
