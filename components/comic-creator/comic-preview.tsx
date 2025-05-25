"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ComicStyle, ComicPanel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ComicPreviewProps {
  prompt: string;
  style: ComicStyle;
  panelCount: number;
  isGenerating: boolean;
  panels: ComicPanel[];
}

export function ComicPreview({ 
  prompt, 
  style, 
  panelCount, 
  isGenerating,
  panels 
}: ComicPreviewProps) {
  // Determine grid layout based on panel count
  const getGridClass = () => {
    if (panels.length === 0) {
      // Preview mode grid layout
      switch (panelCount) {
        case 1: return "grid-cols-1";
        case 2: return "grid-cols-1 md:grid-cols-2";
        case 3: return "grid-cols-1 md:grid-cols-3";
        case 4: return "grid-cols-2";
        case 5:
        case 6: return "grid-cols-2 md:grid-cols-3";
        case 7:
        case 8: return "grid-cols-2 md:grid-cols-4";
        case 9:
        case 10:
        case 11:
        case 12: return "grid-cols-3 md:grid-cols-4";
        default: return "grid-cols-2";
      }
    } else {
      // When we have actual panels
      switch (panels.length) {
        case 1: return "grid-cols-1";
        case 2: return "grid-cols-1 md:grid-cols-2";
        case 3: return "grid-cols-1 md:grid-cols-3";
        case 4: return "grid-cols-2";
        case 5:
        case 6: return "grid-cols-2 md:grid-cols-3";
        case 7:
        case 8: return "grid-cols-2 md:grid-cols-4";
        case 9:
        case 10:
        case 11:
        case 12: return "grid-cols-3 md:grid-cols-4";
        default: return "grid-cols-2";
      }
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium text-lg">Preview</h3>
          {prompt ? (
            <p className="text-sm text-muted-foreground line-clamp-2">{prompt}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Enter a prompt to create your comic
            </p>
          )}
        </div>
        
        <div className={cn(
          "grid gap-2 w-full", 
          getGridClass()
        )}>
          {isGenerating ? (
            // Loading skeletons during generation
            Array.from({ length: panelCount }).map((_, index) => (
              <div key={index} className="aspect-square bg-muted rounded-md overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            ))
          ) : panels.length > 0 ? (
            // Display generated panels
            panels.map((panel, index) => (
              <div 
                key={index}
                className="aspect-square bg-card border rounded-md overflow-hidden shadow-sm flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground/50">Panel {index + 1}</span>
                </div>
              </div>
            ))
          ) : (
            // Empty placeholder panels
            Array.from({ length: panelCount }).map((_, index) => (
              <div 
                key={index}
                className="aspect-square bg-card border rounded-md overflow-hidden shadow-sm flex items-center justify-center"
              >
                <span className="text-muted-foreground/50">Panel {index + 1}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}