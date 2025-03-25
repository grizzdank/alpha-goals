
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EmptyHabitCard } from "./EmptyHabitCard";
import { HabitProgress } from "./HabitProgress";
import { 
  Habit, 
  HabitDay, 
  generateSampleDays, 
  getDomainColors, 
  toggleHabitCompletion 
} from "@/utils/habitUtils";

interface DailyHabitCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function DailyHabitCard({ className = "", style }: DailyHabitCardProps) {
  // State for habits and active habit
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeHabit, setActiveHabit] = useState<Habit | null>(null);
  const [habitDays, setHabitDays] = useState<HabitDay[]>([]);
  
  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Load habits from localStorage
  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits);
      setHabits(parsedHabits);
      
      // Find the pinned habit
      const pinnedHabit = parsedHabits.find((h: Habit) => h.isPinned && h.active);
      
      // If no habit is pinned, use the first active habit
      const defaultHabit = pinnedHabit || parsedHabits.find((h: Habit) => h.active);
      
      if (defaultHabit) {
        setActiveHabit(defaultHabit);
        
        // Generate sample days data if not present
        if (!defaultHabit.days) {
          const sampleDays = generateSampleDays(defaultHabit.streak);
          setHabitDays(sampleDays);
        } else {
          setHabitDays(defaultHabit.days);
        }
      }
    }
  }, [today]);
  
  // Handle toggle habit completion
  const handleToggleHabit = () => {
    if (!activeHabit) return;
    
    toggleHabitCompletion(activeHabit, habitDays, (updatedHabit, updatedDays) => {
      // Update state
      setHabitDays(updatedDays);
      setActiveHabit(updatedHabit);
      
      // Update the habit in the habits array
      const updatedHabits = habits.map(h => 
        h.id === activeHabit.id ? updatedHabit : h
      );
      
      setHabits(updatedHabits);
      
      // Save to localStorage
      localStorage.setItem('habits', JSON.stringify(updatedHabits));
    });
  };
  
  // Get domain from habit or default to "mind"
  const domain = activeHabit?.domain || "mind";
  
  // Get domain colors
  const colors = getDomainColors(domain);
  
  // Find today's record
  const todayRecord = habitDays.find(day => day.date === today);
  
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
              <span className="text-xs text-muted-foreground">(Pinned)</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{activeHabit.description}</p>
          </div>
          <div className={`${colors.pill} px-3 py-1 rounded-full text-sm font-medium`}>
            {activeHabit.streak} day streak
          </div>
        </div>
        
        <HabitProgress 
          activeHabit={activeHabit}
          habitDays={habitDays}
          handleToggleHabit={handleToggleHabit}
          todayCompleted={todayRecord?.completed || false}
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
