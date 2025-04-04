import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, Heart, Brain, Target, Users, BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";
import { Button } from "@/components/ui/button";
import { alphaScoreService } from "@/services/alphaScoreService";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const chartConfig = {
  alphaScore: {
    stroke: "#8B5CF6",
    label: "Alpha Score",
    theme: {
      light: "#8B5CF6",
      dark: "#A78BFA",
    }
  }
};

export const AlphaScoreAnalytics = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [alphaScoreHistory, setAlphaScoreHistory] = useState<any[]>([]);
  const [latestScore, setLatestScore] = useState<any>(null);
  const [categoryScores, setCategoryScores] = useState<any[]>([]);
  const [scoreChanges, setScoreChanges] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      try {
        const [history, latest, changes] = await Promise.all([
          alphaScoreService.getQuarterlyHistory(user.id),
          alphaScoreService.getLatestScore(user.id),
          alphaScoreService.getScoreChanges(user.id)
        ]);

        // Format history data
        const formattedHistory = history.map(score => ({
          quarter: `Q${score.quarter} ${score.year}`,
          score: score.total_score
        }));
        setAlphaScoreHistory(formattedHistory);

        // Set latest score
        setLatestScore(latest);

        // Format category scores with changes
        if (latest?.alpha_score_categories) {
          const categories = [
            { id: "relationships", label: "Relationships", icon: Users, color: "bg-purple-500" },
            { id: "purpose", label: "Purpose", icon: Target, color: "bg-blue-500" },
            { id: "body", label: "Body", icon: Heart, color: "bg-green-500" },
            { id: "mind", label: "Mind", icon: Brain, color: "bg-orange-500" }
          ];

          const formattedCategories = latest.alpha_score_categories.map((cat: any) => {
            const change = changes?.find(c => c.category === cat.category);
            const categoryInfo = categories.find(c => c.id === cat.category);
            return {
              ...cat,
              label: categoryInfo?.label || cat.category,
              icon: categoryInfo?.icon,
              color: categoryInfo?.color,
              change: change ? change.score_change : 0,
              trend: change && change.score_change > 0 ? "up" : "down"
            };
          });

          setCategoryScores(formattedCategories);
        }

        setScoreChanges(changes || []);
      } catch (error) {
        console.error('Error loading alpha score data:', error);
        toast.error('Failed to load alpha score data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleUpdateAlphaScore = () => {
    navigate('/sprints', { state: { showAlphaScoreDialog: true } });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
        <div className="h-96 bg-muted rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Alpha Score Analytics</h2>
        <Button 
          onClick={handleUpdateAlphaScore}
          className="flex items-center gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Update Alpha Score
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categoryScores.map((category) => (
          <StatCard 
            key={category.category}
            title={category.label}
            value={`${category.score}%`}
            description={`${category.change > 0 ? '+' : ''}${category.change}% from last quarter`}
            icon={category.icon && <category.icon className="h-4 w-4" />}
            color={category.color}
          />
        ))}
      </div>
      
      {/* Current Alpha Score Card */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Current Alpha Score</CardTitle>
          <CardDescription>Your overall life performance score</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-6">
            <ProgressCircle 
              percentage={latestScore?.total_score || 0} 
              value={latestScore?.total_score || 0}
              size="lg"
              label="Overall Alpha Score"
            />
          </div>
          {scoreChanges.length > 0 && (
            <div className="flex items-center text-sm text-primary">
              {scoreChanges[0].score_change > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span>
                {scoreChanges[0].score_change > 0 ? '+' : ''}
                {scoreChanges[0].score_change}% from last quarter
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alpha Score History */}
      <Card>
        <CardHeader>
          <CardTitle>Alpha Score History</CardTitle>
          <CardDescription>Your score progression by quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={alphaScoreHistory}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Alpha Score"
                    stroke="#8B5CF6"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
