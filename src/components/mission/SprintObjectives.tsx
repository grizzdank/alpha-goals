
import React from "react";

export function SprintObjectives() {
  return (
    <div className="bg-white/40 rounded-xl p-4 md:p-5 border border-white/30">
      <h3 className="font-medium mb-3">Key Objectives</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="h-6 w-6 rounded bg-purpose/20 flex items-center justify-center mr-3 mt-0.5">
            <div className="h-3 w-3 rounded-sm bg-purpose"></div>
          </div>
          <div>
            <p className="font-medium">Launch Mission Planner Pro platform</p>
            <p className="text-sm text-muted-foreground">Create the foundation for digital growth</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="h-6 w-6 rounded bg-purpose/20 flex items-center justify-center mr-3 mt-0.5">
            <div className="h-3 w-3 rounded-sm bg-purpose"></div>
          </div>
          <div>
            <p className="font-medium">Produce weekly content</p>
            <p className="text-sm text-muted-foreground">Articles, videos, and social media posts</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="h-6 w-6 rounded bg-purpose/20 flex items-center justify-center mr-3 mt-0.5">
            <div className="h-3 w-3 rounded-sm bg-purpose"></div>
          </div>
          <div>
            <p className="font-medium">Grow newsletter subscribers</p>
            <p className="text-sm text-muted-foreground">Target: 500 subscribers by end of sprint</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
