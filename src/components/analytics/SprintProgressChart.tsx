
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
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

export const SprintProgressChart = () => {
  return (
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
  );
};
