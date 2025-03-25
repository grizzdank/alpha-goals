
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Award, Target, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { useNavigate } from "react-router-dom";

// Sample data - in a real app, this would come from your API or state management
const sprintProgressData = [
  { day: 'Day 1', progress: 10 },
  { day: 'Day 8', progress: 25 },
  { day: 'Day 15', progress: 40 },
  { day: 'Day 22', progress: 60 },
  { day: 'Day 29', progress: 75 },
  { day: 'Day 36', progress: 85 },
  { day: 'Day 43', progress: 90 },
];

const chartConfig = {
  sprintProgress: {
    stroke: "#8B5CF6",
    label: "Sprint Progress",
    theme: {
      light: "#8B5CF6",
      dark: "#A78BFA",
    }
  }
};

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
  const navigate = useNavigate();

  const handleViewAlphaDetails = () => {
    navigate('/analytics', { state: { tab: 'alpha' } });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sprint Progress Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Sprint Completion" 
          value="72%" 
          description="Current sprint progress" 
          icon={<TrendingUp className="h-5 w-5" />} 
          color="bg-purple-500"
        />
        <StatCard 
          title="Habit Consistency" 
          value="85%" 
          description="Daily habits completed" 
          icon={<BarChart3 className="h-5 w-5" />} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Key Objectives" 
          value="4/6" 
          description="Major objectives completed" 
          icon={<Target className="h-5 w-5" />} 
          color="bg-green-500"
        />
        <StatCard 
          title="Best Performing Area" 
          value="Mind" 
          description="Highest completion domain" 
          icon={<Award className="h-5 w-5" />} 
          color="bg-amber-500"
        />
      </div>

      {/* Alpha Score Summary */}
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
                percentage={alphaScoreData.totalScore} 
                value={alphaScoreData.totalScore}
                size="lg"
                label="Overall Alpha Score"
              />
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {alphaScoreData.categoryScores.map((category) => (
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

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Progress tracked over the current sprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sprintProgressData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    label={{ 
                      value: 'Progress (%)', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    name="Sprint Progress"
                    stroke="#8B5CF6"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Domain Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Progress</CardTitle>
          <CardDescription>Progress across all domains</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DomainProgress name="Mind" progress={85} />
          <DomainProgress name="Body" progress={65} />
          <DomainProgress name="Purpose" progress={78} />
          <DomainProgress name="Relationships" progress={70} />
        </CardContent>
      </Card>
    </div>
  );
};

// Reusable stats card component
const StatCard = ({ title, value, description, icon, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`${color} p-2 rounded-full text-white`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

// Domain progress component
const DomainProgress = ({ name, progress }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm text-muted-foreground">{progress}%</span>
    </div>
    <Progress value={progress} className="h-2" />
  </div>
);
