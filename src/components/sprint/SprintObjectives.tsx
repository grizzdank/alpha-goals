
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SprintObjectiveItem, Objective } from "./SprintObjectiveItem";

interface SprintObjectivesProps {
  objectives: Objective[];
  onAddObjective: () => void;
  onRemoveObjective: (id: string) => void;
  onUpdateObjective: (id: string, field: keyof Objective, value: string | number) => void;
}

export function SprintObjectivesSection({
  objectives,
  onAddObjective,
  onRemoveObjective,
  onUpdateObjective
}: SprintObjectivesProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Sprint Objectives</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddObjective}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Objective
        </Button>
      </div>
      
      <div className="space-y-4">
        {objectives.map((objective) => (
          <SprintObjectiveItem
            key={objective.id}
            objective={objective}
            onRemove={onRemoveObjective}
            onUpdate={onUpdateObjective}
          />
        ))}
      </div>
    </div>
  );
}
