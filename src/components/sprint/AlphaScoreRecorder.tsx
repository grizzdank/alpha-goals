
import React, { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AlphaScoreRecorderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

type MetricType = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  infoText?: string;
};

type CategoryType = {
  id: "relationships" | "purpose" | "body" | "mind";
  label: string;
  icon: React.ElementType;
  description: string;
  metrics: MetricType[];
  score: number;
};

export function AlphaScoreRecorder({ 
  open, 
  onOpenChange,
  onComplete
}: AlphaScoreRecorderProps) {
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<CategoryType[]>([
    {
      id: "relationships",
      label: "Relationships",
      icon: Users,
      description: "Family, friends, romantic, community",
      metrics: [
        { id: "kids", label: "Weekly meaningful interactions with kids", value: 15, min: 0, max: 30, step: 1, infoText: "If applicable" },
        { id: "partner", label: "Weekly meaningful interactions with partner", value: 20, min: 0, max: 30, step: 1 },
        { id: "friends", label: "Weekly conversations with friends", value: 15, min: 0, max: 30, step: 1 },
        { id: "family", label: "Weekly conversations with extended family", value: 20, min: 0, max: 30, step: 1 }
      ],
      score: 0
    },
    {
      id: "purpose",
      label: "Purpose",
      icon: Target,
      description: "Career, contribution, meaning",
      metrics: [
        { id: "incomeStreams", label: "Total income streams", value: 3, min: 0, max: 10, step: 1 },
        { id: "savings", label: "Months of savings", value: 6, min: 0, max: 30, step: 1 },
        { id: "passiveIncome", label: "Percentage of income that is passive", value: 20, min: 0, max: 100, step: 10 }
      ],
      score: 0
    },
    {
      id: "body",
      label: "Body",
      icon: Heart,
      description: "Health, fitness, nutrition, sleep",
      metrics: [
        { id: "diet", label: "Days/week following desired diet", value: 4, min: 0, max: 7, step: 1 },
        { id: "exercise", label: "Days/week exercising", value: 3, min: 0, max: 7, step: 1 },
        { id: "sleep", label: "Nights/week of good sleep", value: 5, min: 0, max: 7, step: 1 }
      ],
      score: 0
    },
    {
      id: "mind",
      label: "Mind",
      icon: Brain,
      description: "Learning, growth, mental clarity",
      metrics: [
        { id: "meditation", label: "Days/week using meditation/breathwork/prayer", value: 4, min: 0, max: 7, step: 1 },
        { id: "visualization", label: "Days/week of visualization/vision board/affirmations", value: 3, min: 0, max: 7, step: 1 },
        { id: "journaling", label: "Days/week of journaling/writing goals/gratitude", value: 5, min: 0, max: 7, step: 1 }
      ],
      score: 0
    }
  ]);

  // Calculate scores when metrics change
  useEffect(() => {
    calculateCategoryScores();
  }, []);

  const calculateCategoryScores = () => {
    const updatedCategories = categories.map(category => {
      let totalValue = 0;
      let maxPossibleValue = 0;
      
      category.metrics.forEach(metric => {
        totalValue += metric.value;
        maxPossibleValue += metric.max;
      });
      
      // Calculate score as a percentage of max possible value
      const score = Math.round((totalValue / maxPossibleValue) * 100);
      
      return {
        ...category,
        score
      };
    });
    
    setCategories(updatedCategories);
  };

  const handleMetricChange = (categoryId: string, metricId: string, value: number) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        const updatedMetrics = category.metrics.map(metric => {
          if (metric.id === metricId) {
            return { ...metric, value };
          }
          return metric;
        });
        
        return { ...category, metrics: updatedMetrics };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    calculateCategoryScores();
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
      categories: categories.map(c => ({ 
        id: c.id, 
        score: c.score,
        metrics: c.metrics.map(m => ({ id: m.id, value: m.value }))
      }))
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Your Alpha Score</DialogTitle>
          <DialogDescription>
            Record your life performance metrics at the end of this sprint.
            This helps track your overall progress quarter by quarter.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary">{calculateTotalScore()}</div>
            <div className="text-sm text-muted-foreground">Overall Alpha Score</div>
          </div>
          
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-primary/10 text-primary mr-2`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{category.label}</div>
                    <div className="text-xs text-muted-foreground">{category.description}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm font-medium">{category.score}%</span>
                  </div>
                </div>
                
                <div className="space-y-4 pl-2 border-l-2 border-primary/20">
                  {category.metrics.map((metric) => (
                    <div key={metric.id} className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor={`${category.id}-${metric.id}`} className="text-sm">
                          {metric.label}
                          {metric.infoText && <span className="text-xs text-muted-foreground ml-1">({metric.infoText})</span>}
                        </Label>
                        <span className="text-sm">{metric.value} / {metric.max}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          id={`${category.id}-${metric.id}`}
                          type="range"
                          min={metric.min}
                          max={metric.max}
                          step={metric.step}
                          value={metric.value}
                          onChange={(e) => handleMetricChange(category.id, metric.id, parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
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
