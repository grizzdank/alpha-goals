
import React from "react";
import { Button } from "@/components/ui/button";

interface HabitFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  activeCount: number;
  inactiveCount: number;
}

export function HabitFilters({ filter, setFilter, activeCount, inactiveCount }: HabitFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Habit Management</h2>
        <p className="text-muted-foreground">
          You have {activeCount} active and {inactiveCount} inactive habits
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
  );
}
