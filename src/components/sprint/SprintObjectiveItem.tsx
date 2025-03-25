
import React from "react";
import { Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export type Objective = {
  id: string;
  title: string;
  description: string;
  progress: number;
};

interface SprintObjectiveItemProps {
  objective: Objective;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Objective, value: string | number) => void;
}

export function SprintObjectiveItem({ objective, onRemove, onUpdate }: SprintObjectiveItemProps) {
  return (
    <Card className="bg-white/60 dark:bg-gray-800/60">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-2">
              <Label htmlFor={`objective-title-${objective.id}`}>Title</Label>
              <Input
                id={`objective-title-${objective.id}`}
                value={objective.title}
                onChange={(e) => onUpdate(objective.id, "title", e.target.value)}
                placeholder="Objective title"
                className="mt-1"
              />
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => onRemove(objective.id)}
              className="text-destructive hover:text-destructive/90 mt-6"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`objective-desc-${objective.id}`}>Description</Label>
            <Input
              id={`objective-desc-${objective.id}`}
              value={objective.description}
              onChange={(e) => onUpdate(objective.id, "description", e.target.value)}
              placeholder="Brief description"
              className="mt-1"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor={`objective-progress-${objective.id}`}>Progress</Label>
              <span className="text-sm font-medium">{objective.progress}%</span>
            </div>
            <Input
              id={`objective-progress-${objective.id}`}
              type="range"
              min="0"
              max="100"
              value={objective.progress}
              onChange={(e) => onUpdate(objective.id, "progress", parseInt(e.target.value))}
              className="mt-1"
            />
            <Progress value={objective.progress} className="h-2 mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
