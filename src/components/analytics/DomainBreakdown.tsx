
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Target, Dumbbell } from "lucide-react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

// Sample domain data
const domainData = [
  { domain: "Mind", score: 85, habits: 5, completed: 127, color: "#8B5CF6" },
  { domain: "Body", score: 65, habits: 4, completed: 98, color: "#3B82F6" },
  { domain: "Purpose", score: 78, habits: 3, completed: 105, color: "#10B981" },
  { domain: "Relationships", score: 70, habits: 4, completed: 112, color: "#F59E0B" },
];

// Data for radar chart
const radarData = [
  { subject: 'Mind', A: 85, fullMark: 100 },
  { subject: 'Body', A: 65, fullMark: 100 },
  { subject: 'Purpose', A: 78, fullMark: 100 },
  { subject: 'Relationships', A: 70, fullMark: 100 },
];

// Data for domain distribution chart
const distributionData = [
  { name: 'Mind', habits: 5, completed: 127 },
  { name: 'Body', habits: 4, completed: 98 },
  { name: 'Purpose', habits: 3, completed: 105 },
  { name: 'Relationships', habits: 4, completed: 112 },
];

const chartConfig = {
  mind: {
    color: "#8B5CF6",
    label: "Mind",
    theme: {
      light: "#8B5CF6",
      dark: "#A78BFA",
    }
  },
  body: {
    color: "#3B82F6",
    label: "Body",
    theme: {
      light: "#3B82F6",
      dark: "#60A5FA",
    }
  },
  purpose: {
    color: "#10B981",
    label: "Purpose",
    theme: {
      light: "#10B981",
      dark: "#34D399",
    }
  },
  relationships: {
    color: "#F59E0B",
    label: "Relationships",
    theme: {
      light: "#F59E0B",
      dark: "#FBBF24",
    }
  }
};

export const DomainBreakdown = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Domain Analysis</h2>
      
      {/* Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DomainCard
          domain="Mind"
          score={85}
          icon={<Brain className="h-5 w-5" />}
          color="bg-purple-500"
          description="Mental well-being and growth"
        />
        <DomainCard
          domain="Body"
          score={65}
          icon={<Dumbbell className="h-5 w-5" />}
          color="bg-blue-500"
          description="Physical health and fitness"
        />
        <DomainCard
          domain="Purpose"
          score={78}
          icon={<Target className="h-5 w-5" />}
          color="bg-emerald-500"
          description="Goals and aspirations"
        />
        <DomainCard
          domain="Relationships"
          score={70}
          icon={<Heart className="h-5 w-5" />}
          color="bg-amber-500"
          description="Social connections"
        />
      </div>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Balance</CardTitle>
          <CardDescription>Visual representation of your focus across domains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Domain Score"
                    dataKey="A"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.6}
                  />
                  <Tooltip formatter={(value) => [value, 'Score']} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Habit Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Habit Distribution by Domain</CardTitle>
          <CardDescription>Number of habits and completions per domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={distributionData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Completed', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="habits" name="Number of Habits" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="completed" name="Times Completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Domain Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Progress Details</CardTitle>
          <CardDescription>Detailed breakdown of each domain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {domainData.map((domain) => (
            <div key={domain.domain} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: domain.color }}></div>
                  <span className="font-medium">{domain.domain}</span>
                </div>
                <span className="text-sm text-muted-foreground">{domain.score}%</span>
              </div>
              <Progress value={domain.score} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>{domain.habits} habits</span>
                <span>{domain.completed} completions</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

// Domain card component
const DomainCard = ({ domain, score, icon, color, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{domain}</CardTitle>
      <div className={`${color} p-2 rounded-full text-white`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{score}%</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <Progress value={score} className="h-1.5 mt-2" />
    </CardContent>
  </Card>
);
