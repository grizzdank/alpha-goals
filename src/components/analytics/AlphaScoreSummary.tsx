
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressCircle } from "@/components/ui/ProgressCircle";

interface AlphaScoreData {
  totalScore: number;
  categoryScores: {
    category: string;
    score: number;
    label: string;
  }[];
}

interface AlphaScoreSummaryProps {
  data: AlphaScoreData;
}

export const AlphaScoreSummary = ({ data }: AlphaScoreSummaryProps) => {
  const navigate = useNavigate();

  const handleViewAlphaDetails = () => {
    navigate('/analytics', { state: { tab: 'alpha' } });
  };

  return (
    <Card className="hover-lift">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Alpha Score Summary</CardTitle>
          <CardDescription>Your overall life performance score</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleViewAlphaDetails}>
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 flex justify-center">
            <ProgressCircle 
              percentage={data.totalScore} 
              value={data.totalScore}
              size="lg"
              label="Overall Alpha Score"
            />
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {data.categoryScores.map((category) => (
              <div key={category.category} className="flex flex-col items-center">
                <ProgressCircle 
                  percentage={category.score}
                  size="sm"
                  value={category.score}
                  color={category.category}
                  lightColor={`${category.category}-light`}
                  label={category.label}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
