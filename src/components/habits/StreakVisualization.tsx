
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Check, X } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HabitDay {
  date: string;
  completed: boolean;
}

interface StreakVisualizationProps {
  streak: number;
  habitDays?: HabitDay[];
  className?: string;
}

export function StreakVisualization({ 
  streak, 
  habitDays = [], 
  className 
}: StreakVisualizationProps) {
  // Get the last 7 days for streak visualization
  const getLast7Days = () => {
    const days: { date: string; dayName: string; completed?: boolean }[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      
      // Find if this day exists in habitDays
      const habitDay = habitDays.find(day => day.date === dateString);
      
      days.push({
        date: dateString,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: habitDay ? habitDay.completed : undefined
      });
    }
    
    return days;
  };

  const last7Days = getLast7Days();
  
  return (
    <div className={cn("mt-2", className)}>
      <div className="flex items-center mb-1.5 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 mr-1.5" />
        <span className="font-medium">{streak} day streak</span>
      </div>
      
      <TooltipProvider>
        <div className="flex space-x-1">
          {last7Days.map((day, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div 
                  className={cn(
                    "h-6 w-6 rounded-sm flex items-center justify-center text-xs",
                    day.completed === undefined 
                      ? "bg-muted text-muted-foreground" 
                      : day.completed 
                        ? "bg-green-500/20 text-green-600 dark:bg-green-950 dark:text-green-400" 
                        : "bg-red-500/10 text-red-500 dark:bg-red-950 dark:text-red-400"
                  )}
                >
                  {day.completed === undefined ? (
                    day.dayName.charAt(0)
                  ) : day.completed ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <X className="h-3.5 w-3.5" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {day.dayName}, {new Date(day.date).toLocaleDateString()}
                  {day.completed !== undefined && (
                    <>: {day.completed ? "Completed" : "Missed"}</>
                  )}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
