"use client";

import { useState } from "react";
import { StoryPromptForm } from "./story-prompt-form";
import { StyleSelector } from "./style-selector";
import { PanelCountSelector } from "./panel-count-selector";
import { ComicPreview } from "./comic-preview";
import { ComicEditor } from "./comic-editor";
import { ExportOptions } from "./export-options";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { generateMockComic } from "@/lib/mock-comic-generator";
import { ComicStyle, ComicPanel } from "@/lib/types";

export function ComicCreator() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<ComicStyle>("manga");
  const [panelCount, setPanelCount] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedPanels, setGeneratedPanels] = useState<ComicPanel[]>([]);
  const [activeTab, setActiveTab] = useState("create");

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Please enter a story prompt",
        description: "Your prompt helps our AI create a unique comic for you.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate progress updates
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);

    try {
      // Mock API call with artificial delay
      const panels = await generateMockComic(prompt, style, panelCount);

      // Ensure we reach 100% before finishing
      setGenerationProgress(100);
      setTimeout(() => {
        setGeneratedPanels(panels);
        setIsGenerating(false);
        setActiveTab("edit");
        toast({
          title: "Comic generated successfully!",
          description: "You can now edit and customize your comic.",
        });
      }, 500);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your comic. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    } finally {
      clearInterval(interval);
    }
  };

  const handleRegeneratePanel = async (index: number) => {
    toast({
      title: "Regenerating panel...",
      description: `Recreating panel #${index + 1}`,
    });
    
    // Mock regeneration of a single panel
    setTimeout(() => {
      const newPanels = [...generatedPanels];
      const newPanel = {
        ...newPanels[index],
        imageUrl: `/panel-${style}-${Math.floor(Math.random() * 5) + 1}.jpg`,
      };
      newPanels[index] = newPanel;
      setGeneratedPanels(newPanels);
      
      toast({
        title: "Panel regenerated",
        description: "Your panel has been updated.",
      });
    }, 1500);
  };

  const handleReorderPanels = (reorderedPanels: ComicPanel[]) => {
    setGeneratedPanels(reorderedPanels);
  };

  return (
    <Card className="border shadow-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="edit" disabled={generatedPanels.length === 0}>Edit & Export</TabsTrigger>
        </TabsList>
        
        <CardContent className="p-6">
          <TabsContent value="create" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
              <div className="space-y-6">
                <StoryPromptForm 
                  prompt={prompt} 
                  setPrompt={setPrompt}
                  disabled={isGenerating}
                />
                
                <StyleSelector 
                  selectedStyle={style} 
                  onSelectStyle={setStyle}
                  disabled={isGenerating}
                />
                
                <PanelCountSelector 
                  count={panelCount} 
                  setCount={setPanelCount}
                  disabled={isGenerating}
                />
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !prompt}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? "Generating Comic..." : "Generate Comic"}
                </Button>
                
                {isGenerating && (
                  <div className="space-y-2">
                    <Progress value={generationProgress} />
                    <p className="text-xs text-center text-muted-foreground">
                      {generationProgress < 100 
                        ? "Creating your comic masterpiece..." 
                        : "Almost done!"}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="order-first md:order-last">
                <ComicPreview 
                  prompt={prompt}
                  style={style}
                  panelCount={panelCount}
                  isGenerating={isGenerating}
                  panels={generatedPanels}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="edit" className="mt-0">
            {generatedPanels.length > 0 && (
              <div className="space-y-6">
                <ComicEditor 
                  panels={generatedPanels}
                  onReorderPanels={handleReorderPanels}
                  onRegeneratePanel={handleRegeneratePanel}
                />
                
                <ExportOptions panels={generatedPanels} />
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}