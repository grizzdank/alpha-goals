
import React from "react";
import { StatsOverview } from "./StatsOverview";
import { AlphaScoreSummary } from "./AlphaScoreSummary";
import { SprintProgressChart } from "./SprintProgressChart";
import { DomainProgressCard } from "./DomainProgressCard";

// Alpha score data
const alphaScoreData = {
  totalScore: 76,
  categoryScores: [
    { category: "relationships", score: 82, label: "Relationships" },
    { category: "purpose", score: 75, label: "Purpose" },
    { category: "body", score: 68, label: "Body" },
    { category: "mind", score: 79, label: "Mind" },
  ],
};

export const ProgressOverview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sprint Progress Overview</h2>
      
      {/* Stats Cards */}
      <StatsOverview />

      {/* Alpha Score Summary */}
      <AlphaScoreSummary data={alphaScoreData} />

      {/* Overall Progress */}
      <SprintProgressChart />

      {/* Domain Progress */}
      <DomainProgressCard />
    </div>
  );
};
