
// Sample habit data - would come from your app state
export const habitCompletionData = [
  { habit: "Morning Meditation", completed: 24, missed: 6 },
  { habit: "Read 30 mins", completed: 22, missed: 8 },
  { habit: "Exercise", completed: 18, missed: 12 },
  { habit: "Journal", completed: 26, missed: 4 },
  { habit: "Networking", completed: 15, missed: 15 },
];

// Process data for the chart - shortened habit names for better display
export const habitChartData = habitCompletionData.map(item => ({
  name: item.habit.length > 10 ? item.habit.substring(0, 10) + "..." : item.habit,
  fullName: item.habit, // Keep full name for tooltip
  completed: (item.completed / (item.completed + item.missed)) * 100,
  missed: (item.missed / (item.completed + item.missed)) * 100,
}));

// Status distribution data
export const statusDistributionData = [
  { name: "Completed", value: 105, color: "#4ade80" },  // Green
  { name: "Missed", value: 45, color: "#f87171" },      // Red
];

export const chartConfig = {
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
