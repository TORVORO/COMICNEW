"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const presetCounts = [2, 3, 4, 6];
const maxPanels = 12;

interface PanelCountSelectorProps {
  count: number;
  setCount: (count: number) => void;
  disabled?: boolean;
}

export function PanelCountSelector({ 
  count, 
  setCount,
  disabled = false
}: PanelCountSelectorProps) {
  const [customMode, setCustomMode] = useState(false);
  
  const handleCustomCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxPanels) {
      setCount(value);
    }
  };
  
  const toggleCustomMode = () => {
    setCustomMode(!customMode);
    if (customMode && !presetCounts.includes(count)) {
      setCount(4); // Reset to default when leaving custom mode
    }
  };
  
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Panel Count</Label>
      
      {!customMode ? (
        <>
          <div className="grid grid-cols-4 gap-2">
            {presetCounts.map((presetCount) => (
              <Button
                key={presetCount}
                type="button"
                onClick={() => setCount(presetCount)}
                variant={count === presetCount ? "default" : "outline"}
                className={cn(
                  "h-16 text-lg",
                  count === presetCount && "font-bold"
                )}
                disabled={disabled}
              >
                {presetCount}
              </Button>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2"
            onClick={toggleCustomMode}
            disabled={disabled}
          >
            Use custom count
          </Button>
        </>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={1}
              max={maxPanels}
              value={count}
              onChange={handleCustomCountChange}
              className="h-16 text-lg text-center"
              disabled={disabled}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Min: 1</span>
            <span>Max: {maxPanels}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={toggleCustomMode}
            disabled={disabled}
          >
            Use preset counts
          </Button>
        </div>
      )}
    </div>
  );
}