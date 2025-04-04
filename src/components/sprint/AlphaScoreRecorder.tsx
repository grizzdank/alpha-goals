import React, { useState, useEffect, useCallback } from "react";
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
import { Brain, Heart, Target, Users, TrendingUp, TrendingDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { alphaScoreService, type CategoryData, type MetricData, type AlphaScore } from "@/services/alphaScoreService";
import { useAuth } from "@/contexts/auth/hooks";

interface AlphaScoreRecorderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
  sprintId?: string;
}

type CategoryType = {
  id: "relationships" | "purpose" | "body" | "mind";
  label: string;
  icon: React.ElementType;
  description: string;
  metrics: MetricData[];
  score: number;
};

export function AlphaScoreRecorder({ 
  open, 
  onOpenChange,
  onComplete,
  sprintId
}: AlphaScoreRecorderProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previousScore, setPreviousScore] = useState<AlphaScore | null>(null);
  
  const [categories, setCategories] = useState<CategoryType[]>([
    {
      id: "relationships",
      label: "Relationships",
      icon: Users,
      description: "Family, friends, romantic, community",
      metrics: [
        { id: "kids", label: "Weekly meaningful interactions with kids", value: 15, max: 30, step: 1, infoText: "If applicable" },
        { id: "partner", label: "Weekly meaningful interactions with partner", value: 20, max: 30, step: 1 },
        { id: "friends", label: "Weekly conversations with friends", value: 15, max: 30, step: 1 },
        { id: "family", label: "Weekly conversations with extended family", value: 20, max: 30, step: 1 }
      ],
      score: 0
    },
    {
      id: "purpose",
      label: "Purpose",
      icon: Target,
      description: "Career, contribution, meaning",
      metrics: [
        { id: "incomeStreams", label: "Total income streams", value: 3, max: 10, step: 1 },
        { id: "savings", label: "Months of savings", value: 6, max: 30, step: 1 },
        { id: "passiveIncome", label: "Percentage of income that is passive", value: 20, max: 100, step: 10 }
      ],
      score: 0
    },
    {
      id: "body",
      label: "Body",
      icon: Heart,
      description: "Health, fitness, nutrition, sleep",
      metrics: [
        { id: "diet", label: "Days/week following desired diet", value: 4, max: 7, step: 1 },
        { id: "exercise", label: "Days/week exercising", value: 3, max: 7, step: 1 },
        { id: "sleep", label: "Nights/week of good sleep", value: 5, max: 7, step: 1 }
      ],
      score: 0
    },
    {
      id: "mind",
      label: "Mind",
      icon: Brain,
      description: "Learning, growth, mental clarity",
      metrics: [
        { id: "meditation", label: "Days/week using meditation/breathwork/prayer", value: 4, max: 7, step: 1 },
        { id: "visualization", label: "Days/week of visualization/vision board/affirmations", value: 3, max: 7, step: 1 },
        { id: "journaling", label: "Days/week of journaling/writing goals/gratitude", value: 5, max: 7, step: 1 }
      ],
      score: 0
    }
  ]);

  const loadPreviousScore = useCallback(async () => {
    if (!user) return;
    try {
      const latestScore = await alphaScoreService.getLatestScore(user.id);
      if (latestScore) {
        setPreviousScore(latestScore);
      }
    } catch (error) {
      console.error('Error loading previous score:', error);
      toast({
        title: "Error loading previous score",
        description: "Unable to load your previous alpha score.",
        variant: "destructive"
      });
    }
  }, [user, toast]);

  const calculateCategoryScores = useCallback(() => {
    setCategories(prevCategories => prevCategories.map(category => {
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
    }));
  }, []);

  useEffect(() => {
    if (user) {
      loadPreviousScore().finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [user, loadPreviousScore]);

  const handleMetricChange = (categoryId: string, metricId: string, value: string) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) return;

    setCategories(prevCategories => {
      const updatedCategories = prevCategories.map(category => {
        if (category.id === categoryId) {
          const updatedMetrics = category.metrics.map(metric => {
            if (metric.id === metricId) {
              return { ...metric, value: numericValue };
            }
            return metric;
          });
          
          return { ...category, metrics: updatedMetrics };
        }
        return category;
      });
      
      return updatedCategories;
    });
    
    // Calculate scores after metric changes
    calculateCategoryScores();
  };

  const calculateTotalScore = () => {
    const sum = categories.reduce((total, category) => total + category.score, 0);
    return Math.round(sum / categories.length);
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your alpha score.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSaving(true);
      const totalScore = calculateTotalScore();
      const { quarter, year } = await alphaScoreService.getCurrentQuarter();
      
      const scoreData = {
        totalScore,
        quarter,  // Already a number
        year,
        sprintId,
        categories: categories.map(c => ({
          category: c.id,
          score: c.score,
          metrics: c.metrics
        }))
      };
      
      await alphaScoreService.saveAlphaScore(user.id, scoreData);
      
      toast({
        title: "Alpha score saved",
        description: `Your alpha score for Q${quarter} ${year} has been recorded.`
      });

      onComplete?.();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving alpha score:', error);
      toast({
        title: "Error saving alpha score",
        description: "Unable to save your alpha score. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getScoreChange = (categoryId: string) => {
    if (!previousScore?.alpha_score_categories) return null;
    
    const prevCategory = previousScore.alpha_score_categories.find(
      (c) => c.category === categoryId
    );
    const currentCategory = categories.find(c => c.id === categoryId);
    
    if (!prevCategory || !currentCategory) return null;
    
    return {
      change: currentCategory.score - prevCategory.score,
      previous: prevCategory.score
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Your Alpha Score</DialogTitle>
          <DialogDescription>
            Record your life performance metrics for this quarter.
            This helps track your overall progress quarter by quarter.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary">{calculateTotalScore()}</div>
              <div className="text-sm text-muted-foreground">Overall Alpha Score</div>
              {previousScore && (
                <div className="mt-2 flex items-center justify-center text-sm">
                  <span className="text-muted-foreground mr-2">Previous: {previousScore.total_score}</span>
                  {calculateTotalScore() > previousScore.total_score ? (
                    <span className="text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +{calculateTotalScore() - previousScore.total_score}
                    </span>
                  ) : calculateTotalScore() < previousScore.total_score ? (
                    <span className="text-red-500 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      {calculateTotalScore() - previousScore.total_score}
                    </span>
                  ) : null}
                </div>
              )}
            </div>
            
            <div className="space-y-8">
              {categories.map((category) => {
                const scoreChange = getScoreChange(category.id);
                return (
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
                        {scoreChange && (
                          <div className={`flex items-center text-xs ${
                            scoreChange.change > 0 ? 'text-green-500' : 
                            scoreChange.change < 0 ? 'text-red-500' : 
                            'text-muted-foreground'
                          }`}>
                            {scoreChange.change > 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : scoreChange.change < 0 ? (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            ) : null}
                            {scoreChange.change > 0 ? '+' : ''}{scoreChange.change}
                          </div>
                        )}
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
                              min={0}
                              max={metric.max}
                              step={metric.step || 1}
                              value={metric.value}
                              onChange={(e) => handleMetricChange(category.id, metric.id, e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading || isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              'Save Alpha Score'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
