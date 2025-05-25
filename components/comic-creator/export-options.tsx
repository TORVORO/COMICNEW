"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ComicPanel } from "@/lib/types";
import { Download, Share2, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExportOptionsProps {
  panels: ComicPanel[];
}

export function ExportOptions({ panels }: ExportOptionsProps) {
  const { toast } = useToast();
  
  const handleExport = (format: 'png' | 'pdf') => {
    // Mock export functionality
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your comic will be downloaded shortly.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export complete!",
        description: `Your comic has been exported as ${format.toUpperCase()}.`,
      });
    }, 2000);
  };
  
  const handleShare = () => {
    // Mock share functionality
    toast({
      title: "Share your comic",
      description: "Sharing options coming soon!",
    });
  };
  
  const handleEmbed = () => {
    // Mock embed functionality
    toast({
      title: "Embed code generated",
      description: "Embed code copied to clipboard.",
    });
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium text-lg">Export & Share</h3>
          <p className="text-sm text-muted-foreground">
            Download your comic or share it with others.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Download Options</h4>
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => handleExport('png')}
                    >
                      <Download size={16} />
                      PNG
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download as PNG image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => handleExport('pdf')}
                    >
                      <Download size={16} />
                      PDF
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download as PDF document</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Share Options</h4>
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handleShare}
                    >
                      <Share2 size={16} />
                      Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share to social media</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={handleEmbed}
                    >
                      <Code size={16} />
                      Embed
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get embed code for your website</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}