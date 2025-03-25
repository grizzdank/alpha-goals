
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { HabitCard } from "./HabitCard";
import { HabitFilters } from "./HabitFilters";
import { HabitWarning } from "./HabitWarning";
import { EmptyHabits } from "./EmptyHabits";
import { DeleteHabitDialog } from "./DeleteHabitDialog";
import { EditHabitDialog } from "./EditHabitDialog";
import { getDomainIcon, getDomainColorClass } from "./domainUtils";

const sampleHabits = [
  {
    id: 1,
    title: "20-minute meditation",
    description: "Mindfulness practice every morning",
    domain: "mind",
    active: true,
    streak: 5,
    createdAt: "2023-06-01",
    isPinned: true,
    days: [
      { date: "2023-06-01", completed: true },
      { date: "2023-06-02", completed: true },
      { date: "2023-06-03", completed: true },
      { date: "2023-06-04", completed: true },
      { date: "2023-06-05", completed: true },
      { date: "2023-06-06", completed: false }
    ]
  },
  {
    id: 2,
    title: "30-minute workout",
    description: "Strength training or cardio",
    domain: "body",
    active: true,
    streak: 3,
    createdAt: "2023-06-05",
    isPinned: false,
    days: [
      { date: "2023-06-05", completed: true },
      { date: "2023-06-06", completed: true },
      { date: "2023-06-07", completed: true }
    ]
  },
  {
    id: 3,
    title: "Read for 20 minutes",
    description: "Read non-fiction or personal development",
    domain: "mind",
    active: true,
    streak: 7,
    createdAt: "2023-06-10",
    isPinned: false,
    days: [
      { date: "2023-06-10", completed: true },
      { date: "2023-06-11", completed: true },
      { date: "2023-06-12", completed: true },
      { date: "2023-06-13", completed: true },
      { date: "2023-06-14", completed: true },
      { date: "2023-06-15", completed: true },
      { date: "2023-06-16", completed: true }
    ]
  },
  {
    id: 4,
    title: "Call a friend or family member",
    description: "Connect with someone important",
    domain: "relationships",
    active: false,
    streak: 0,
    createdAt: "2023-06-15",
    isPinned: false,
    days: []
  },
  {
    id: 5,
    title: "Work on personal project",
    description: "Dedicate time to meaningful project",
    domain: "purpose",
    active: true,
    streak: 4,
    createdAt: "2023-06-20",
    isPinned: false,
    days: [
      { date: "2023-06-20", completed: true },
      { date: "2023-06-21", completed: true },
      { date: "2023-06-22", completed: true },
      { date: "2023-06-23", completed: true }
    ]
  }
];

export function HabitsList() {
  const [habits, setHabits] = useState([]);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    } else {
      setHabits(sampleHabits);
      localStorage.setItem('habits', JSON.stringify(sampleHabits));
    }
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);
  
  const activeHabitsCount = habits.filter(h => h.active).length;
  const inactiveHabitsCount = habits.filter(h => !h.active).length;
  
  const toggleActive = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newActive = !habit.active;
        
        if (newActive) {
          toast.success("Habit activated");
        } else {
          toast.info("Habit deactivated");
        }
        
        return { ...habit, active: newActive };
      }
      return habit;
    }));
  };
  
  const handleDeleteClick = (habit) => {
    setHabitToDelete(habit);
    setShowDeleteDialog(true);
  };

  const handleEditClick = (habit) => {
    setHabitToEdit(habit);
    setShowEditDialog(true);
  };
  
  const togglePinned = (habit) => {
    const updatedHabits = habits.map(h => ({
      ...h,
      isPinned: h.id === habit.id ? !h.isPinned : h.isPinned
    }));
    
    setHabits(updatedHabits);
    
    if (!habit.isPinned) {
      toast.success(`"${habit.title}" pinned to dashboard`);
    } else {
      toast.info(`"${habit.title}" unpinned from dashboard`);
    }
  };
  
  const confirmDelete = () => {
    if (habitToDelete) {
      setHabits(habits.filter(h => h.id !== habitToDelete.id));
      toast.success("Habit deleted successfully");
      setShowDeleteDialog(false);
      setHabitToDelete(null);
    }
  };
  
  const handleSaveEdit = (updatedHabit) => {
    setHabits(habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ));
    setShowEditDialog(false);
    setHabitToEdit(null);
    toast.success("Habit updated successfully");
  };
  
  const filteredHabits = habits.filter(habit => {
    if (filter === "active") return habit.active;
    if (filter === "inactive") return !habit.active;
    return true;
  });
  
  // Add new function to mark habit completion for today
  const markHabitCompletion = (habitId, completed) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        // Get or create the days array
        const days = habit.days || [];
        
        // Find if today already exists
        const todayIndex = days.findIndex(day => day.date === today);
        
        let newDays;
        let newStreak = habit.streak;
        
        if (todayIndex >= 0) {
          // Update existing day
          newDays = days.map((day, i) => 
            i === todayIndex ? { ...day, completed } : day
          );
        } else {
          // Add new day
          newDays = [...days, { date: today, completed }];
        }
        
        // Update streak based on completion
        if (completed) {
          newStreak = habit.streak + 1;
          toast.success(`"${habit.title}" marked as completed`);
        } else {
          newStreak = Math.max(0, habit.streak - 1);
          toast.info(`"${habit.title}" marked as not completed`);
        }
        
        return { 
          ...habit, 
          days: newDays,
          streak: newStreak
        };
      }
      return habit;
    }));
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <HabitFilters 
        filter={filter} 
        setFilter={setFilter} 
        activeCount={activeHabitsCount} 
        inactiveCount={inactiveHabitsCount} 
      />
      
      <HabitWarning activeCount={activeHabitsCount} />
      
      {filteredHabits.length === 0 ? (
        <EmptyHabits filter={filter} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHabits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleActive={toggleActive}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onTogglePin={togglePinned}
              getDomainIcon={getDomainIcon}
              getDomainColorClass={getDomainColorClass}
            />
          ))}
        </div>
      )}
      
      <DeleteHabitDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        habitToDelete={habitToDelete}
        onConfirmDelete={confirmDelete}
      />

      <EditHabitDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        habitToEdit={habitToEdit}
        onSaveEdit={handleSaveEdit}
      />
    </div>
  );
}
