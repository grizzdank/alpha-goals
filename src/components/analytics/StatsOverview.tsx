import React, { useState, useEffect } from "react";
import { TrendingUp, BarChart3, Target, Award } from "lucide-react";
import { StatCard } from "./StatCard";
import { useAuth } from "@/hooks/use-auth";
import { sprintService } from "@/services/sprintService";
import { habitService } from "@/services/habitService";
import { toast } from "sonner";

export const StatsOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    sprintCompletion: 0,
    habitConsistency: 0,
    completedObjectives: "0/0",
    bestDomain: "N/A"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!user?.id) return;

      try {
        // Get current sprint data
        const currentSprint = await sprintService.getCurrentSprint(user.id);
        const sprintProgress = currentSprint ? await sprintService.calculateSprintProgress(currentSprint.id) : 0;

        // Get habit consistency
        const habits = await habitService.getActiveHabits(user.id);
        const completionRates = habits.map(habit => {
          const totalDays = habit.habit_completions.length;
          const completedDays = habit.habit_completions.filter(c => c.completed_date).length;
          return totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
        });
        const avgConsistency = completionRates.length > 0
          ? Math.round(completionRates.reduce((a, b) => a + b, 0) / completionRates.length)
          : 0;

        // Get objectives completion
        const objectives = currentSprint?.objectives || [];
        const completedCount = objectives.filter(obj => obj.progress === 100).length;
        const totalCount = objectives.length;

        // Calculate best performing domain
        const domainStats = habits.reduce((acc, habit) => {
          const completionRate = habit.habit_completions.filter(c => c.completed_date).length / Math.max(1, habit.habit_completions.length);
          acc[habit.domain] = (acc[habit.domain] || 0) + completionRate;
          return acc;
        }, {} as Record<string, number>);

        const bestDomain = Object.entries(domainStats).reduce((best, [domain, rate]) => 
          rate > (best.rate || 0) ? { domain, rate } : best
        , { domain: "N/A", rate: 0 }).domain;

        setStats({
          sprintCompletion: Math.round(sprintProgress),
          habitConsistency: avgConsistency,
          completedObjectives: `${completedCount}/${totalCount}`,
          bestDomain: bestDomain.charAt(0).toUpperCase() + bestDomain.slice(1)
        });
      } catch (error) {
        console.error('Error loading stats:', error);
        toast.error('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <StatCard 
            key={i}
            title="Loading..."
            value="..."
            description="Loading data"
            icon={<div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />}
            color="bg-gray-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Sprint Completion" 
        value={`${stats.sprintCompletion}%`}
        description="Current sprint progress" 
        icon={<TrendingUp className="h-5 w-5" />} 
        color="bg-purple-500"
      />
      <StatCard 
        title="Habit Consistency" 
        value={`${stats.habitConsistency}%`}
        description="Daily habits completed" 
        icon={<BarChart3 className="h-5 w-5" />} 
        color="bg-blue-500"
      />
      <StatCard 
        title="Key Objectives" 
        value={stats.completedObjectives}
        description="Major objectives completed" 
        icon={<Target className="h-5 w-5" />} 
        color="bg-green-500"
      />
      <StatCard 
        title="Best Performing Area" 
        value={stats.bestDomain}
        description="Highest completion domain" 
        icon={<Award className="h-5 w-5" />} 
        color="bg-amber-500"
      />
    </div>
  );
};
