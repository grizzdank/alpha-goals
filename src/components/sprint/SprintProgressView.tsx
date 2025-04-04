import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { sprintService } from '@/services/sprintService';
import { useToast } from '@/components/ui/use-toast';

interface SprintProgressViewProps {
  sprintId: string;
}

export const SprintProgressView: React.FC<SprintProgressViewProps> = ({ sprintId }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const sprintProgress = await sprintService.calculateSprintProgress(sprintId);
        setProgress(sprintProgress);
      } catch (error) {
        console.error('Error loading sprint progress:', error);
        toast({
          title: 'Error',
          description: 'Failed to load sprint progress',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [sprintId, toast]);

  if (isLoading) {
    return <Progress value={0} className="w-full" />;
  }

  return (
    <div className="space-y-2">
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-muted-foreground text-right">{progress}% Complete</p>
    </div>
  );
}; 