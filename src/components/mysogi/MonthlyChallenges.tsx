
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ChallengeCard } from "./ChallengeCard";
import { Card } from "@/components/ui/card";
import { calculateAnimationDelay } from "@/utils/animations";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
}

interface MonthlyChallengesProps {
  challenges: Challenge[];
  getCategoryIcon: (categoryId: string) => React.ElementType;
  getCategoryColor: (categoryId: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

export const MonthlyChallenges: React.FC<MonthlyChallengesProps> = ({
  challenges,
  getCategoryIcon,
  getCategoryColor,
  getStatusBadge
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Monthly Challenges</h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Challenge
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            index={index}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
            getStatusBadge={getStatusBadge}
            animationDelay={calculateAnimationDelay(index, 50)}
          />
        ))}
        
        {/* Add Challenge Card */}
        <Card className="border-dashed border-2 flex items-center justify-center h-[300px] animate-fade-in cursor-pointer hover:bg-accent/50 transition-colors group" style={{ animationDelay: calculateAnimationDelay(challenges.length, 50) }}>
          <div className="flex flex-col items-center text-muted-foreground group-hover:text-foreground">
            <PlusCircle className="h-10 w-10 mb-2 group-hover:text-primary transition-colors" />
            <p className="font-medium">Create New Challenge</p>
          </div>
        </Card>
      </div>
    </>
  );
};
