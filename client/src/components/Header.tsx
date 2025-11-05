import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import robotMascot from "@assets/generated_images/Python_learning_robot_mascot_542fdcf4.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={robotMascot} alt="" className="h-10 w-10" />
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">Python O'rganish</h1>
            <p className="text-xs text-muted-foreground">Bolalar uchun</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="icon" variant="ghost" data-testid="button-menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}