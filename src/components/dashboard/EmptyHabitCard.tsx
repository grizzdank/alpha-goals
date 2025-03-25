
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export function EmptyHabitCard() {
  return (
    <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
      <p className="text-muted-foreground mb-4">
        No habit is currently pinned to your dashboard.
      </p>
      <Button asChild>
        <Link to="/habits?tab=new">
          <Plus className="h-4 w-4 mr-1" />
          Pin a Habit
        </Link>
      </Button>
    </CardContent>
  );
}
