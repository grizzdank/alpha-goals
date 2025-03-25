
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
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, Heart, Brain, Target, Users } from "lucide-react";
import { StatCard } from "./StatCard";

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
  { 
    category: "relationships", 
    score: 82, 
    label: "Relationships", 
    icon: Users, 
    change: 5, 
    trend: "up",
    metrics: [
      { name: "Interactions with kids", value: 25, max: 30 },
      { name: "Interactions with partner", value: 23, max: 30 },
      { name: "Conversations with friends", value: 18, max: 30 },
      { name: "Conversations with family", value: 16, max: 30 }
    ]
  },
  { 
    category: "purpose", 
    score: 75, 
    label: "Purpose", 
    icon: Target, 
    change: 3, 
    trend: "up",
    metrics: [
      { name: "Income streams", value: 3, max: 10 },
      { name: "Months of savings", value: 8, max: 30 },
      { name: "Passive income %", value: 30, max: 100 }
    ]
  },
  { 
    category: "body", 
    score: 68, 
    label: "Body", 
    icon: Heart, 
    change: -2, 
    trend: "down",
    metrics: [
      { name: "Diet adherence (days/week)", value: 4, max: 7 },
      { name: "Exercise (days/week)", value: 3, max: 7 },
      { name: "Good sleep (nights/week)", value: 5, max: 7 }
    ]
  },
  { 
    category: "mind", 
    score: 79, 
    label: "Mind", 
    icon: Brain, 
    change: 4, 
    trend: "up",
    metrics: [
      { name: "Meditation (days/week)", value: 5, max: 7 },
      { name: "Visualization (days/week)", value: 4, max: 7 },
      { name: "Journaling (days/week)", value: 6, max: 7 }
    ]
  },
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Relationships"
          value="82%"
          description="+5% from last quarter"
          icon={<Users className="h-4 w-4" />}
          color="bg-purple-500"
        />
        <StatCard 
          title="Purpose"
          value="75%"
          description="+3% from last quarter"
          icon={<Target className="h-4 w-4" />}
          color="bg-blue-500"
        />
        <StatCard 
          title="Body"
          value="68%"
          description="-2% from last quarter"
          icon={<Heart className="h-4 w-4" />}
          color="bg-green-500"
        />
        <StatCard 
          title="Mind"
          value="79%"
          description="+4% from last quarter"
          icon={<Brain className="h-4 w-4" />}
          color="bg-orange-500"
        />
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
              percentage={76} 
              value={76}
              size="lg"
              label="Overall Alpha Score"
            />
          </div>
          <div className="flex items-center text-sm text-primary">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+4.2% from last quarter</span>
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
      {categoryScores.map((category) => (
        <Card key={category.category} className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-${category.category}/10 text-${category.category}`}>
                <category.icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">{category.label}</CardTitle>
                <div className="flex items-center">
                  <span className="font-bold mr-2">{category.score}%</span>
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
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex justify-center items-center">
                <ProgressCircle 
                  percentage={category.score}
                  size="md"
                  value={category.score}
                  color={category.category}
                  lightColor={`${category.category}-light`}
                />
              </div>
              <div className="md:col-span-2">
                <div className="h-[200px] w-full">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={category.metrics}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 100,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 'dataMax']} />
                        <YAxis dataKey="name" type="category" scale="band" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" name="Current" />
                        <Bar dataKey="max" fill="#82ca9d" name="Maximum" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
