
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from "recharts";
import { habitChartData, chartConfig } from "./HabitData";
import { CustomBarTooltip } from "./CustomTooltips";

export const HabitCompletionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Completion Rates</CardTitle>
        <CardDescription>Percentage of completion for each habit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={habitChartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 70,
                }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                  label={{ 
                    value: 'Percentage (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 20 }} />
                <Bar 
                  dataKey="completed" 
                  name="Completed %" 
                  fill="#4ade80" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="missed" 
                  name="Missed %" 
                  fill="#f87171" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
