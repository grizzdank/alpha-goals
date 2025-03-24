
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
  
  const [visionStatement, setVisionStatement] = useState(() => 
    getMissionData('visionStatement', "To create a world where individuals are empowered to live purposefully and achieve their highest potential through alignment of values, strengths, and actions.")
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
    setMissionData('visionStatement', visionStatement);
  }, [visionStatement]);

  useEffect(() => {
    setMissionData('ikigaiComponents', ikigaiComponents);
  }, [ikigaiComponents]);

  // Handler for when mission is updated
  const handleMissionUpdate = ({ 
    statement, 
    vision, 
    ikigaiComponents: newIkigaiComponents
  }: { 
    statement: string; 
    vision: string; 
    ikigaiComponents: {
      love: string;
      good: string;
      paid: string;
      needs: string;
    }
  }) => {
    setMissionStatement(statement);
    setVisionStatement(vision);
    setIkigaiComponents(newIkigaiComponents);
  };
  
  return (
    <div className="w-full mx-auto animate-fade-in">
      <MissionHeader 
        missionStatement={missionStatement}
        visionStatement={visionStatement}
        ikigaiComponents={ikigaiComponents}
        onMissionUpdate={handleMissionUpdate}
      />
      <CurrentSprint />
    </div>
  );
}
