
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, CheckCircle } from "lucide-react";
import { calculateAnimationDelay } from "@/utils/animations";

interface MilestoneProps {
  title: string;
  completed: boolean;
}

interface AnnualChallengeProps {
  challenge: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    progress: number;
    domains: string[];
    milestones: MilestoneProps[];
  };
  getCategoryColor: (categoryId: string) => string;
}

export const AnnualChallenge: React.FC<AnnualChallengeProps> = ({ 
  challenge, 
  getCategoryColor 
}) => {
  return (
    <>
      <div className="glass rounded-xl md:rounded-2xl p-6 mb-6 animate-fade-in" style={{ animationDelay: calculateAnimationDelay(0) }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-bold">{challenge.title}</h2>
            </div>
            <p className="text-muted-foreground">{challenge.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {challenge.domains.map((domain) => (
                <Badge key={domain} variant="outline" className={getCategoryColor(domain)}>
                  {domain.charAt(0).toUpperCase() + domain.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end">
            <div className="text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4 inline mr-1" />
              {challenge.startDate} - {challenge.endDate}
            </div>
            <div className="w-full max-w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${challenge.progress}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium mt-1">{challenge.progress}% Complete</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {challenge.milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border ${milestone.completed ? 'bg-primary/10 border-primary/20' : 'bg-card/50 border-border/50'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{milestone.title}</span>
                {milestone.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button className="mb-6">Update Annual Challenge Progress</Button>
    </>
  );
};
