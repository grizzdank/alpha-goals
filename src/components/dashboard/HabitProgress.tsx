
import React from "react";
import { HabitCalendarWeek } from "./HabitCalendarWeek";
import { Habit, HabitDay } from "@/utils/habitUtils";

interface HabitProgressProps {
  activeHabit: Habit;
  habitDays: HabitDay[];
  handleToggleDay: (date: string) => void;
  colorClass: string;
}

export function HabitProgress({ 
  activeHabit, 
  habitDays, 
  handleToggleDay, 
  colorClass 
}: HabitProgressProps) {
  return (
    <div className="border border-border/40 rounded-lg p-4 mb-4">
      <div className="mb-3">
        <h4 className="font-medium">Weekly Progress</h4>
      </div>
      
      <HabitCalendarWeek 
        habitDays={habitDays} 
        colorClass={colorClass} 
        onToggleDay={handleToggleDay}
      />
    </div>
  );
}
