
import React from "react";
import { CheckCircle } from "lucide-react";
import { HabitDay } from "@/utils/habitUtils";

interface HabitCalendarWeekProps {
  habitDays: HabitDay[];
  colorClass: string;
}

export function HabitCalendarWeek({ habitDays, colorClass }: HabitCalendarWeekProps) {
  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Get last 7 days for the habit calendar
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const day = habitDays.find(day => day.date === dateString);
    return {
      date: dateString,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: day ? day.completed : false
    };
  }).reverse();
  
  return (
    <div className="grid grid-cols-7 gap-1 mt-2">
      {last7Days.map((day, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground mb-1">{day.dayName}</span>
          <div 
            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs
              ${day.completed ? `${colorClass} text-white` : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground'}`}
          >
            {day.completed ? <CheckCircle className="h-4 w-4" /> : '-'}
          </div>
        </div>
      ))}
    </div>
  );
}
