
import { toast } from "sonner";

export interface HabitDay {
  date: string;
  completed: boolean;
}

export interface Habit {
  id: number;
  title: string;
  description: string;
  streak: number;
  isPinned?: boolean;
  days?: HabitDay[];
  domain?: "mind" | "body" | "purpose" | "relationships";
  active?: boolean;
}

// Generate sample days for habits that don't have day data
export const generateSampleDays = (streak: number): HabitDay[] => {
  const days: HabitDay[] = [];
  const currentDate = new Date();
  const today = currentDate.toISOString().split('T')[0];
  
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

// Domain color mapping
export const domainColorMap = {
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

export const getDomainColors = (habitDomain: string) => {
  return domainColorMap[habitDomain as keyof typeof domainColorMap] || domainColorMap.mind;
};

// Handle toggle habit completion for today
export const toggleHabitCompletion = (
  habit: Habit,
  habitDays: HabitDay[],
  onUpdate: (updatedHabit: Habit, updatedDays: HabitDay[]) => void
) => {
  if (!habit) return;
  
  const today = new Date().toISOString().split('T')[0];
  toggleHabitForDate(habit, habitDays, today, onUpdate);
};

// Toggle habit completion for a specific date
export const toggleHabitForDate = (
  habit: Habit,
  habitDays: HabitDay[],
  date: string,
  onUpdate: (updatedHabit: Habit, updatedDays: HabitDay[]) => void
) => {
  if (!habit) return;
  
  // Find day's record or create it
  const dayIndex = habitDays.findIndex(day => day.date === date);
  const updatedDays = [...habitDays];
  let isCompleting = true;
  
  if (dayIndex >= 0) {
    // Toggle existing day
    isCompleting = !updatedDays[dayIndex].completed;
    updatedDays[dayIndex] = { 
      ...updatedDays[dayIndex], 
      completed: isCompleting
    };
  } else {
    // Add the date if it doesn't exist
    updatedDays.push({ date, completed: true });
  }
  
  // Update habit streak
  let newStreak = habit.streak;
  const today = new Date().toISOString().split('T')[0];
  
  // Only update streak if the date being toggled is today
  if (date === today) {
    if (isCompleting) {
      newStreak += 1;
      toast.success(`${habit.title} completed`);
    } else {
      newStreak = Math.max(0, newStreak - 1);
      toast.info(`${habit.title} unmarked`);
    }
  } else {
    // Just show a toast for historical dates
    const formattedDate = new Date(date).toLocaleDateString();
    if (isCompleting) {
      toast.success(`${habit.title} marked as completed for ${formattedDate}`);
    } else {
      toast.info(`${habit.title} unmarked for ${formattedDate}`);
    }
  }
  
  // Create updated habit object
  const updatedHabit = {
    ...habit,
    streak: newStreak,
    days: updatedDays
  };
  
  onUpdate(updatedHabit, updatedDays);
};
