
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Pencil, BarChart3 } from "lucide-react";
import { SprintProgress } from "./SprintProgress";
import { SprintObjectives } from "./SprintObjectives";
import { SprintUpdates } from "./SprintUpdates";
import { Button } from "@/components/ui/button";

interface CurrentSprintProps {
  onEdit?: () => void;
  onUpdateAlphaScore?: () => void;
}

export function CurrentSprint({ onEdit, onUpdateAlphaScore }: CurrentSprintProps) {
  const navigate = useNavigate();
  
  // Sample data - in a real app this would come from your state/API
  const daysLeft = 12;
  const isNearingEnd = daysLeft <= 14; // If 2 weeks or less remaining
  
  const handleAnalyticsClick = () => {
    navigate('/analytics', { state: { tab: 'alpha' } });
  };
  
  return (
    <div className="glass rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Current Sprint</h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Your 90-day focus period to make meaningful progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onEdit} 
              className="h-8 w-8"
              title="Edit Sprint"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          <div className="h-9 w-9 rounded-full bg-relationships/20 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-relationships" />
          </div>
        </div>
      </div>
      
      <SprintProgress />
      
      {isNearingEnd && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">
                {daysLeft} days left - Remember to update your Alpha Score
              </span>
            </div>
            {onUpdateAlphaScore && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onUpdateAlphaScore}
                className="text-xs h-8"
              >
                Update Score
              </Button>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SprintObjectives />
        <SprintUpdates />
      </div>
      
      <div className="mt-4 md:mt-6 flex items-center justify-between">
        <Link to="/sprints/archive" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Sprint Archive
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm text-muted-foreground"
          onClick={handleAnalyticsClick}
        >
          View Alpha Score Analytics
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
