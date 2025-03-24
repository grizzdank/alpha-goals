
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { SprintProgress } from "./SprintProgress";
import { SprintObjectives } from "./SprintObjectives";
import { SprintUpdates } from "./SprintUpdates";

export function CurrentSprint() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-2">Current Sprint</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Your 90-day focus period to make meaningful progress on your mission
          </p>
        </div>
        <div className="h-10 w-10 rounded-full bg-relationships/20 flex items-center justify-center mt-4 md:mt-0 self-center md:self-auto">
          <Calendar className="h-5 w-5 text-relationships" />
        </div>
      </div>
      
      <SprintProgress />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SprintObjectives />
        <SprintUpdates />
      </div>
      
      <div className="mt-6">
        <Link to="/sprints" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View all sprints
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
