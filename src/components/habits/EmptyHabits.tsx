
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyHabitsProps {
  filter: string;
}

export function EmptyHabits({ filter }: EmptyHabitsProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">No habits found</h3>
        <p className="text-muted-foreground mb-4">
          {filter === "all" 
            ? "You haven't created any habits yet." 
            : `You don't have any ${filter} habits.`}
        </p>
        <Button asChild>
          <Link to="/habits?tab=new">
            <Plus className="h-4 w-4 mr-1" />
            Create Your First Habit
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
