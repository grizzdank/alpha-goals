
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
        <div className="h-[350px] sm:h-[400px] w-full overflow-x-auto pb-6">
          <div className="min-w-[500px] h-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={habitChartData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 5,
                    bottom: 70,
                  }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    domain={[0, 100]}
                    label={{ 
                      value: '%', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fontSize: 12 }
                    }}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 15, fontSize: 12 }} />
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
        </div>
      </CardContent>
    </Card>
  );
};
