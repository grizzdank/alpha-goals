
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Brain, 
  Heart, 
  Target, 
  Dumbbell, 
  Trash2, 
  Edit, 
  AlertCircle, 
  AlertTriangle 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample habit data - in a real app, this would come from a database or state management
const sampleHabits = [
  {
    id: 1,
    title: "20-minute meditation",
    description: "Mindfulness practice every morning",
    domain: "mind",
    active: true,
    streak: 5,
    createdAt: "2023-06-01"
  },
  {
    id: 2,
    title: "30-minute workout",
    description: "Strength training or cardio",
    domain: "body",
    active: true,
    streak: 3,
    createdAt: "2023-06-05"
  },
  {
    id: 3,
    title: "Read for 20 minutes",
    description: "Read non-fiction or personal development",
    domain: "mind",
    active: true,
    streak: 7,
    createdAt: "2023-06-10"
  },
  {
    id: 4,
    title: "Call a friend or family member",
    description: "Connect with someone important",
    domain: "relationships",
    active: false,
    streak: 0,
    createdAt: "2023-06-15"
  },
  {
    id: 5,
    title: "Work on personal project",
    description: "Dedicate time to meaningful project",
    domain: "purpose",
    active: true,
    streak: 4,
    createdAt: "2023-06-20"
  }
];

export function HabitsList() {
  const [habits, setHabits] = useState(sampleHabits);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [filter, setFilter] = useState("all"); // all, active, inactive
  
  const activeHabitsCount = habits.filter(h => h.active).length;
  const inactiveHabitsCount = habits.filter(h => !h.active).length;
  
  // Get domain icon
  const getDomainIcon = (domain) => {
    switch(domain) {
      case "mind":
        return <Brain className="h-4 w-4" />;
      case "body":
        return <Dumbbell className="h-4 w-4" />;
      case "purpose":
        return <Target className="h-4 w-4" />;
      case "relationships":
        return <Heart className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };
  
  // Get domain color class
  const getDomainColorClass = (domain) => {
    switch(domain) {
      case "mind":
        return "bg-mind/10 text-mind border-mind/30";
      case "body":
        return "bg-body/10 text-body border-body/30";
      case "purpose":
        return "bg-purpose/10 text-purpose border-purpose/30";
      case "relationships":
        return "bg-relationships/10 text-relationships border-relationships/30";
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };
  
  // Handle toggle active status
  const toggleActive = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newActive = !habit.active;
        
        // Show appropriate toast
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
  
  // Handle delete button click
  const handleDeleteClick = (habit) => {
    setHabitToDelete(habit);
    setShowDeleteDialog(true);
  };
  
  // Confirm habit deletion
  const confirmDelete = () => {
    if (habitToDelete) {
      setHabits(habits.filter(h => h.id !== habitToDelete.id));
      toast.success("Habit deleted successfully");
      setShowDeleteDialog(false);
      setHabitToDelete(null);
    }
  };
  
  // Filter habits based on selected filter
  const filteredHabits = habits.filter(habit => {
    if (filter === "active") return habit.active;
    if (filter === "inactive") return !habit.active;
    return true; // "all" filter
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Habit Management</h2>
          <p className="text-muted-foreground">
            You have {activeHabitsCount} active and {inactiveHabitsCount} inactive habits
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "active" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button 
            variant={filter === "inactive" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("inactive")}
          >
            Inactive
          </Button>
        </div>
      </div>
      
      {activeHabitsCount >= 5 && (
        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="p-4 flex gap-3 items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                You currently have {activeHabitsCount} active habits
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                For best results, consider focusing on 3-5 key habits at a time.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {filteredHabits.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No habits found</h3>
            <p className="text-muted-foreground mb-4">
              {filter === "all" 
                ? "You haven't created any habits yet." 
                : `You don't have any ${filter} habits.`}
            </p>
            <Button>Create Your First Habit</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHabits.map(habit => (
            <Card key={habit.id} className={`hover:shadow-md transition-shadow ${!habit.active ? 'opacity-70' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id={`active-${habit.id}`}
                      checked={habit.active}
                      onCheckedChange={() => toggleActive(habit.id)}
                    />
                    <div>
                      <CardTitle className="text-base">{habit.title}</CardTitle>
                      <CardDescription>{habit.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={`flex items-center gap-1 ${getDomainColorClass(habit.domain)}`}>
                    {getDomainIcon(habit.domain)}
                    <span>{habit.domain.charAt(0).toUpperCase() + habit.domain.slice(1)}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm">
                  <span className="font-medium">{habit.streak}</span>
                  <span className="text-muted-foreground ml-1">day streak</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-destructive hover:text-destructive gap-1"
                  onClick={() => handleDeleteClick(habit)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Habit</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{habitToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
