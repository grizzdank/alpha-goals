
import React from "react";
import { Target } from "lucide-react";
import { EditMissionDialog } from "./EditMissionDialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface VisionGoalProps {
  title: string;
  statement: string;
  milestones: string[];
}

const VisionGoal = ({ title, statement, milestones }: VisionGoalProps) => (
  <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30 dark:bg-gray-800/40 dark:border-white/10">
    <h3 className="font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm md:text-base mb-3">
      {statement}
    </p>
    <div>
      <h4 className="text-sm font-medium mb-2">Key Milestones:</h4>
      <ul className="list-disc pl-5 text-xs md:text-sm text-muted-foreground space-y-1">
        {milestones.map((milestone, index) => (
          <li key={index}>{milestone}</li>
        ))}
      </ul>
    </div>
  </div>
);

interface MissionHeaderProps {
  missionStatement: string;
  visionGoals: {
    oneYear: {
      statement: string;
      milestones: string[];
    };
    fiveYear: {
      statement: string;
      milestones: string[];
    };
    tenYear: {
      statement: string;
      milestones: string[];
    };
  };
  ikigaiComponents: {
    love: string;
    good: string;
    paid: string;
    needs: string;
  };
  onMissionUpdate: (values: { 
    statement: string; 
    visionGoals: {
      oneYear: {
        statement: string;
        milestones: string[];
      };
      fiveYear: {
        statement: string;
        milestones: string[];
      };
      tenYear: {
        statement: string;
        milestones: string[];
      };
    };
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
  visionGoals,
  ikigaiComponents,
  onMissionUpdate,
}: MissionHeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="glass rounded-2xl p-6 md:p-8 mb-6 md:mb-8 relative">
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <EditMissionDialog 
          currentStatement={missionStatement}
          currentVisionGoals={visionGoals}
          currentIkigaiComponents={ikigaiComponents}
          onSave={onMissionUpdate}
        />
      </div>
      
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
      </div>

      <h2 className="text-lg md:text-xl font-bold mt-6 mb-4">Vision Timeline</h2>
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <VisionGoal 
          title="1-Year Vision" 
          statement={visionGoals.oneYear.statement}
          milestones={visionGoals.oneYear.milestones}
        />
        <VisionGoal 
          title="5-Year Vision" 
          statement={visionGoals.fiveYear.statement}
          milestones={visionGoals.fiveYear.milestones}
        />
        <VisionGoal 
          title="10-Year Vision" 
          statement={visionGoals.tenYear.statement}
          milestones={visionGoals.tenYear.milestones}
        />
      </div>
    </div>
  );
}
