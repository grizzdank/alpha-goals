import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Milestone, Plus, Target } from 'lucide-react';
import { missionService, type VisionGoalWithMilestones } from '@/services/missionService';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Define timeframe mappings
const TIMEFRAMES = [
  { display: '1 Year', value: 'oneYear' },
  { display: '5 Years', value: 'fiveYear' },
  { display: '10 Years', value: 'tenYear' }
];

export function VisionGoalsEditor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [goals, setGoals] = useState<VisionGoalWithMilestones[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(TIMEFRAMES[0].value);
  const [newMilestone, setNewMilestone] = useState('');

  useEffect(() => {
    const loadVisionGoals = async () => {
      if (!user?.id) return;
      
      try {
        const loadedGoals = await missionService.getVisionGoals(user.id);
        setGoals(loadedGoals);
      } catch (error) {
        console.error('Error loading vision goals:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your vision goals',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadVisionGoals();
  }, [user?.id, toast]);

  const handleUpdateGoal = async (timeframe: string, statement: string) => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      await missionService.updateVisionGoal(user.id, timeframe, statement);
      const updatedGoals = await missionService.getVisionGoals(user.id);
      setGoals(updatedGoals);
      toast({
        title: 'Success',
        description: 'Your vision goal has been updated',
      });
    } catch (error) {
      console.error('Error saving vision goal:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your vision goal',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddMilestone = async (goalId: string) => {
    if (!newMilestone.trim()) return;

    try {
      await missionService.addVisionMilestone(goalId, newMilestone);
      const updatedGoals = await missionService.getVisionGoals(user!.id);
      setGoals(updatedGoals);
      setNewMilestone('');
      toast({
        title: 'Success',
        description: 'Milestone added successfully',
      });
    } catch (error) {
      console.error('Error adding milestone:', error);
      toast({
        title: 'Error',
        description: 'Failed to add milestone',
        variant: 'destructive'
      });
    }
  };

  const handleToggleMilestone = async (milestoneId: string, completed: boolean) => {
    try {
      await missionService.toggleMilestoneCompletion(milestoneId, completed);
      const updatedGoals = await missionService.getVisionGoals(user!.id);
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Error toggling milestone:', error);
      toast({
        title: 'Error',
        description: 'Failed to update milestone',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    try {
      await missionService.deleteMilestone(milestoneId);
      const updatedGoals = await missionService.getVisionGoals(user!.id);
      setGoals(updatedGoals);
      toast({
        title: 'Success',
        description: 'Milestone deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting milestone:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete milestone',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-24 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedGoal = goals.find(g => g.timeframe === selectedTimeframe);
  const selectedTimeframeDisplay = TIMEFRAMES.find(t => t.value === selectedTimeframe)?.display || selectedTimeframe;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle>Vision Goals</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            {TIMEFRAMES.map(({ display, value }) => (
              <Button
                key={value}
                variant={selectedTimeframe === value ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe(value)}
              >
                {display}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <Label>Vision Statement</Label>
            <Textarea
              placeholder={`What do you want to achieve in ${selectedTimeframeDisplay}?`}
              value={selectedGoal?.statement || ''}
              onChange={(e) => handleUpdateGoal(selectedTimeframe, e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Milestones</Label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a new milestone"
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  className="w-64"
                />
                <Button
                  size="sm"
                  onClick={() => selectedGoal && handleAddMilestone(selectedGoal.id)}
                  disabled={!newMilestone.trim() || !selectedGoal}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[200px] pr-4">
              {selectedGoal?.vision_milestones.map(milestone => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-2 py-2"
                >
                  <Checkbox
                    checked={milestone.completed}
                    onCheckedChange={(checked) => 
                      handleToggleMilestone(milestone.id, checked as boolean)
                    }
                  />
                  <span className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                    {milestone.milestone}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => handleDeleteMilestone(milestone.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}