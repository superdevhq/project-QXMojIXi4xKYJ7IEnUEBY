
import { useState } from "react";
import { Upload, Headphones, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import FileUploader from "@/components/FileUploader";
import TranscriptionDisplay from "@/components/TranscriptionDisplay";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setError(null);
    setTranscription("");
  };

  const handleTranscribe = async () => {
    if (!file) {
      setError("Please upload an audio or video file first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the OpenAI Whisper API
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a transcription result
      setTranscription("This is a simulated transcription of your audio file. In a real implementation, this would be the actual transcription from OpenAI's Whisper model. The transcription would include all the spoken content from your audio or video file, formatted as text.");
      
      toast({
        title: "Transcription complete",
        description: "Your file has been successfully transcribed.",
      });
    } catch (err) {
      setError("Failed to transcribe the file. Please try again.");
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: "There was an error transcribing your file.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Audio Transcription
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Upload your audio or video file and get an accurate transcription powered by OpenAI's Whisper model.
        </p>
        
        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <FileUploader 
                onFileChange={handleFileChange} 
                file={file}
                isLoading={isLoading}
              />
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle size={18} />
                  <p>{error}</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleTranscribe} 
                  disabled={!file || isLoading}
                  className="px-8"
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Transcribing...</span>
                      <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    </>
                  ) : (
                    <>
                      <Headphones className="mr-2 h-4 w-4" />
                      Transcribe Audio
                    </>
                  )}
                </Button>
              </div>
              
              {transcription && (
                <TranscriptionDisplay transcription={transcription} />
              )}
            </CardContent>
          </Card>
          
          <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
            <p>Supported formats: MP3, MP4, WAV, M4A, WEBM</p>
            <p className="mt-1">Maximum file size: 25MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
