
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { Calendar, Clock, Target, Award } from "lucide-react";

interface HabitDay {
  date: string;
  completed: boolean;
}

interface DetailedStreakViewProps {
  habit: {
    id: number;
    title: string;
    description: string;
    domain: string;
    active: boolean;
    streak: number;
    createdAt: string;
    isPinned: boolean;
    days?: HabitDay[];
  };
}

export function DetailedStreakView({ habit }: DetailedStreakViewProps) {
  const days = habit.days || [];
  
  // Calculate statistics
  const totalDays = days.length;
  const completedDays = days.filter(day => day.completed).length;
  const completionRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  
  // Calculate current streak (consecutive completed days)
  const calculateCurrentStreak = () => {
    let streak = 0;
    const sortedDays = [...days].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    for (let day of sortedDays) {
      if (day.completed) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  // Calculate longest streak
  const calculateLongestStreak = () => {
    let currentStreak = 0;
    let longestStreak = 0;
    
    // Sort days chronologically
    const sortedDays = [...days].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    for (let day of sortedDays) {
      if (day.completed) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return longestStreak;
  };
  
  const currentStreak = calculateCurrentStreak();
  const longestStreak = calculateLongestStreak();
  
  // Get domain color
  const getDomainColor = (domain: string) => {
    switch(domain) {
      case "mind": return "primary";
      case "body": return "body";
      case "purpose": return "purpose";
      case "relationships": return "relationships";
      default: return "primary";
    }
  };
  
  const color = getDomainColor(habit.domain);
  
  // Generate monthly calendar view
  const generateCalendarData = () => {
    const months: {
      month: string;
      days: {
        date: string;
        day: number;
        completed?: boolean;
        isCurrentMonth: boolean;
      }[]
    }[] = [];
    
    // Get current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Generate data for current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const monthData = {
      month: firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      days: []
    };
    
    // Add days from previous month to fill in the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(currentYear, currentMonth, -i);
      monthData.days.unshift({
        date: prevDate.toISOString().split('T')[0],
        day: prevDate.getDate(),
        isCurrentMonth: false
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateString = date.toISOString().split('T')[0];
      const habitDay = days.find(d => d.date === dateString);
      
      monthData.days.push({
        date: dateString,
        day: i,
        completed: habitDay ? habitDay.completed : undefined,
        isCurrentMonth: true
      });
    }
    
    // Fill remaining spots in the last week
    const remainingDays = 7 - (monthData.days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        monthData.days.push({
          date: nextDate.toISOString().split('T')[0],
          day: i,
          isCurrentMonth: false
        });
      }
    }
    
    months.push(monthData);
    return months;
  };
  
  const calendarData = generateCalendarData();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <ProgressCircle 
                percentage={100} 
                size="md" 
                color={color}
                value={currentStreak}
                label="days"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <ProgressCircle 
                percentage={(currentStreak / Math.max(longestStreak, 1)) * 100} 
                size="md" 
                color={color}
                value={longestStreak}
                label="days"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Target className="mr-2 h-4 w-4" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <ProgressCircle 
                percentage={completionRate} 
                size="md" 
                color={color}
                value={`${completionRate}%`}
                label={`${completedDays}/${totalDays} days`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Monthly View
          </CardTitle>
        </CardHeader>
        <CardContent>
          {calendarData.map((month, monthIndex) => (
            <div key={monthIndex} className="mb-6">
              <h3 className="font-medium mb-3">{month.month}</h3>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-xs text-muted-foreground py-1">{day}</div>
                ))}
                {month.days.map((day, i) => (
                  <div 
                    key={i} 
                    className={`text-sm p-2 rounded-md ${
                      !day.isCurrentMonth 
                        ? 'text-muted-foreground/50' 
                        : day.completed === true
                          ? `bg-${color}/20 text-${color} dark:bg-${color}/30`
                          : day.completed === false
                            ? 'bg-destructive/10 text-destructive dark:bg-destructive/20'
                            : ''
                    }`}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
