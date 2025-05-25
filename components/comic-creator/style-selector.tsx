"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ComicStyle } from "@/lib/types";

interface StyleOption {
  value: ComicStyle;
  label: string;
  description: string;
}

const styleOptions: StyleOption[] = [
  {
    value: "manga",
    label: "Manga",
    description: "Japanese comic style with bold lines and expressive characters"
  },
  {
    value: "realistic",
    label: "Realistic",
    description: "Detailed, lifelike artwork with natural proportions and shading"
  },
  {
    value: "soccer",
    label: "Soccer",
    description: "Sports comic style focused on dynamic action and movement"
  }
];

interface StyleSelectorProps {
  selectedStyle: ComicStyle;
  onSelectStyle: (style: ComicStyle) => void;
  disabled?: boolean;
}

export function StyleSelector({ 
  selectedStyle, 
  onSelectStyle,
  disabled = false
}: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Comic Style</Label>
      
      <RadioGroup 
        value={selectedStyle} 
        onValueChange={(value) => onSelectStyle(value as ComicStyle)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        disabled={disabled}
      >
        {styleOptions.map((style) => (
          <div key={style.value} className="relative">
            <RadioGroupItem
              value={style.value}
              id={`style-${style.value}`}
              className="peer sr-only"
              disabled={disabled}
            />
            <Label
              htmlFor={`style-${style.value}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="mb-2 w-full aspect-video bg-muted rounded-sm flex items-center justify-center">
                <span className="text-muted-foreground/70 text-xs">{style.label} style</span>
              </div>
              <div className="w-full text-center">
                <div className="font-medium">{style.label}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {style.description}
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}