import { Button } from "@/components/ui/button";
import { Send, Book, HelpCircle, Users } from "lucide-react";
import robotMascot from "@assets/generated_images/Python_learning_robot_mascot_542fdcf4.png";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={robotMascot} alt="" className="h-10 w-10" />
              <div>
                <h3 className="text-lg font-bold text-foreground">Python O'rganish</h3>
                <p className="text-xs text-muted-foreground">Bolalar uchun</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              10+ yoshdagi bolalar uchun Python dasturlash tilini o'rgatish platformasi
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Platformani o'rganing</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="link-about">
                  Biz haqimizda
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="link-how-it-works">
                  Qanday ishlaydi?
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="link-lessons">
                  Barcha darslar
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Resurslar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="h-auto p-0 gap-2 text-muted-foreground hover:text-foreground" data-testid="link-telegram">
                  <Send className="h-4 w-4" />
                  Telegram Bot
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 gap-2 text-muted-foreground hover:text-foreground" data-testid="link-help">
                  <HelpCircle className="h-4 w-4" />
                  Yordam markazi
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 gap-2 text-muted-foreground hover:text-foreground" data-testid="link-parents">
                  <Users className="h-4 w-4" />
                  Ota-onalar uchun
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Aloqa</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">10,000+</p>
                  <p className="text-xs text-muted-foreground">Bolalar o'rganyapti</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full gap-2" data-testid="button-join-telegram">
                <Send className="h-4 w-4" />
                Telegram'ga qo'shilish
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Python O'rganish Platformasi. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}