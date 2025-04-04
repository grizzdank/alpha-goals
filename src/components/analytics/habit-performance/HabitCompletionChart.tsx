import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from "recharts";
import { useAuth } from "@/hooks/use-auth";
import { habitService, type HabitWithCompletions } from "@/services/habitService";
import { toast } from "sonner";

interface ChartData {
  name: string;
  completionRate: number;
  streak: number;
}

export const HabitCompletionChart = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHabitData = async () => {
      if (!user?.id) return;

      try {
        const habits = await habitService.getActiveHabits(user.id);
        const data = habits.map(habit => {
          const totalDays = habit.habit_completions.length;
          const completedDays = habit.habit_completions.filter(c => c.completed_date).length;
          const completionRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

          return {
            name: habit.title,
            completionRate,
            streak: habit.streak
          };
        });

        setChartData(data);
      } catch (error) {
        console.error('Error loading habit data:', error);
        toast.error('Failed to load habit performance data');
      } finally {
        setIsLoading(false);
      }
    };

    loadHabitData();
  }, [user?.id]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Habit Completion Rates</CardTitle>
          <CardDescription>Loading habit performance data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] sm:h-[400px] w-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Completion Rates</CardTitle>
        <CardDescription>Percentage of completion for each habit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] sm:h-[400px] w-full overflow-x-auto pb-6">
          <div className="min-w-[500px] h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="completionRate" name="Completion Rate %" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="streak" name="Current Streak" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
