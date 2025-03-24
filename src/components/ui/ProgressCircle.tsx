
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  percentage: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  lightColor?: string;
  label?: string;
  value?: string | number;
  className?: string;
}

export function ProgressCircle({
  percentage,
  size = "md",
  color = "primary",
  lightColor,
  label,
  value,
  className,
}: ProgressCircleProps) {
  // Ensure percentage is between 0 and 100
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));
  
  // Calculate sizes based on the size prop
  const dimensions = {
    sm: { size: 80, stroke: 4, fontSize: "text-xs", valueFontSize: "text-lg" },
    md: { size: 120, stroke: 6, fontSize: "text-sm", valueFontSize: "text-2xl" },
    lg: { size: 160, stroke: 8, fontSize: "text-base", valueFontSize: "text-3xl" },
    xl: { size: 200, stroke: 10, fontSize: "text-lg", valueFontSize: "text-4xl" },
  };

  const { size: circleSize, stroke, fontSize, valueFontSize } = dimensions[size];
  const radius = (circleSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - normalizedPercentage / 100);

  const trackColor = lightColor || `${color}-light`;
  const progressColor = color;

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative flex items-center justify-center">
        <svg 
          width={circleSize} 
          height={circleSize} 
          viewBox={`0 0 ${circleSize} ${circleSize}`} 
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={`hsl(var(--${trackColor}))`}
            strokeWidth={stroke}
            className="opacity-30"
          />
          
          {/* Progress arc */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={`hsl(var(--${progressColor}))`}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center value */}
        <div className="absolute flex flex-col items-center justify-center">
          {value !== undefined && (
            <span className={cn("font-semibold", valueFontSize)}>{value}</span>
          )}
        </div>
      </div>
      
      {/* Label below the circle */}
      {label && (
        <span className={cn("mt-2 font-medium text-center", fontSize)}>
          {label}
        </span>
      )}
    </div>
  );
}
