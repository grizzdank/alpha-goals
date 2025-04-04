import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { missionService } from '@/services/missionService';
import { sprintService, type SprintWithObjectives } from '@/services/sprintService';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface MissionCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function MissionCard({ className, style }: MissionCardProps) {
  const { user } = useAuth();
  const [missionStatement, setMissionStatement] = useState<string | null>(null);
  const [oneYearVision, setOneYearVision] = useState<string | null>(null);
  const [currentSprint, setCurrentSprint] = useState<SprintWithObjectives | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      try {
        const [statement, visionGoals, sprint] = await Promise.all([
          missionService.getMissionStatement(user.id),
          missionService.getVisionGoals(user.id),
          sprintService.getCurrentSprint(user.id)
        ]);

        if (statement) {
          setMissionStatement(statement.statement);
        }

        const oneYearGoal = visionGoals.find(goal => goal.timeframe === '1 year');
        if (oneYearGoal) {
          setOneYearVision(oneYearGoal.statement);
        }

        setCurrentSprint(sprint);
      } catch (error) {
        console.error("Error loading mission data:", error);
        toast.error("Failed to load mission data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className={cn("glass rounded-2xl p-6", className)} style={style}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Mission & Vision</h3>
            <p className="text-sm text-muted-foreground">Your purpose alignment</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-purpose/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-purpose" />
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Loading mission data...</p>
        </div>
      </div>
    );
  }

  const daysLeft = currentSprint 
    ? Math.ceil((new Date(currentSprint.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className={cn("glass rounded-2xl p-6 hover-lift", className)} style={style}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Mission & Vision</h3>
          <p className="text-sm text-muted-foreground">Your purpose alignment</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-purpose/10 flex items-center justify-center">
          <Target className="h-5 w-5 text-purpose" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-xl bg-white/40 p-4 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
          <h4 className="text-sm font-medium mb-2">Ikigai Statement</h4>
          <p className="text-sm text-muted-foreground">
            {missionStatement || "Define your mission statement on the mission page"}
          </p>
        </div>
        
        <div className="rounded-xl bg-white/40 p-4 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
          <h4 className="text-sm font-medium mb-2">1-Year Vision</h4>
          <p className="text-sm text-muted-foreground">
            {oneYearVision || "Set your 1-year vision on the mission page"}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/40 p-3 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
            <h4 className="text-xs font-medium mb-1">Current Sprint</h4>
            <p className="text-xs text-muted-foreground">
              {currentSprint ? currentSprint.name : "No active sprint"}
            </p>
          </div>
          
          <div className="rounded-xl bg-white/40 p-3 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
            <h4 className="text-xs font-medium mb-1">Days Left</h4>
            <p className="text-xl font-semibold text-primary">
              {daysLeft ?? "-"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Link to="/mission" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors card-link">
          View complete mission
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
