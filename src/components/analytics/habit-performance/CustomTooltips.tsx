
import React from "react";

// Custom tooltip to show full habit name
export const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const habit = payload[0]?.payload?.fullName || label;
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium">{habit}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(0)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom tooltip for pie chart
export const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.color }}>
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend renderer for pie chart
export const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex justify-center space-x-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 mr-2 rounded-sm" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};
