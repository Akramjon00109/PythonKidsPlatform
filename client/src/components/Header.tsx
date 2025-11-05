import { useState } from "react";
import { Menu, Home, BookOpen, Lightbulb, Info, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import robotMascot from "@assets/generated_images/Python_learning_robot_mascot_542fdcf4.png";

interface HeaderProps {
  onNavigate?: (view: "home" | "projects") => void;
  currentView?: "home" | "projects";
}

export default function Header({ onNavigate, currentView = "home" }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const handleNavigation = (view: "home" | "projects") => {
    onNavigate?.(view);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => handleNavigation("home")}
          data-testid="header-logo"
        >
          <img src={robotMascot} alt="" className="h-10 w-10" />
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">Python O'rganish</h1>
            <p className="text-xs text-muted-foreground">Bolalar uchun</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              onClick={() => handleNavigation("home")}
              data-testid="nav-home"
            >
              <Home className="mr-2 h-4 w-4" />
              Bosh sahifa
            </Button>
            <Button
              variant={currentView === "projects" ? "default" : "ghost"}
              onClick={() => handleNavigation("projects")}
              data-testid="nav-projects"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Loyihalar
            </Button>
          </div>
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" data-testid="button-menu" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menyu</SheetTitle>
                <SheetDescription>
                  Python o'rganish platformasi
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <Button
                  variant={currentView === "home" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => handleNavigation("home")}
                  data-testid="link-home"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Bosh sahifa
                </Button>
                <Button
                  variant={currentView === "projects" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => handleNavigation("projects")}
                  data-testid="link-projects"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Mini Loyihalar
                </Button>
                <div className="border-t pt-4">
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Ma'lumot</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent">
                      <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Har kuni yangi darslar</p>
                        <p className="text-xs text-muted-foreground">10+ yoshdagi bolalar uchun maxsus tayyorlangan</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent">
                      <Lightbulb className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Foydali maslahatlar</p>
                        <p className="text-xs text-muted-foreground">Kundalik 5 ta yangi maslahat</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent">
                      <Info className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Amaliy mashqlar</p>
                        <p className="text-xs text-muted-foreground">O'rgangan bilimlarni mustahkamlang</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}