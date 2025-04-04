import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EmptyHabitCard } from "./EmptyHabitCard";
import { HabitProgress } from "./HabitProgress";
import { getDomainColors } from "@/utils/habitUtils";
import { habitService, type HabitWithCompletions } from "@/services/habitService";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface DailyHabitCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function DailyHabitCard({ className = "", style }: DailyHabitCardProps) {
  const { user } = useAuth();
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);
  const [activeHabit, setActiveHabit] = useState<HabitWithCompletions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load habits from Supabase
  useEffect(() => {
    const loadHabits = async () => {
      if (!user?.id) return;
      
      try {
        const activeHabits = await habitService.getActiveHabits(user.id);
        setHabits(activeHabits);
        
        // Find the pinned habit
        const pinnedHabit = activeHabits.find(h => h.is_pinned && h.active);
        
        // If no habit is pinned, use the first active habit
        const defaultHabit = pinnedHabit || activeHabits.find(h => h.active);
        
        if (defaultHabit) {
          setActiveHabit(defaultHabit);
        }
      } catch (error) {
        console.error('Error loading habits:', error);
        toast.error('Failed to load habits');
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, [user?.id]);
  
  // Handle toggle day completion
  const handleToggleDay = async (date: string) => {
    if (!activeHabit) return;
    
    try {
      await habitService.toggleHabitCompletion(activeHabit.id, date);
      const updatedHabit = await habitService.getHabitById(activeHabit.id);
      
      if (updatedHabit) {
        setActiveHabit(updatedHabit);
        setHabits(habits.map(h => h.id === activeHabit.id ? updatedHabit : h));
        
        const isCompleted = updatedHabit.habit_completions.some(
          completion => completion.completed_date === date
        );
        
        if (isCompleted) {
          toast.success(`"${updatedHabit.title}" marked as completed`);
        } else {
          toast.info(`"${updatedHabit.title}" marked as not completed`);
        }
      }
    } catch (error) {
      console.error('Error toggling habit completion:', error);
      toast.error('Failed to update habit completion');
    }
  };
  
  // Get domain from habit or default to "mind"
  const domain = activeHabit?.domain || "mind";
  
  // Get domain colors
  const colors = getDomainColors(domain);
  
  if (isLoading) {
    return (
      <Card className={`overflow-hidden hover-lift ${className}`} style={style}>
        <CardHeader className={`bg-primary/10 p-4 md:p-6`}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg md:text-xl">Daily Habit</CardTitle>
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Loading habits...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // If no active habit is found
  if (!activeHabit) {
    return (
      <Card className={`overflow-hidden hover-lift ${className}`} style={style}>
        <CardHeader className={`bg-primary/10 p-4 md:p-6`}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg md:text-xl">Daily Habit</CardTitle>
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="h-5 w-5" />
            </div>
          </div>
        </CardHeader>
        
        <EmptyHabitCard />
      </Card>
    );
  }
  
  return (
    <Card className={`overflow-hidden hover-lift ${className}`} style={style}>
      <CardHeader className={`${colors.bg} p-4 md:p-6`}>
        <div className="flex justify-between items-center">
          <CardTitle className={`text-lg md:text-xl ${colors.text}`}>Daily Habit</CardTitle>
          <div className={`h-9 w-9 rounded-full ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
            <CalendarDays className={`h-5 w-5 ${colors.text}`} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        {/* Pinned Habit */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{activeHabit.title}</h3>
              {activeHabit.is_pinned && (
                <span className="text-xs text-muted-foreground">(Pinned)</span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-1">{activeHabit.description}</p>
          </div>
          <div className={`${colors.pill} px-3 py-1 rounded-full text-sm font-medium`}>
            {activeHabit.streak} day streak
          </div>
        </div>
        
        <HabitProgress 
          activeHabit={activeHabit}
          habitCompletions={activeHabit.habit_completions}
          handleToggleDay={handleToggleDay}
          colorClass={colors.completed}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <Button asChild variant="outline" className="w-full">
            <Link to="/habits">
              Manage Habits
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link to="/habits?tab=new">
              <Plus className="h-4 w-4 mr-1" />
              New Habit
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
