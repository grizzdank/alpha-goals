
import React from "react";
import { HabitCompletionChart } from "./habit-performance/HabitCompletionChart";
import { HabitDetailsTable } from "./habit-performance/HabitDetailsTable";

export const HabitPerformance = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Habit Performance Analysis</h2>
      
      {/* Habit Completion Chart */}
      <HabitCompletionChart />

      {/* Habits Table - now full width */}
      <div className="w-full">
        <HabitDetailsTable />
      </div>
    </div>
  );
};
