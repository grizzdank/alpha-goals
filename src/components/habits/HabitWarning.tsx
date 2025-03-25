
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface HabitWarningProps {
  activeCount: number;
}

export function HabitWarning({ activeCount }: HabitWarningProps) {
  if (activeCount < 5) return null;
  
  return (
    <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
      <CardContent className="p-4 flex gap-3 items-center">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            You currently have {activeCount} active habits
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
            For best results, consider focusing on 3-5 key habits at a time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
