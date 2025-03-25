
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Users, Heart, Brain, Target } from "lucide-react";

interface DomainProgressProps {
  name: string;
  progress: number;
  icon?: React.ReactNode;
}

export const DomainProgress = ({ name, progress, icon }: DomainProgressProps) => {
  const getDefaultIcon = () => {
    switch (name.toLowerCase()) {
      case "relationships":
        return <Users className="h-4 w-4" />;
      case "body":
        return <Heart className="h-4 w-4" />;
      case "mind":
        return <Brain className="h-4 w-4" />;
      case "purpose":
        return <Target className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-muted">
            {icon || getDefaultIcon()}
          </div>
          <span className="text-sm font-medium">{name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
