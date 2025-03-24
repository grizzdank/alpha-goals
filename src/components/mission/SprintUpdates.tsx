
import React from "react";

export function SprintUpdates() {
  return (
    <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30">
      <h3 className="font-medium mb-3">Progress Updates</h3>
      <div className="space-y-4">
        <div className="border-b border-white/30 pb-3">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">Mission Planner Pro platform</p>
            <span className="text-xs font-medium bg-green-500/20 text-green-700 px-2 py-0.5 rounded-full">95% complete</span>
          </div>
          <p className="text-sm text-muted-foreground">Final testing in progress, launch scheduled for next week</p>
        </div>
        
        <div className="border-b border-white/30 pb-3">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">Content production</p>
            <span className="text-xs font-medium bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full">75% complete</span>
          </div>
          <p className="text-sm text-muted-foreground">9/12 planned pieces published, on track for completion</p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium">Newsletter growth</p>
            <span className="text-xs font-medium bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full">65% complete</span>
          </div>
          <p className="text-sm text-muted-foreground">325/500 subscribers, increased promotion needed</p>
        </div>
      </div>
    </div>
  );
}
