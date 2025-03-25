
import React from "react";
import { Brain, Heart, Target, Dumbbell } from "lucide-react";

export const getDomainIcon = (domain: string) => {
  switch(domain) {
    case "mind":
      return <Brain className="h-4 w-4" />;
    case "body":
      return <Dumbbell className="h-4 w-4" />;
    case "purpose":
      return <Target className="h-4 w-4" />;
    case "relationships":
      return <Heart className="h-4 w-4" />;
    default:
      return <Brain className="h-4 w-4" />;
  }
};

export const getDomainColorClass = (domain: string) => {
  switch(domain) {
    case "mind":
      return "bg-mind/10 text-mind border-mind/30";
    case "body":
      return "bg-body/10 text-body border-body/30";
    case "purpose":
      return "bg-purpose/10 text-purpose border-purpose/30";
    case "relationships":
      return "bg-relationships/10 text-relationships border-relationships/30";
    default:
      return "bg-primary/10 text-primary border-primary/30";
  }
};
