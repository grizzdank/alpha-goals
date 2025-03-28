
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MissionCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function MissionCard({ className, style }: MissionCardProps) {
  // Default mission statement
  const defaultStatement = "Empowering individuals to align their personal purpose with action through innovative tools and methodologies.";
  
  // State for the mission statement and vision goals
  const [missionStatement, setMissionStatement] = useState(defaultStatement);
  const [oneYearVision, setOneYearVision] = useState("");
  
  // Effect to load the mission data from localStorage
  useEffect(() => {
    const loadMissionData = () => {
      try {
        // Load mission statement
        const storedStatement = localStorage.getItem('missionStatement');
        if (storedStatement) {
          setMissionStatement(JSON.parse(storedStatement));
        }
        
        // Load vision goals
        const storedVisionGoals = localStorage.getItem('visionGoals');
        if (storedVisionGoals) {
          const { oneYear } = JSON.parse(storedVisionGoals);
          setOneYearVision(oneYear.statement);
        }
      } catch (error) {
        console.error("Error loading mission data:", error);
      }
    };
    
    // Load on mount
    loadMissionData();
    
    // Listen for changes
    window.addEventListener('storage', loadMissionData);
    
    return () => {
      window.removeEventListener('storage', loadMissionData);
    };
  }, []);

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
            "{missionStatement}"
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
              Q3 - Building digital presence
            </p>
          </div>
          
          <div className="rounded-xl bg-white/40 p-3 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
            <h4 className="text-xs font-medium mb-1">Days Left</h4>
            <p className="text-xl font-semibold text-primary">
              18
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
