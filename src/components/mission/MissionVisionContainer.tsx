import React from 'react';
import { IkigaiEditor } from './IkigaiEditor';
import { MissionEditor } from './MissionEditor';
import { VisionGoalsEditor } from './VisionGoalsEditor';

export function MissionVisionContainer() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <IkigaiEditor />
        <MissionEditor />
        <VisionGoalsEditor />
      </div>
    </div>
  );
}