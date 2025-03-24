
import React, { useState, useEffect } from "react";
import { MissionHeader } from "./MissionHeader";
import { CurrentSprint } from "./CurrentSprint";

// Helper functions to get/set mission data from localStorage
const getMissionData = (key: string, defaultValue: any) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const setMissionData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
  // Dispatch an event so other components can update
  window.dispatchEvent(new Event('storage'));
};

export function MissionContainer() {
  // State for the editable mission content with localStorage persistence
  const [missionStatement, setMissionStatement] = useState(() => 
    getMissionData('missionStatement', "Empowering individuals to align their personal purpose with action through innovative tools and methodologies.")
  );
  
  const [visionGoals, setVisionGoals] = useState(() => 
    getMissionData('visionGoals', {
      oneYear: {
        statement: "In 1 year, I will have established a solid foundation for my personal development platform with an active user base.",
        milestones: [
          "Launch beta version of the platform",
          "Acquire first 100 active users",
          "Establish consistent content creation schedule"
        ]
      },
      fiveYear: {
        statement: "In 5 years, I will have scaled my platform to reach thousands of people and created a sustainable business model.",
        milestones: [
          "Grow user base to 10,000+ active users",
          "Develop premium offering with recurring revenue",
          "Build a small team of dedicated professionals"
        ]
      },
      tenYear: {
        statement: "In 10 years, I will have built a recognized brand in the personal development space that positively impacts millions of lives.",
        milestones: [
          "Reach 1 million+ users globally",
          "Publish research on effectiveness of the platform's methodology",
          "Establish partnerships with major educational institutions"
        ]
      }
    })
  );
  
  const [ikigaiComponents, setIkigaiComponents] = useState(() => 
    getMissionData('ikigaiComponents', {
      love: "Helping others grow, creating innovative solutions, writing, and teaching.",
      good: "Strategic thinking, communicating complex ideas, building relationships, and problem-solving.",
      paid: "Coaching, consulting, content creation, and developing frameworks for personal and professional growth.",
      needs: "Guidance on finding purpose, tools to increase productivity, systems for personal development."
    })
  );

  // Save to localStorage when states change
  useEffect(() => {
    setMissionData('missionStatement', missionStatement);
  }, [missionStatement]);

  useEffect(() => {
    setMissionData('visionGoals', visionGoals);
  }, [visionGoals]);

  useEffect(() => {
    setMissionData('ikigaiComponents', ikigaiComponents);
  }, [ikigaiComponents]);

  // Handler for when mission is updated
  const handleMissionUpdate = ({ 
    statement, 
    visionGoals: newVisionGoals,
    ikigaiComponents: newIkigaiComponents
  }: { 
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
  }) => {
    setMissionStatement(statement);
    setVisionGoals(newVisionGoals);
    setIkigaiComponents(newIkigaiComponents);
  };
  
  return (
    <div className="w-full mx-auto animate-fade-in">
      <MissionHeader 
        missionStatement={missionStatement}
        visionGoals={visionGoals}
        ikigaiComponents={ikigaiComponents}
        onMissionUpdate={handleMissionUpdate}
      />
      <CurrentSprint />
    </div>
  );
}
