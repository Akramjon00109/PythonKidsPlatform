import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ 
  code, 
  language = "python",
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    console.log("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <Card className="relative overflow-hidden bg-muted/50" data-testid="code-block">
      <div className="absolute right-2 top-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          data-testid="button-copy-code"
          className="h-8 gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span className="text-xs">Nusxalandi!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="text-xs">Nusxalash</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="overflow-x-auto p-6 pt-14">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-foreground">
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="select-none text-muted-foreground">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </Card>
  );
}