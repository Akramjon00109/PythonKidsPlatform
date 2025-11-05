import { useState } from "react";
import { Menu, Home, BookOpen, Lightbulb, Info } from "lucide-react";
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

export default function Header() {
  const [open, setOpen] = useState(false);

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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" data-testid="button-menu">
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
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setOpen(false)}
                  data-testid="link-home"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Bosh sahifa
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