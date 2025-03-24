
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { SprintProgress } from "./SprintProgress";
import { SprintObjectives } from "./SprintObjectives";
import { SprintUpdates } from "./SprintUpdates";

export function CurrentSprint() {
  return (
    <div className="glass rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Current Sprint</h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Your 90-day focus period to make meaningful progress
          </p>
        </div>
        <div className="h-9 w-9 rounded-full bg-relationships/20 flex items-center justify-center flex-shrink-0">
          <Calendar className="h-4 w-4 md:h-5 md:w-5 text-relationships" />
        </div>
      </div>
      
      <SprintProgress />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SprintObjectives />
        <SprintUpdates />
      </div>
      
      <div className="mt-4 md:mt-6">
        <Link to="/sprints" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View all sprints
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
