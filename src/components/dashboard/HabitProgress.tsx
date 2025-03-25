
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { HabitCalendarWeek } from "./HabitCalendarWeek";
import { Habit, HabitDay } from "@/utils/habitUtils";

interface HabitProgressProps {
  activeHabit: Habit;
  habitDays: HabitDay[];
  handleToggleHabit: () => void;
  todayCompleted: boolean;
  colorClass: string;
}

export function HabitProgress({ 
  activeHabit, 
  habitDays, 
  handleToggleHabit, 
  todayCompleted, 
  colorClass 
}: HabitProgressProps) {
  return (
    <div className="border border-border/40 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium">Today's Progress</h4>
        <div className="flex items-center">
          <Checkbox 
            id={`today-habit-${activeHabit.id}`} 
            checked={todayCompleted}
            onCheckedChange={handleToggleHabit}
            className={`mr-2 data-[state=checked]:${colorClass.split(' ')[1]}`}
          />
          <label 
            htmlFor={`today-habit-${activeHabit.id}`} 
            className="text-sm cursor-pointer"
          >
            Mark as completed
          </label>
        </div>
      </div>
      
      <HabitCalendarWeek habitDays={habitDays} colorClass={colorClass} />
    </div>
  );
}
