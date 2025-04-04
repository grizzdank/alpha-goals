import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { habitService, type HabitWithCompletions } from "@/services/habitService";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const HabitDetailsTable = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      if (!user?.id) return;

      try {
        const allHabits = await habitService.getAllHabits(user.id);
        setHabits(allHabits);
      } catch (error) {
        console.error('Error loading habits:', error);
        toast.error('Failed to load habit details');
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, [user?.id]);

  const calculateStats = (habit: HabitWithCompletions) => {
    const totalDays = habit.habit_completions.length;
    const completed = habit.habit_completions.filter(c => c.completed_date).length;
    const missed = totalDays - completed;
    const successRate = totalDays > 0 ? Math.round((completed / totalDays) * 100) : 0;

    return {
      completed,
      missed,
      total: totalDays,
      successRate,
      status: getStatus(successRate)
    };
  };

  const getStatus = (rate: number) => {
    if (rate >= 80) return "Excellent";
    if (rate >= 60) return "Good";
    if (rate >= 40) return "Fair";
    return "Needs Focus";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "text-green-600";
      case "Good": return "text-blue-600";
      case "Fair": return "text-yellow-600";
      case "Needs Focus": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Habit Tracking Details</CardTitle>
          <CardDescription>Loading habit performance data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Habit Tracking Details</CardTitle>
        <CardDescription>Detailed breakdown of habit completion status and performance</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Habit</TableHead>
                <TableHead className="text-right">Completed</TableHead>
                <TableHead className="text-right">Missed</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {habits.map((habit) => {
                const stats = calculateStats(habit);
                return (
                  <TableRow key={habit.id}>
                    <TableCell className="font-medium">{habit.title}</TableCell>
                    <TableCell className="text-right">{stats.completed}</TableCell>
                    <TableCell className="text-right">{stats.missed}</TableCell>
                    <TableCell className="text-right">{stats.total}</TableCell>
                    <TableCell className="text-right">{stats.successRate}%</TableCell>
                    <TableCell className={`text-right font-medium ${getStatusColor(stats.status)}`}>
                      {stats.status}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
