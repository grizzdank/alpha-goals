import React from "react";
import { HabitCalendarWeek } from "./HabitCalendarWeek";
import type { HabitWithCompletions } from "@/services/habitService";
import type { Database } from "@/integrations/supabase/types";

type HabitCompletion = Database['public']['Tables']['habit_completions']['Row'];

interface HabitProgressProps {
  activeHabit: HabitWithCompletions;
  habitCompletions: HabitCompletion[];
  handleToggleDay: (date: string) => void;
  colorClass: string;
}

export function HabitProgress({ 
  activeHabit, 
  habitCompletions, 
  handleToggleDay, 
  colorClass 
}: HabitProgressProps) {
  return (
    <div className="border border-border/40 rounded-lg p-4 mb-4">
      <div className="mb-3">
        <h4 className="font-medium">Weekly Progress</h4>
      </div>
      
      <HabitCalendarWeek 
        habitCompletions={habitCompletions} 
        colorClass={colorClass} 
        onToggleDay={handleToggleDay}
      />
    </div>
  );
}
