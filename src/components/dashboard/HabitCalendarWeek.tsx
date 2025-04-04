import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Database } from "@/integrations/supabase/types";

type HabitCompletion = Database['public']['Tables']['habit_completions']['Row'];

interface HabitCalendarWeekProps {
  habitCompletions: HabitCompletion[];
  colorClass: string;
  onToggleDay?: (date: string) => void;
  readOnly?: boolean;
}

export function HabitCalendarWeek({ 
  habitCompletions, 
  colorClass, 
  onToggleDay,
  readOnly = false 
}: HabitCalendarWeekProps) {
  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Get last 7 days for the habit calendar
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const completed = habitCompletions.some(completion => completion.completed_date === dateString);
    return {
      date: dateString,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      completed,
      isToday: dateString === today
    };
  }).reverse();
  
  const handleDayClick = (date: string) => {
    if (!readOnly && onToggleDay) {
      onToggleDay(date);
    }
  };
  
  return (
    <div className="grid grid-cols-7 gap-1 mt-2">
      {last7Days.map((day, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground mb-1">{day.dayName}</span>
                <button 
                  type="button"
                  onClick={() => handleDayClick(day.date)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs transition-colors
                    ${day.completed ? `${colorClass} text-white` : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground'}
                    ${!readOnly ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
                    ${day.isToday ? 'ring-2 ring-offset-2 ring-offset-background ring-primary/40' : ''}
                  `}
                  disabled={readOnly}
                  aria-label={`${day.dayName}, ${day.completed ? 'completed' : 'not completed'}${!readOnly ? ', click to toggle' : ''}`}
                >
                  {day.completed ? 
                    <CheckCircle className="h-4 w-4" /> : 
                    <Circle className="h-4 w-4" />
                  }
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {day.dayName}, {new Date(day.date).toLocaleDateString()}
                {day.completed ? ": Completed" : ": Not completed"} 
                {!readOnly && " (Click to toggle)"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
