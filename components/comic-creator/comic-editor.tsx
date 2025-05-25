"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Move } from "lucide-react";
import { ComicPanel } from "@/lib/types";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface ComicEditorProps {
  panels: ComicPanel[];
  onReorderPanels: (reorderedPanels: ComicPanel[]) => void;
  onRegeneratePanel: (index: number) => void;
}

export function ComicEditor({ 
  panels, 
  onReorderPanels,
  onRegeneratePanel
}: ComicEditorProps) {
  // Setup dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = panels.findIndex(panel => `panel-${panel.id}` === active.id);
      const newIndex = panels.findIndex(panel => `panel-${panel.id}` === over.id);
      
      const reorderedPanels = arrayMove(panels, oldIndex, newIndex);
      onReorderPanels(reorderedPanels);
    }
  };

  // Determine grid layout based on panel count
  const getGridClass = () => {
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
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium text-lg">Edit Panels</h3>
          <p className="text-sm text-muted-foreground">
            Drag to reorder panels. Click regenerate to update individual panels.
          </p>
        </div>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={panels.map(panel => `panel-${panel.id}`)}
            strategy={rectSortingStrategy}
          >
            <div className={cn(
              "grid gap-4 w-full", 
              getGridClass()
            )}>
              {panels.map((panel, index) => (
                <SortablePanel
                  key={panel.id}
                  id={`panel-${panel.id}`}
                  index={index}
                  panel={panel}
                  onRegenerate={() => onRegeneratePanel(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}

interface SortablePanelProps {
  id: string;
  index: number;
  panel: ComicPanel;
  onRegenerate: () => void;
}

function SortablePanel({ id, index, panel, onRegenerate }: SortablePanelProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "aspect-square relative group border rounded-md overflow-hidden shadow-sm",
        isDragging ? "opacity-75" : "opacity-100"
      )}
    >
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <span className="text-muted-foreground/50">Panel {index + 1}</span>
      </div>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-background/80 flex flex-col items-center justify-center space-y-2 transition-opacity">
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full"
          onClick={onRegenerate}
        >
          <RefreshCw size={16} />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full cursor-grab"
          {...listeners}
        >
          <Move size={16} />
        </Button>
      </div>
    </div>
  );
}