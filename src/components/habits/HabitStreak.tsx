import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HabitStreakProps {
  habitName: string;
  completions: Array<{
    date: string;
    completed: boolean;
  }>;
  className?: string;
}

export function HabitStreak({ habitName, completions, className }: HabitStreakProps) {
  // Calculate current streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = completions.length - 1; i >= 0; i--) {
      const completion = completions[i];
      const completionDate = new Date(completion.date);
      completionDate.setHours(0, 0, 0, 0);

      if (!completion.completed) break;
      
      // Check if this completion is consecutive
      if (i < completions.length - 1) {
        const nextDate = new Date(completions[i + 1].date);
        nextDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((nextDate.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays !== 1) break;
      }

      streak++;
    }
    return streak;
  };

  const currentStreak = calculateStreak();
  const progress = (currentStreak / 60) * 100;
  const daysLeft = Math.max(0, 60 - currentStreak);

  // Group completions by week for the grid
  const weeks = completions.reduce((acc, completion, index) => {
    const weekIndex = Math.floor(index / 7);
    if (!acc[weekIndex]) {
      acc[weekIndex] = [];
    }
    acc[weekIndex].push(completion);
    return acc;
  }, [] as Array<typeof completions>);

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{habitName}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={currentStreak >= 60 ? "default" : "secondary"}>
              {currentStreak} day streak
            </Badge>
            {currentStreak >= 60 && (
              <Badge variant="default" className="bg-green-500">
                Habit Formed!
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>

          {/* Days remaining */}
          {daysLeft > 0 && (
            <p className="text-sm text-muted-foreground">
              {daysLeft} days until habit formation
            </p>
          )}

          {/* Contribution grid */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const date = new Date(day.date);
                  return (
                    <TooltipProvider key={day.date}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={cn(
                              "w-3 h-3 rounded-sm",
                              day.completed 
                                ? "bg-primary" 
                                : "bg-secondary/50",
                              "hover:ring-2 hover:ring-offset-2 hover:ring-primary/50 transition-all"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {date.toLocaleDateString()}: {day.completed ? 'Completed' : 'Not completed'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 