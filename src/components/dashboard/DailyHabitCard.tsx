
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, CheckCircle, Plus, Pin, PinOff } from "lucide-react";
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
  days: HabitDay[];
  domain?: "mind" | "body" | "purpose" | "relationships";
}

interface DailyHabitCardProps {
  className?: string;
  style?: React.CSSProperties;
  currentHabit: Habit;
}

export function DailyHabitCard({ className = "", style, currentHabit }: DailyHabitCardProps) {
  // State for all habits and pinned habit
  const [habits, setHabits] = useState<Habit[]>([]);
  const [pinnedHabitId, setPinnedHabitId] = useState<number | null>(null);
  const [activeHabit, setActiveHabit] = useState<Habit>(currentHabit);
  
  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Sample habits data - in a real app, this would come from an API or store
  useEffect(() => {
    // Include the current habit and add some other sample habits
    const sampleHabits = [
      currentHabit,
      {
        id: 100,
        title: "30-minute workout",
        description: "Daily strength or cardio exercise",
        streak: 3,
        domain: "body" as const,
        days: [
          { date: "2023-07-03", completed: true },
          { date: "2023-07-04", completed: true },
          { date: "2023-07-05", completed: true },
          { date: today, completed: false }
        ]
      },
      {
        id: 101,
        title: "Reading",
        description: "Read 20 pages of a book",
        streak: 7,
        domain: "mind" as const,
        days: [
          { date: "2023-07-01", completed: true },
          { date: "2023-07-02", completed: true },
          { date: "2023-07-03", completed: true },
          { date: "2023-07-04", completed: true },
          { date: "2023-07-05", completed: true },
          { date: today, completed: false }
        ]
      }
    ];
    
    setHabits(sampleHabits);
    
    // Set first habit as pinned by default if nothing is already pinned
    const storedPinnedId = localStorage.getItem('pinnedHabitId');
    if (storedPinnedId) {
      const pinnedId = parseInt(storedPinnedId);
      setPinnedHabitId(pinnedId);
      const pinnedHabit = sampleHabits.find(h => h.id === pinnedId);
      if (pinnedHabit) {
        setActiveHabit(pinnedHabit);
      }
    } else {
      setPinnedHabitId(currentHabit.id);
      localStorage.setItem('pinnedHabitId', currentHabit.id.toString());
    }
  }, [currentHabit, today]);
  
  // Get domain from habit or default to "mind"
  const domain = activeHabit.domain || "mind";
  
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
  
  // Find today's record for active habit
  const todayRecord = activeHabit.days.find(day => day.date === today);
  
  const handleToggleHabit = (habit: Habit) => {
    // Toggle the completion status for today
    const updatedHabits = habits.map(h => {
      if (h.id === habit.id) {
        const dayIndex = h.days.findIndex(day => day.date === today);
        const newDays = [...h.days];
        
        if (dayIndex >= 0) {
          // Update existing day
          newDays[dayIndex] = { 
            ...newDays[dayIndex], 
            completed: !newDays[dayIndex].completed 
          };
        } else {
          // Add today if it doesn't exist
          newDays.push({ date: today, completed: true });
        }
        
        // Calculate new streak
        let newStreak = h.streak;
        if (dayIndex >= 0 && newDays[dayIndex].completed) {
          // If was completed and now unmarked, reduce streak
          newStreak = Math.max(0, newStreak - 1);
        } else {
          // If was not completed and now marked, increase streak
          newStreak += 1;
        }
        
        return { ...h, days: newDays, streak: newStreak };
      }
      return h;
    });
    
    setHabits(updatedHabits);
    
    // Update active habit if it's the one being toggled
    if (habit.id === activeHabit.id) {
      const updatedHabit = updatedHabits.find(h => h.id === habit.id);
      if (updatedHabit) {
        setActiveHabit(updatedHabit);
      }
    }
    
    // Show toast
    const isCompleted = !habit.days.find(day => day.date === today)?.completed;
    if (isCompleted) {
      toast.success(`${habit.title} completed`);
    } else {
      toast.info(`${habit.title} unmarked`);
    }
  };
  
  const handlePinHabit = (habit: Habit) => {
    setPinnedHabitId(habit.id);
    setActiveHabit(habit);
    localStorage.setItem('pinnedHabitId', habit.id.toString());
    toast.success(`"${habit.title}" pinned to dashboard`);
  };
  
  // Get last 7 days for the habit calendar
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const day = activeHabit.days.find(day => day.date === dateString);
    return {
      date: dateString,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: day ? day.completed : false
    };
  }).reverse();
  
  return (
    <Card className={`overflow-hidden hover-lift ${className}`} style={style}>
      <CardHeader className={`${colors.bg} p-4 md:p-6`}>
        <div className="flex justify-between items-center">
          <CardTitle className={`text-lg md:text-xl ${colors.text}`}>Daily Habits</CardTitle>
          <div className={`h-9 w-9 rounded-full ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
            <CalendarDays className={`h-5 w-5 ${colors.text}`} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        {/* Featured/Pinned Habit */}
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
                onCheckedChange={() => handleToggleHabit(activeHabit)}
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
        
        {/* All Habits */}
        <div className="border border-border/40 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-3">All Active Habits</h4>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {habits.filter(h => h.id !== activeHabit.id).map(habit => {
              const habitColors = getDomainColors(habit.domain || "mind");
              const habitTodayRecord = habit.days.find(day => day.date === today);
              
              return (
                <div key={habit.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox 
                      id={`habit-${habit.id}`} 
                      checked={habitTodayRecord?.completed || false}
                      onCheckedChange={() => handleToggleHabit(habit)}
                      className={`data-[state=checked]:${habitColors.text}`}
                    />
                    <div>
                      <label htmlFor={`habit-${habit.id}`} className="text-sm font-medium cursor-pointer">
                        {habit.title}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${habitColors.text}`}>{habit.streak} day streak</span>
                        <span className={`inline-block w-2 h-2 rounded-full ${habitColors.completed}`}></span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => handlePinHabit(habit)}
                    title="Pin to dashboard"
                  >
                    <Pin className="h-3.5 w-3.5" />
                  </Button>
                </div>
              );
            })}
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
