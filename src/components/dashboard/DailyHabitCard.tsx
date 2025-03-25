
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HabitDay {
  date: string;
  completed: boolean;
}

interface DailyHabitCardProps {
  className?: string;
  style?: React.CSSProperties;
  currentHabit: {
    id: number;
    title: string;
    description: string;
    streak: number;
    days: HabitDay[];
    domain?: "mind" | "body" | "purpose" | "relationships";
  };
}

export function DailyHabitCard({ className = "", style, currentHabit }: DailyHabitCardProps) {
  const [habit, setHabit] = useState(currentHabit);
  
  // Get domain from habit or default to "mind"
  const domain = habit.domain || "mind";
  
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
  
  const colors = domainColorMap[domain];
  
  // Get current date formatted as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  
  // Find today's record
  const todayRecord = habit.days.find(day => day.date === today);
  
  const handleToggleHabit = () => {
    // Toggle the completion status for today
    const updatedDays = habit.days.map(day => {
      if (day.date === today) {
        return { ...day, completed: !day.completed };
      }
      return day;
    });
    
    // If today doesn't exist in the records yet, add it
    if (!todayRecord) {
      updatedDays.push({ date: today, completed: true });
    }
    
    // Calculate new streak
    let newStreak = habit.streak;
    if (todayRecord?.completed) {
      // If was completed and now unmarked, reduce streak
      newStreak = Math.max(0, newStreak - 1);
    } else if (!todayRecord?.completed) {
      // If was not completed and now marked, increase streak
      newStreak += 1;
    }
    
    setHabit({
      ...habit,
      days: updatedDays,
      streak: newStreak
    });
  };
  
  // Get last 7 days for the habit calendar
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const day = habit.days.find(day => day.date === dateString);
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
          <CardTitle className={`text-lg md:text-xl ${colors.text}`}>Daily Habit</CardTitle>
          <div className={`h-9 w-9 rounded-full ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
            <CalendarDays className={`h-5 w-5 ${colors.text}`} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{habit.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{habit.description}</p>
          </div>
          <div className={`${colors.pill} px-3 py-1 rounded-full text-sm font-medium`}>
            {habit.streak} day streak
          </div>
        </div>
        
        <div className="border border-border/40 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Today's Habit</h4>
            <div className="flex items-center">
              <Checkbox 
                id="today-habit" 
                checked={todayRecord?.completed || false}
                onCheckedChange={handleToggleHabit}
                className={`mr-2 data-[state=checked]:${colors.text} data-[state=checked]:border-${domain}`}
              />
              <label 
                htmlFor="today-habit" 
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
        
        <Button asChild variant="outline" className="w-full">
          <Link to="/sprints">
            Configure Monthly Habits
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
