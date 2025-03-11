
import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface TranscriptionDisplayProps {
  transcription: string;
}

const TranscriptionDisplay = ({ transcription }: TranscriptionDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="mt-8 animate-fade-in">
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Transcription Result</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={transcription}
            readOnly
            className="min-h-[200px] resize-y focus-visible:ring-0 border-none bg-slate-50 dark:bg-slate-800/50"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscriptionDisplay;
