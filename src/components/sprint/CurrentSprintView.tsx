import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { SprintProgressView } from './SprintProgressView';
import { SprintObjectivesList } from './SprintObjectivesList';
import { sprintService, type SprintWithObjectives } from '@/services/sprintService';
import { useAuth } from '@/hooks/use-auth';

interface CurrentSprintViewProps {
  onEdit?: () => void;
  onAlphaScoreUpdate?: () => void;
}

export const CurrentSprintView: React.FC<CurrentSprintViewProps> = ({
  onEdit,
  onAlphaScoreUpdate,
}) => {
  const [currentSprint, setCurrentSprint] = useState<SprintWithObjectives | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadCurrentSprint = async () => {
      if (!user?.id) return;
      
      try {
        const sprint = await sprintService.getCurrentSprint(user.id);
        setCurrentSprint(sprint);
      } catch (error) {
        console.error('Error loading current sprint:', error);
        toast({
          title: 'Error',
          description: 'Failed to load current sprint',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentSprint();
  }, [user?.id, toast]);

  const handleObjectiveUpdate = async (objectiveId: string, progress: number) => {
    try {
      await sprintService.updateSprintObjective(objectiveId, { progress });
      if (currentSprint && user?.id) {
        const updatedSprint = await sprintService.getCurrentSprint(user.id);
        setCurrentSprint(updatedSprint);
      }
    } catch (error) {
      console.error('Error updating objective:', error);
      toast({
        title: 'Error',
        description: 'Failed to update objective',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-24 flex items-center justify-center">
            <p className="text-muted-foreground">Loading sprint...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentSprint) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No active sprint found.</p>
            {onEdit && (
              <Button onClick={onEdit}>
                Create Sprint
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const daysLeft = Math.ceil(
    (new Date(currentSprint.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const isNearingEnd = daysLeft <= 3;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{currentSprint.name}</CardTitle>
            {currentSprint.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {currentSprint.description}
              </p>
            )}
          </div>
          {onEdit && (
            <Button variant="outline" onClick={onEdit}>
              Edit Sprint
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <SprintProgressView sprintId={currentSprint.id} />
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {daysLeft} days remaining
            </p>
            {isNearingEnd && onAlphaScoreUpdate && (
              <Button variant="outline" onClick={onAlphaScoreUpdate}>
                Record Alpha Score
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Link to="/analytics" className="flex-1">
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </Link>
            <Link to="/sprints" className="flex-1">
              <Button variant="outline" className="w-full">
                Sprint Archive
              </Button>
            </Link>
          </div>
        </div>

        <SprintObjectivesList 
          objectives={currentSprint.sprint_objectives} 
          onObjectiveUpdate={handleObjectiveUpdate}
        />
      </CardContent>
    </Card>
  );
}; 