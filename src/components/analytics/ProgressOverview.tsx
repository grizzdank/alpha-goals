import React, { useState, useEffect } from "react";
import { StatsOverview } from "./StatsOverview";
import { AlphaScoreSummary } from "./AlphaScoreSummary";
import { SprintProgressChart } from "./SprintProgressChart";
import { DomainProgressCard } from "./DomainProgressCard";
import { alphaScoreService } from "@/services/alphaScoreService";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const ProgressOverview = () => {
  const { user } = useAuth();
  const [alphaScoreData, setAlphaScoreData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAlphaScore = async () => {
      if (!user?.id) return;

      try {
        const latest = await alphaScoreService.getLatestScore(user.id);
        
        if (latest) {
          const categories = [
            { id: "relationships", label: "Relationships" },
            { id: "purpose", label: "Purpose" },
            { id: "body", label: "Body" },
            { id: "mind", label: "Mind" }
          ];

          const categoryScores = latest.alpha_score_categories.map((cat: any) => {
            const categoryInfo = categories.find(c => c.id === cat.category);
            return {
              category: cat.category,
              score: cat.score,
              label: categoryInfo?.label || cat.category
            };
          });

          setAlphaScoreData({
            totalScore: latest.total_score,
            categoryScores
          });
        }
      } catch (error) {
        console.error('Error loading alpha score data:', error);
        toast.error('Failed to load alpha score data');
      } finally {
        setIsLoading(false);
      }
    };

    loadAlphaScore();
  }, [user?.id]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sprint Progress Overview</h2>
      
      {/* Stats Cards */}
      <StatsOverview />

      {/* Alpha Score Summary */}
      {isLoading ? (
        <div className="h-[300px] bg-muted rounded-lg animate-pulse" />
      ) : alphaScoreData ? (
        <AlphaScoreSummary data={alphaScoreData} />
      ) : null}

      {/* Overall Progress */}
      <SprintProgressChart />

      {/* Domain Progress */}
      <DomainProgressCard />
    </div>
  );
};
