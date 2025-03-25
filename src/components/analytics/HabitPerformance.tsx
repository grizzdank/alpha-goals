
import React from "react";
import { HabitCompletionChart } from "./habit-performance/HabitCompletionChart";
import { StatusDistributionChart } from "./habit-performance/StatusDistributionChart";
import { HabitDetailsTable } from "./habit-performance/HabitDetailsTable";

export const HabitPerformance = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Habit Performance Analysis</h2>
      
      {/* Habit Completion Chart */}
      <HabitCompletionChart />

      {/* Status Distribution Pie Chart and Habits Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusDistributionChart />
        <HabitDetailsTable />
      </div>
    </div>
  );
};
