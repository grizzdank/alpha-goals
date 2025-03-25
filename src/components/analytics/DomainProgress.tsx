
import React from "react";
import { Progress } from "@/components/ui/progress";

interface DomainProgressProps {
  name: string;
  progress: number;
}

export const DomainProgress = ({ name, progress }: DomainProgressProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm text-muted-foreground">{progress}%</span>
    </div>
    <Progress value={progress} className="h-2" />
  </div>
);
