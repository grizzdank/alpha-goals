
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, CheckCircle, Edit, ListChecks } from "lucide-react";
import { calculateAnimationDelay } from "@/utils/animations";
import { AnnualChallengeForm } from "./AnnualChallengeForm";
import { AnnualChallengeProgressDialog } from "./AnnualChallengeProgressDialog";
import { toast } from "sonner";

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
    vision?: string;
    purpose?: string;
    prepSteps?: string[];
  };
  setChallenge: (challenge: any) => void;
  getCategoryColor: (categoryId: string) => string;
}

export const AnnualChallenge: React.FC<AnnualChallengeProps> = ({ 
  challenge, 
  setChallenge,
  getCategoryColor 
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [completedPrepSteps, setCompletedPrepSteps] = useState<boolean[]>(
    challenge.prepSteps ? challenge.prepSteps.map(() => false) : []
  );
  
  const handleEditChallenge = (updatedChallenge: any) => {
    setChallenge({
      ...challenge,
      ...updatedChallenge
    });
    toast.success("Annual challenge updated successfully!");
  };
  
  const handleUpdateProgress = (data: {
    progress: number;
    completedPrepSteps: boolean[];
    completedMilestones: boolean[];
  }) => {
    setCompletedPrepSteps(data.completedPrepSteps);
    
    const updatedMilestones = challenge.milestones.map((milestone, index) => ({
      ...milestone,
      completed: data.completedMilestones[index]
    }));
    
    setChallenge({
      ...challenge,
      progress: data.progress,
      milestones: updatedMilestones
    });
  };
  
  return (
    <>
      <div className="glass rounded-xl md:rounded-2xl p-6 mb-6 animate-fade-in" style={{ animationDelay: calculateAnimationDelay(0) }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-bold">{challenge.title}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 h-8 w-8"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground">{challenge.description}</p>
            
            {challenge.vision && (
              <div className="mt-4 bg-primary/10 rounded-lg p-3">
                <p className="font-medium">This year I will...</p>
                <p className="text-sm mt-1">{challenge.vision}</p>
              </div>
            )}
            
            {challenge.purpose && (
              <div className="mt-3 bg-secondary/10 rounded-lg p-3">
                <p className="font-medium">This is important because...</p>
                <p className="text-sm mt-1">{challenge.purpose}</p>
              </div>
            )}
            
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
        
        {challenge.prepSteps && challenge.prepSteps.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Preparation Steps</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {challenge.prepSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-2 ${completedPrepSteps[index] ? 'bg-green-100 dark:bg-green-900/20' : 'bg-accent/20'} p-3 rounded-md`}
                >
                  <span className={`${completedPrepSteps[index] ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-primary/20 text-primary'} h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {completedPrepSteps[index] ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </span>
                  <p className={`text-sm ${completedPrepSteps[index] ? 'line-through opacity-70' : ''}`}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
      
      <Button 
        className="mb-6"
        onClick={() => setIsProgressDialogOpen(true)}
      >
        Update Annual Challenge Progress
      </Button>
      
      {/* Edit Annual Challenge Dialog */}
      <AnnualChallengeForm
        challenge={{
          title: challenge.title,
          description: challenge.description,
          vision: challenge.vision || "",
          purpose: challenge.purpose || "",
          prepSteps: challenge.prepSteps || ["", "", ""],
          startDate: challenge.startDate,
          endDate: challenge.endDate
        }}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditChallenge}
      />
      
      {/* Progress Update Dialog */}
      <AnnualChallengeProgressDialog
        open={isProgressDialogOpen}
        onOpenChange={setIsProgressDialogOpen}
        challenge={challenge}
        onUpdateProgress={handleUpdateProgress}
        completedPrepSteps={completedPrepSteps}
      />
    </>
  );
};
