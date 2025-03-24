
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SprintProgress() {
  return (
    <div className="bg-white/40 rounded-xl p-4 md:p-6 border border-white/30 mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h3 className="font-semibold mb-2 md:mb-0">Q3 - Building digital presence</h3>
        <div className="flex items-center text-primary">
          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="font-medium text-sm md:text-base">18 days remaining</span>
        </div>
      </div>
      
      <div className="w-full mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span className="font-medium">80%</span>
        </div>
        <Progress value={80} className="h-2" />
      </div>
      
      <p className="text-muted-foreground mb-4 text-sm md:text-base">
        This sprint focuses on establishing and growing your online presence 
        through content creation, community building, and digital tools.
      </p>
    </div>
  );
}
