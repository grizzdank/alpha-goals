
import React from "react";
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
  ResponsiveContainer 
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, Heart, Brain, Target, Users } from "lucide-react";

// Sample data - in a real app, this would come from your API or state management
const alphaScoreHistory = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 70 },
  { month: 'May', score: 74 },
  { month: 'Jun', score: 76 },
];

const categoryScores = [
  { category: "relationships", score: 82, label: "Relationships", icon: Users, change: 5, trend: "up" },
  { category: "purpose", score: 75, label: "Purpose", icon: Target, change: 3, trend: "up" },
  { category: "body", score: 68, label: "Body", icon: Heart, change: -2, trend: "down" },
  { category: "mind", score: 79, label: "Mind", icon: Brain, change: 4, trend: "up" },
];

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
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Alpha Score Analytics</h2>
      
      {/* Current Alpha Score Card */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Current Alpha Score</CardTitle>
          <CardDescription>Your overall life performance score</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-6">
            <ProgressCircle 
              percentage={76} 
              value={76}
              size="lg"
              label="Overall Alpha Score"
            />
          </div>
          <div className="flex items-center text-sm text-primary">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+4.2% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Alpha Score History */}
      <Card>
        <CardHeader>
          <CardTitle>Alpha Score History</CardTitle>
          <CardDescription>Your score progression over time</CardDescription>
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
                  <XAxis dataKey="month" />
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

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Detailed view of each life dimension</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryScores.map((category) => (
              <div key={category.category} className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg bg-${category.category}/10 text-${category.category} mr-2`}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{category.label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">{category.score}</span>
                    <div className={`flex items-center ${category.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {category.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>{category.change}%</span>
                    </div>
                  </div>
                </div>
                <ProgressCircle 
                  percentage={category.score}
                  size="md"
                  value={category.score}
                  color={category.category}
                  lightColor={`${category.category}-light`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
