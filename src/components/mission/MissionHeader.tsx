
import React from "react";
import { Target } from "lucide-react";
import { EditMissionDialog } from "./EditMissionDialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface MissionHeaderProps {
  missionStatement: string;
  visionStatement: string;
  ikigaiComponents: {
    love: string;
    good: string;
    paid: string;
    needs: string;
  };
  onMissionUpdate: (values: { 
    statement: string; 
    vision: string; 
    ikigaiComponents: {
      love: string;
      good: string;
      paid: string;
      needs: string;
    }
  }) => void;
}

export function MissionHeader({
  missionStatement,
  visionStatement,
  ikigaiComponents,
  onMissionUpdate,
}: MissionHeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="glass rounded-2xl p-6 md:p-8 mb-6 md:mb-8 relative">
      <EditMissionDialog 
        currentStatement={missionStatement}
        currentVision={visionStatement}
        currentIkigaiComponents={ikigaiComponents}
        onSave={onMissionUpdate}
      />
      
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">Your Mission Statement</h1>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            Your mission statement defines your purpose, values, and direction. 
            It's the foundation that guides all your decisions and actions.
          </p>
        </div>
        <div className={`h-12 w-12 md:h-14 md:w-14 rounded-full bg-purpose/20 flex items-center justify-center ${isMobile ? 'mt-4 self-center' : ''}`}>
          <Target className="h-6 w-6 md:h-7 md:w-7 text-purpose" />
        </div>
      </div>
      
      <div className="bg-white/40 rounded-xl p-4 md:p-6 border border-white/30 mb-4 md:mb-6 dark:bg-gray-800/40 dark:border-white/10">
        <h3 className="font-semibold mb-2 md:mb-3">Ikigai Statement</h3>
        <p className="text-base md:text-lg italic">
          "{missionStatement}"
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
          <h3 className="font-medium mb-2">What I Love</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {ikigaiComponents.love}
          </p>
        </div>
        
        <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
          <h3 className="font-medium mb-2">What I'm Good At</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {ikigaiComponents.good}
          </p>
        </div>
        
        <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
          <h3 className="font-medium mb-2">What I Can Be Paid For</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {ikigaiComponents.paid}
          </p>
        </div>
        
        <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
          <h3 className="font-medium mb-2">What the World Needs</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {ikigaiComponents.needs}
          </p>
        </div>

        <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30 dark:bg-gray-800/40 dark:border-white/10 md:col-span-2">
          <h3 className="font-medium mb-2">Vision</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {visionStatement}
          </p>
        </div>
      </div>
    </div>
  );
}
