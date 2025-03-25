
import React from "react";
import { TrendingUp, BarChart3, Target, Award } from "lucide-react";
import { StatCard } from "./StatCard";

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Sprint Completion" 
        value="72%" 
        description="Current sprint progress" 
        icon={<TrendingUp className="h-5 w-5" />} 
        color="bg-purple-500"
      />
      <StatCard 
        title="Habit Consistency" 
        value="85%" 
        description="Daily habits completed" 
        icon={<BarChart3 className="h-5 w-5" />} 
        color="bg-blue-500"
      />
      <StatCard 
        title="Key Objectives" 
        value="4/6" 
        description="Major objectives completed" 
        icon={<Target className="h-5 w-5" />} 
        color="bg-green-500"
      />
      <StatCard 
        title="Best Performing Area" 
        value="Mind" 
        description="Highest completion domain" 
        icon={<Award className="h-5 w-5" />} 
        color="bg-amber-500"
      />
    </div>
  );
};
