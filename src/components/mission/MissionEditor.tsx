import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Target } from 'lucide-react';
import { missionService } from '@/services/missionService';
import { useAuth } from '@/hooks/use-auth';

export function MissionEditor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statement, setStatement] = useState('');

  useEffect(() => {
    const loadMissionStatement = async () => {
      if (!user?.id) return;
      
      try {
        const mission = await missionService.getMissionStatement(user.id);
        if (mission) {
          setStatement(mission.statement);
        }
      } catch (error) {
        console.error('Error loading mission statement:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your mission statement',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMissionStatement();
  }, [user?.id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsSaving(true);
    try {
      await missionService.updateMissionStatement(user.id, statement);
      toast({
        title: 'Success',
        description: 'Your mission statement has been updated',
      });
    } catch (error) {
      console.error('Error saving mission statement:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your mission statement',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle>Your Mission Statement</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your mission statement should reflect your purpose and the impact you want to make in the world.
              Consider what you learned from your Ikigai reflection when crafting your statement.
            </p>
            <Textarea
              placeholder="Enter your mission statement..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}