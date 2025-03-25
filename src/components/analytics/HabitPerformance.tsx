
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sample habit data - would come from your app state
const habitCompletionData = [
  { habit: "Morning Meditation", completed: 24, missed: 6 },
  { habit: "Read 30 mins", completed: 22, missed: 8 },
  { habit: "Exercise", completed: 18, missed: 12 },
  { habit: "Journal", completed: 26, missed: 4 },
  { habit: "Networking", completed: 15, missed: 15 },
];

// Process data for the chart
const habitChartData = habitCompletionData.map(item => ({
  name: item.habit,
  completed: (item.completed / (item.completed + item.missed)) * 100,
  missed: (item.missed / (item.completed + item.missed)) * 100,
}));

// Status distribution data
const statusDistributionData = [
  { name: "Completed", value: 105, color: "#4ade80" },  // Green
  { name: "Missed", value: 45, color: "#f87171" },      // Red
];

const chartConfig = {
  completed: {
    stroke: "#4ade80",
    label: "Completed (%)",
    theme: {
      light: "#4ade80",
      dark: "#4ade80",
    }
  },
  missed: {
    stroke: "#f87171",
    label: "Missed (%)",
    theme: {
      light: "#f87171",
      dark: "#f87171",
    }
  }
};

export const HabitPerformance = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Habit Performance Analysis</h2>
      
      {/* Habit Completion Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Habit Completion Rates</CardTitle>
          <CardDescription>Percentage of completion for each habit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={habitChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    label={{ 
                      value: 'Percentage (%)', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  <Tooltip />
                  <Legend />
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

      {/* Status Distribution Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Habit Status</CardTitle>
            <CardDescription>Distribution of completed vs missed habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} instances`, 'Count']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Habits Table */}
        <Card>
          <CardHeader>
            <CardTitle>Habit Tracking Details</CardTitle>
            <CardDescription>Detailed breakdown of habit completion</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Habit</TableHead>
                  <TableHead className="text-right">Completed</TableHead>
                  <TableHead className="text-right">Missed</TableHead>
                  <TableHead className="text-right">Success Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {habitCompletionData.map((habit) => (
                  <TableRow key={habit.habit}>
                    <TableCell className="font-medium">{habit.habit}</TableCell>
                    <TableCell className="text-right">{habit.completed}</TableCell>
                    <TableCell className="text-right">{habit.missed}</TableCell>
                    <TableCell className="text-right">
                      {((habit.completed / (habit.completed + habit.missed)) * 100).toFixed(0)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
