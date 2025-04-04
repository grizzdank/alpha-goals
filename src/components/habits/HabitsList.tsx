import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { HabitCard } from "./HabitCard";
import { HabitFilters } from "./HabitFilters";
import { HabitWarning } from "./HabitWarning";
import { EmptyHabits } from "./EmptyHabits";
import { DeleteHabitDialog } from "./DeleteHabitDialog";
import { EditHabitDialog } from "./EditHabitDialog";
import { getDomainIcon, getDomainColorClass } from "./domainUtils";
import { habitService, type HabitWithCompletions } from "@/services/habitService";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export function HabitsList() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);
  const [habitToDelete, setHabitToDelete] = useState<HabitWithCompletions | null>(null);
  const [habitToEdit, setHabitToEdit] = useState<HabitWithCompletions | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      if (!user?.id) return;
      
      try {
        const activeHabits = await habitService.getActiveHabits(user.id);
        setHabits(activeHabits);
      } catch (error) {
        console.error('Error loading habits:', error);
        toast.error('Failed to load habits');
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, [user?.id]);
  
  const activeHabitsCount = habits.filter(h => h.active).length;
  const inactiveHabitsCount = habits.filter(h => !h.active).length;
  
  const toggleActive = async (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    try {
      const updatedHabit = await habitService.getHabitById(habitId);
      if (updatedHabit) {
        const newActive = !updatedHabit.active;
        await supabase
          .from('habits')
          .update({ active: newActive })
          .eq('id', habitId);

        setHabits(habits.map(h => {
          if (h.id === habitId) {
            if (newActive) {
              toast.success("Habit activated");
            } else {
              toast.info("Habit deactivated");
            }
            return { ...h, active: newActive };
          }
          return h;
        }));
      }
    } catch (error) {
      console.error('Error toggling habit active state:', error);
      toast.error('Failed to update habit');
    }
  };
  
  const handleDeleteClick = (habit: HabitWithCompletions) => {
    setHabitToDelete(habit);
    setShowDeleteDialog(true);
  };

  const handleEditClick = (habit: HabitWithCompletions) => {
    setHabitToEdit(habit);
    setShowEditDialog(true);
  };
  
  const togglePinned = async (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    try {
      await supabase
        .from('habits')
        .update({ is_pinned: !habit.is_pinned })
        .eq('id', habitId);

      setHabits(habits.map(h => ({
        ...h,
        is_pinned: h.id === habitId ? !h.is_pinned : h.is_pinned
      })));
      
      if (!habit.is_pinned) {
        toast.success(`"${habit.title}" pinned to dashboard`);
      } else {
        toast.info(`"${habit.title}" unpinned from dashboard`);
      }
    } catch (error) {
      console.error('Error toggling habit pin state:', error);
      toast.error('Failed to update habit');
    }
  };
  
  const confirmDelete = async () => {
    if (!habitToDelete) return;

    try {
      await supabase
        .from('habits')
        .delete()
        .eq('id', habitToDelete.id);

      setHabits(habits.filter(h => h.id !== habitToDelete.id));
      toast.success("Habit deleted successfully");
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast.error('Failed to delete habit');
    } finally {
      setShowDeleteDialog(false);
      setHabitToDelete(null);
    }
  };
  
  const handleSaveEdit = async (updatedHabit: HabitWithCompletions) => {
    try {
      await supabase
        .from('habits')
        .update(updatedHabit)
        .eq('id', updatedHabit.id);

      setHabits(habits.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      ));
      toast.success("Habit updated successfully");
    } catch (error) {
      console.error('Error updating habit:', error);
      toast.error('Failed to update habit');
    } finally {
      setShowEditDialog(false);
      setHabitToEdit(null);
    }
  };
  
  const filteredHabits = habits.filter(habit => {
    if (filter === "active") return habit.active;
    if (filter === "inactive") return !habit.active;
    return true;
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted-foreground">Loading habits...</p>
      </div>
    );
  }
  
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
              onToggleCompletion={markHabitForDate}
              onTogglePin={togglePinned}
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
