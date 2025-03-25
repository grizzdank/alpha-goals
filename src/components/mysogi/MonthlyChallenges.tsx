
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ChallengeCard } from "./ChallengeCard";
import { Card } from "@/components/ui/card";
import { calculateAnimationDelay } from "@/utils/animations";
import { MonthlyChallengeForm } from "./MonthlyChallengeForm";
import { toast } from "sonner";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
  successCriteria?: string;
}

interface MonthlyChallengesProps {
  challenges: Challenge[];
  setChallenges: (challenges: Challenge[]) => void;
  getCategoryIcon: (categoryId: string) => React.ElementType;
  getCategoryColor: (categoryId: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

export const MonthlyChallenges: React.FC<MonthlyChallengesProps> = ({
  challenges,
  setChallenges,
  getCategoryIcon,
  getCategoryColor,
  getStatusBadge
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  
  const handleCreateChallenge = (newChallenge: any) => {
    const id = Math.max(0, ...challenges.map(c => c.id)) + 1;
    const challenge = {
      ...newChallenge,
      id,
      progress: 0,
      status: new Date(newChallenge.startDate) <= new Date() ? 'active' : 'upcoming'
    };
    
    setChallenges([...challenges, challenge]);
    toast.success("Challenge created successfully!");
  };
  
  const handleEditChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateChallenge = (updatedChallenge: any) => {
    const updatedChallenges = challenges.map(challenge => 
      challenge.id === updatedChallenge.id ? updatedChallenge : challenge
    );
    
    setChallenges(updatedChallenges);
    toast.success("Challenge updated successfully!");
  };
  
  const handleUpdateProgress = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsProgressDialogOpen(true);
  };
  
  const categoryOptions = [
    { id: "mind", name: "Mind" },
    { id: "body", name: "Body" },
    { id: "relationships", name: "Relationships" },
    { id: "purpose", name: "Purpose" }
  ];
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Monthly Challenges</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
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
            onEdit={handleEditChallenge}
            onUpdateProgress={handleUpdateProgress}
          />
        ))}
        
        {/* Add Challenge Card */}
        <Card 
          className="border-dashed border-2 flex items-center justify-center h-[300px] animate-fade-in cursor-pointer hover:bg-accent/50 transition-colors group" 
          style={{ animationDelay: calculateAnimationDelay(challenges.length, 50) }}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <div className="flex flex-col items-center text-muted-foreground group-hover:text-foreground">
            <PlusCircle className="h-10 w-10 mb-2 group-hover:text-primary transition-colors" />
            <p className="font-medium">Create New Challenge</p>
          </div>
        </Card>
      </div>
      
      {/* Create Challenge Dialog */}
      <MonthlyChallengeForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateChallenge}
        categories={categoryOptions}
      />
      
      {/* Edit Challenge Dialog */}
      {selectedChallenge && (
        <MonthlyChallengeForm
          challenge={selectedChallenge}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdateChallenge}
          categories={categoryOptions}
        />
      )}
      
      {/* Progress Update Form could be added here */}
    </>
  );
};
