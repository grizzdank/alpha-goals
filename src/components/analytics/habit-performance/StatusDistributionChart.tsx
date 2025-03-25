
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import { statusDistributionData } from "./HabitData";
import { CustomPieTooltip, CustomLegend } from "./CustomTooltips";

export const StatusDistributionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Habit Status</CardTitle>
        <CardDescription>Distribution of completed vs missed habits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex flex-col justify-center">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend 
                  content={<CustomLegend />} 
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ marginTop: 20 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
