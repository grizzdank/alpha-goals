
import React from "react";
import { Calendar, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Challenge } from "./MonthlyChallenges";
import { toast } from "sonner";

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  getCategoryIcon: (categoryId: string) => React.ElementType;
  getCategoryColor: (categoryId: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  animationDelay: string;
  onEdit: (challenge: Challenge) => void;
  onUpdateProgress?: (challenge: Challenge) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  index,
  getCategoryIcon,
  getCategoryColor,
  getStatusBadge,
  animationDelay,
  onEdit,
  onUpdateProgress
}) => {
  const CategoryIcon = getCategoryIcon(challenge.category);
  
  const handleStartEarly = () => {
    // Change status to active
    const updatedChallenge = {
      ...challenge,
      status: "active",
    };
    onEdit(updatedChallenge);
    toast.success("Challenge started early!");
  };
  
  const handleViewDetails = () => {
    // For completed challenges, display a toast with challenge details
    toast.info(
      <div className="space-y-2">
        <h3 className="font-semibold text-base">{challenge.title}</h3>
        <p className="text-sm">{challenge.description}</p>
        {challenge.successCriteria && (
          <p className="text-sm mt-2">
            <span className="font-medium">Success criteria: </span>
            {challenge.successCriteria}
          </p>
        )}
        <p className="text-sm">Completed on: {challenge.endDate}</p>
      </div>,
      {
        duration: 5000,
      }
    );
  };
  
  return (
    <Card 
      key={challenge.id} 
      className="animate-fade-in hover-lift cursor-pointer"
      style={{ animationDelay }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-lg ${getCategoryColor(challenge.category)}`}>
            <CategoryIcon className="h-5 w-5" />
          </div>
          {getStatusBadge(challenge.status)}
        </div>
        <CardTitle className="mt-2">{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 inline mr-1" />
          {challenge.startDate} - {challenge.endDate}
        </div>
        
        {challenge.successCriteria && (
          <div className="text-sm bg-accent/40 p-2 rounded-md mb-2">
            <span className="font-medium">Success criteria:</span> {challenge.successCriteria}
          </div>
        )}
        
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${challenge.progress}%` }}
          ></div>
        </div>
        <div className="text-sm font-medium mt-1">{challenge.progress}% Complete</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {challenge.status === "active" && onUpdateProgress && (
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={(e) => {
              e.stopPropagation();
              onUpdateProgress(challenge);
            }}
          >
            Update Progress
          </Button>
        )}
        {challenge.status === "upcoming" && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              handleStartEarly();
            }}
          >
            Start Early
          </Button>
        )}
        {challenge.status === "completed" && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(challenge);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Challenge</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};
