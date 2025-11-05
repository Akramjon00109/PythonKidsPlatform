import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ExerciseZoneProps {
  title: string;
  instructions: string;
  initialCode?: string;
  expectedOutput?: string;
}

export default function ExerciseZone({
  title,
  instructions,
  initialCode = "",
  expectedOutput = ""
}: ExerciseZoneProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    console.log("Running code:", code);
    
    setTimeout(() => {
      const mockOutput = "Salom, Python!\nMening ismim Ali\nYoshim 12";
      setOutput(mockOutput);
      setIsRunning(false);
      
      if (mockOutput.includes("Salom")) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }, 1000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setShowSuccess(false);
    console.log("Code reset");
  };

  return (
    <Card className="overflow-hidden" data-testid="exercise-zone">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Play className="h-4 w-4" />
          </div>
          {title}
        </CardTitle>
        <p className="leading-relaxed text-muted-foreground">{instructions}</p>
      </CardHeader>
      
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Kodingizni yozing:</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="# Python kodini bu yerga yozing..."
            className="min-h-[200px] font-mono text-sm"
            data-testid="input-code"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleRun}
            disabled={isRunning || !code.trim()}
            className="gap-2"
            data-testid="button-run-code"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Ishga tushmoqda..." : "Ishga tushirish"}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2"
            data-testid="button-reset-code"
          >
            <RotateCcw className="h-4 w-4" />
            Qaytadan boshlash
          </Button>
        </div>
        
        {output && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Natija:</label>
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <pre className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap" data-testid="text-output">
                  {output}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
        
        {showSuccess && (
          <div className="flex items-center gap-2 rounded-lg bg-chart-4/10 p-4 text-chart-4">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Ajoyib! Siz to'g'ri bajardingiz!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}