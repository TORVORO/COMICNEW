"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface StoryPromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export function StoryPromptForm({ prompt, setPrompt, disabled = false }: StoryPromptFormProps) {
  const maxLength = 200;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setPrompt(value);
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="prompt" className="text-base font-medium">Story Prompt</Label>
        <span className="text-xs text-muted-foreground">
          {prompt.length}/{maxLength} characters
        </span>
      </div>
      
      <Textarea
        id="prompt"
        placeholder="Describe your comic story here... (e.g., 'A superhero cat saving the city from evil vacuum cleaners')"
        value={prompt}
        onChange={handleChange}
        disabled={disabled}
        className="min-h-[100px] resize-none"
      />
      
      <p className="text-xs text-muted-foreground">
        Be descriptive but concise. The AI works best with clear, vivid descriptions.
      </p>
    </div>
  );
}