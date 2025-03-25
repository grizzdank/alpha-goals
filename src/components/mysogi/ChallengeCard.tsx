
import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface ChallengeCardProps {
  challenge: {
    id: number;
    title: string;
    description: string;
    category: string;
    startDate: string;
    endDate: string;
    progress: number;
    status: string;
  };
  index: number;
  getCategoryIcon: (categoryId: string) => React.ElementType;
  getCategoryColor: (categoryId: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  animationDelay: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  index,
  getCategoryIcon,
  getCategoryColor,
  getStatusBadge,
  animationDelay
}) => {
  const CategoryIcon = getCategoryIcon(challenge.category);
  
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
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${challenge.progress}%` }}
          ></div>
        </div>
        <div className="text-sm font-medium mt-1">{challenge.progress}% Complete</div>
      </CardContent>
      <CardFooter>
        {challenge.status === "active" && (
          <Button variant="outline" className="w-full">Update Progress</Button>
        )}
        {challenge.status === "upcoming" && (
          <Button variant="outline" className="w-full">Start Early</Button>
        )}
        {challenge.status === "completed" && (
          <Button variant="outline" className="w-full">View Details</Button>
        )}
      </CardFooter>
    </Card>
  );
};
