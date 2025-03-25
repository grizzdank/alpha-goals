
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Target, Users } from "lucide-react";

interface AlphaScoreRecorderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

type ScoreCategory = {
  id: "relationships" | "purpose" | "body" | "mind";
  label: string;
  icon: React.ElementType;
  description: string;
  score: number;
};

export function AlphaScoreRecorder({ 
  open, 
  onOpenChange,
  onComplete
}: AlphaScoreRecorderProps) {
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<ScoreCategory[]>([
    {
      id: "relationships",
      label: "Relationships",
      icon: Users,
      description: "Family, friends, romantic, community",
      score: 70
    },
    {
      id: "purpose",
      label: "Purpose",
      icon: Target,
      description: "Career, contribution, meaning",
      score: 65
    },
    {
      id: "body",
      label: "Body",
      icon: Heart,
      description: "Health, fitness, nutrition, sleep",
      score: 60
    },
    {
      id: "mind",
      label: "Mind",
      icon: Brain,
      description: "Learning, growth, mental clarity",
      score: 75
    }
  ]);

  const handleScoreChange = (id: string, value: string) => {
    const numValue = parseInt(value);
    
    // Ensure the value is between 0 and 100
    const clampedValue = Math.min(Math.max(isNaN(numValue) ? 0 : numValue, 0), 100);
    
    setCategories(categories.map(category => 
      category.id === id ? { ...category, score: clampedValue } : category
    ));
  };

  const calculateTotalScore = () => {
    const sum = categories.reduce((total, category) => total + category.score, 0);
    return Math.round(sum / categories.length);
  };

  const handleSave = () => {
    // In a real app, save the scores to your database
    const totalScore = calculateTotalScore();
    
    // Here you would save the data
    console.log("Saving alpha scores:", { 
      total: totalScore,
      categories: categories.map(c => ({ id: c.id, score: c.score }))
    });
    
    toast({
      title: "Alpha Score Updated",
      description: `Your Q3 2023 Alpha Score is ${totalScore}.`,
    });
    
    if (onComplete) {
      onComplete();
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Your Alpha Score</DialogTitle>
          <DialogDescription>
            Record your life performance score at the end of this sprint.
            This helps track your overall progress quarter by quarter.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary">{calculateTotalScore()}</div>
            <div className="text-sm text-muted-foreground">Overall Alpha Score</div>
          </div>
          
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-${category.id}/10 text-${category.id} mr-2`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{category.label}</div>
                    <div className="text-xs text-muted-foreground">{category.description}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={category.score}
                    onChange={(e) => handleScoreChange(category.id, e.target.value)}
                    className="w-16"
                  />
                  <Progress value={category.score} className="h-2 flex-1" />
                  <span className="text-sm w-8 text-right">{category.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Alpha Score
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
