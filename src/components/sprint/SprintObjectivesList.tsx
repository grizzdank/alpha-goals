import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from '@/integrations/supabase/types';

type SprintObjective = Database['public']['Tables']['sprint_objectives']['Row'];

interface SprintObjectivesListProps {
  objectives: SprintObjective[];
  onObjectiveUpdate?: (objectiveId: string, progress: number) => Promise<void>;
}

export const SprintObjectivesList: React.FC<SprintObjectivesListProps> = ({
  objectives,
  onObjectiveUpdate
}) => {
  const handleProgressClick = async (objective: SprintObjective, newProgress: number) => {
    if (!onObjectiveUpdate) return;
    await onObjectiveUpdate(objective.id, newProgress);
  };

  return (
    <div className="space-y-4">
      {objectives.map((objective) => (
        <Card key={objective.id} className="relative">
          <CardHeader>
            <CardTitle className="text-lg">{objective.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {objective.description && (
              <p className="text-sm text-muted-foreground mb-4">{objective.description}</p>
            )}
            <div 
              className="relative cursor-pointer" 
              onClick={() => handleProgressClick(objective, objective.progress < 100 ? 100 : 0)}
            >
              <Progress value={objective.progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-right mt-1">
                {objective.progress}% Complete
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 