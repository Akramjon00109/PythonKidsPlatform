import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { runPythonCode } from "@/lib/pyodide";

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
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  useEffect(() => {
    import("@/lib/pyodide").then(({ loadPyodide }) => {
      loadPyodide()
        .then(() => setIsPyodideLoading(false))
        .catch(() => setIsPyodideLoading(false));
    });
  }, []);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setError(null);
    setShowSuccess(false);
    
    try {
      const result = await runPythonCode(code);
      
      if (result.error) {
        setError(result.error);
      } else {
        setOutput(result.output);
        
        if (expectedOutput && result.output.trim() === expectedOutput.trim()) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 4000);
        }
      }
    } catch (err: any) {
      setError("Kod ishga tushirishda xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setError(null);
    setShowSuccess(false);
  };

  return (
    <Card className="overflow-hidden" data-testid="exercise-zone">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
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
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Kodingizni yozing:</label>
            {isPyodideLoading && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Python yuklanmoqda...
              </span>
            )}
          </div>
          <div className="border rounded-lg overflow-hidden bg-background">
            <Editor
              height="300px"
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
                tabSize: 4,
              }}
              loading={
                <div className="flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground">Muharrir yuklanmoqda...</p>
                </div>
              }
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleRun}
            disabled={isRunning || !code.trim() || isPyodideLoading}
            className="gap-2"
            data-testid="button-run-code"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Ishga tushmoqda..." : isPyodideLoading ? "Tayyorlanmoqda..." : "Ishga tushirish"}
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
        
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <p className="font-medium text-destructive">Xatolik yuz berdi</p>
                  <pre className="text-sm text-destructive/90 whitespace-pre-wrap font-mono">
                    {error}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {output && !error && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Natija:</label>
            <Card className="bg-muted/50 border-primary/20">
              <CardContent className="p-4">
                <pre className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap" data-testid="text-output">
                  {output}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
        
        {showSuccess && (
          <Card className="border-green-500/50 bg-green-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">🎉 Ajoyib! Siz to'g'ri bajardingiz!</span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}