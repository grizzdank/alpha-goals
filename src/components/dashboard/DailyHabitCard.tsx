
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, CheckCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface HabitDay {
  date: string;
  completed: boolean;
}

interface Habit {
  id: number;
  title: string;
  description: string;
  streak: number;
  isPinned?: boolean;
  days?: HabitDay[];
  domain?: "mind" | "body" | "purpose" | "relationships";
}

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
  
  // Generate sample days for habits that don't have day data
  const generateSampleDays = (streak: number): HabitDay[] => {
    const days: HabitDay[] = [];
    const currentDate = new Date();
    
    // Add completed days for the streak
    for (let i = 0; i < streak; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (i + 1));
      days.push({
        date: date.toISOString().split('T')[0],
        completed: true
      });
    }
    
    // Add today as not completed
    days.push({
      date: today,
      completed: false
    });
    
    return days.reverse();
  };
  
  // Handle toggle habit completion
  const handleToggleHabit = () => {
    if (!activeHabit) return;
    
    // Find today's record or create it
    const dayIndex = habitDays.findIndex(day => day.date === today);
    const updatedDays = [...habitDays];
    
    if (dayIndex >= 0) {
      // Toggle existing day
      updatedDays[dayIndex] = { 
        ...updatedDays[dayIndex], 
        completed: !updatedDays[dayIndex].completed 
      };
    } else {
      // Add today if it doesn't exist
      updatedDays.push({ date: today, completed: true });
    }
    
    setHabitDays(updatedDays);
    
    // Update habit streak
    let newStreak = activeHabit.streak;
    const isCompleted = dayIndex >= 0 ? !habitDays[dayIndex].completed : true;
    
    if (isCompleted) {
      newStreak += 1;
      toast.success(`${activeHabit.title} completed`);
    } else {
      newStreak = Math.max(0, newStreak - 1);
      toast.info(`${activeHabit.title} unmarked`);
    }
    
    // Update the active habit with new streak and days
    const updatedHabit = {
      ...activeHabit,
      streak: newStreak,
      days: updatedDays
    };
    
    // Update the habit in the habits array
    const updatedHabits = habits.map(h => 
      h.id === activeHabit.id ? updatedHabit : h
    );
    
    setHabits(updatedHabits);
    setActiveHabit(updatedHabit);
    
    // Save to localStorage
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };
  
  // Get domain from habit or default to "mind"
  const domain = activeHabit?.domain || "mind";
  
  // Map domain to appropriate color classes
  const domainColorMap = {
    mind: {
      bg: "bg-mind/10",
      text: "text-mind",
      iconBg: "bg-mind/20",
      pill: "bg-mind/10 text-mind",
      completed: "bg-mind/80",
    },
    body: {
      bg: "bg-body/10",
      text: "text-body",
      iconBg: "bg-body/20",
      pill: "bg-body/10 text-body",
      completed: "bg-body/80",
    },
    purpose: {
      bg: "bg-purpose/10",
      text: "text-purpose",
      iconBg: "bg-purpose/20",
      pill: "bg-purpose/10 text-purpose",
      completed: "bg-purpose/80",
    },
    relationships: {
      bg: "bg-relationships/10",
      text: "text-relationships",
      iconBg: "bg-relationships/20",
      pill: "bg-relationships/10 text-relationships",
      completed: "bg-relationships/80",
    }
  };
  
  const getDomainColors = (habitDomain: string) => {
    return domainColorMap[habitDomain as keyof typeof domainColorMap] || domainColorMap.mind;
  };
  
  const colors = getDomainColors(domain);
  
  // Find today's record
  const todayRecord = habitDays.find(day => day.date === today);
  
  // Get last 7 days for the habit calendar
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const day = habitDays.find(day => day.date === dateString);
    return {
      date: dateString,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: day ? day.completed : false
    };
  }).reverse();
  
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
        
        <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground mb-4">
            No habit is currently pinned to your dashboard.
          </p>
          <Button asChild>
            <Link to="/habits">
              <Plus className="h-4 w-4 mr-1" />
              Pin a Habit
            </Link>
          </Button>
        </CardContent>
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
        
        <div className="border border-border/40 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Today's Progress</h4>
            <div className="flex items-center">
              <Checkbox 
                id={`today-habit-${activeHabit.id}`} 
                checked={todayRecord?.completed || false}
                onCheckedChange={handleToggleHabit}
                className={`mr-2 data-[state=checked]:${colors.text} data-[state=checked]:border-${domain}`}
              />
              <label 
                htmlFor={`today-habit-${activeHabit.id}`} 
                className="text-sm cursor-pointer"
              >
                Mark as completed
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mt-2">
            {last7Days.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground mb-1">{day.dayName}</span>
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs
                    ${day.completed ? `${colors.completed} text-white` : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground'}`}
                >
                  {day.completed ? <CheckCircle className="h-4 w-4" /> : '-'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
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
