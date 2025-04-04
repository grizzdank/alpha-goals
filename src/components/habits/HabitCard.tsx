import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Pin, Brain, Heart, Target, Users, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HabitWithCompletions } from '@/services/habitService';
import { HabitStreak } from './HabitStreak';

interface HabitCardProps {
  habit: HabitWithCompletions;
  onToggleCompletion: (habitId: string, date: string) => Promise<void>;
  onTogglePin?: (habitId: string) => Promise<void>;
  onEdit: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  className?: string;
}

const domainIcons = {
  mind: Brain,
  body: Heart,
  purpose: Target,
  relationships: Users
};

export function HabitCard({ habit, onToggleCompletion, onTogglePin, onEdit, onDelete, className }: HabitCardProps) {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.habit_completions.some(
    completion => completion.completed_date === today
  );

  const DomainIcon = domainIcons[habit.domain];

  // Convert habit_completions to the format expected by HabitStreak
  const completions = habit.habit_completions.map(completion => ({
    date: completion.completed_date,
    completed: completion.is_completed
  }));

  const handleToggleCompletion = async () => {
    await onToggleCompletion(habit.id, today);
  };

  const handleTogglePin = async () => {
    if (onTogglePin) {
      await onTogglePin(habit.id);
    }
  };

  return (
    <Card className={cn(
      'transition-all duration-200',
      isCompletedToday && 'bg-primary/5',
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <DomainIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">{habit.title}</CardTitle>
          </div>
          {onTogglePin && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleTogglePin}
              className={cn(
                'h-8 w-8',
                habit.is_pinned && 'text-primary'
              )}
            >
              <Pin className="h-4 w-4" />
            </Button>
          )}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(habit.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(habit.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {habit.description && (
            <p className="text-sm text-muted-foreground">
              {habit.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={isCompletedToday ? 'default' : 'outline'}>
                {isCompletedToday ? 'Completed' : 'Not Completed'}
              </Badge>
              {habit.streak > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  {habit.streak} day streak
                </Badge>
              )}
            </div>
            
            <Button
              variant={isCompletedToday ? 'outline' : 'default'}
              onClick={handleToggleCompletion}
            >
              {isCompletedToday ? 'Undo' : 'Complete'}
            </Button>
          </div>
          
          <HabitStreak 
            habitName={habit.title}
            completions={completions}
          />
        </div>
      </CardContent>
    </Card>
  );
}
