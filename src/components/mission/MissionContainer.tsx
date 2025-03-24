
import React, { useState, useEffect } from "react";
import { MissionHeader } from "./MissionHeader";
import { CurrentSprint } from "./CurrentSprint";

// Helper functions to get/set mission data from localStorage
const getMissionData = (key: string, defaultValue: string) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const setMissionData = (key: string, value: string) => {
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
  
  const [purposeStatement, setPurposeStatement] = useState(() => 
    getMissionData('purposeStatement', "To provide innovative tools and methodologies that help people discover their purpose and translate it into actionable steps for a fulfilling life.")
  );

  // Save to localStorage when states change
  useEffect(() => {
    setMissionData('missionStatement', missionStatement);
  }, [missionStatement]);

  useEffect(() => {
    setMissionData('visionStatement', visionStatement);
  }, [visionStatement]);

  useEffect(() => {
    setMissionData('purposeStatement', purposeStatement);
  }, [purposeStatement]);

  // Handler for when mission is updated
  const handleMissionUpdate = ({ statement, vision, purpose }: { statement: string; vision: string; purpose: string }) => {
    setMissionStatement(statement);
    setVisionStatement(vision);
    setPurposeStatement(purpose);
  };
  
  return (
    <div className="w-full mx-auto animate-fade-in">
      <MissionHeader 
        missionStatement={missionStatement}
        visionStatement={visionStatement}
        purposeStatement={purposeStatement}
        onMissionUpdate={handleMissionUpdate}
      />
      <CurrentSprint />
    </div>
  );
}
