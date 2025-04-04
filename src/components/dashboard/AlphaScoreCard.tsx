import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ProgressCircle } from '../ui/ProgressCircle';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { alphaScoreService, type AlphaScore } from '@/services/alphaScoreService';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface CategoryScore {
  category: 'relationships' | 'purpose' | 'body' | 'mind';
  score: number;
  label: string;
}

interface AlphaScoreCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function AlphaScoreCard({ className, style }: AlphaScoreCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [latestScore, setLatestScore] = useState<AlphaScore | null>(null);
  const [scoreChange, setScoreChange] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      try {
        const [latest, changes] = await Promise.all([
          alphaScoreService.getLatestScore(user.id),
          alphaScoreService.getScoreChanges(user.id)
        ]);

        setLatestScore(latest);

        if (changes && changes.length >= 2) {
          const change = changes[0].total_score - changes[1].total_score;
          setScoreChange(change);
        }
      } catch (error) {
        console.error('Error loading alpha score data:', error);
        toast.error('Failed to load alpha score data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleClick = () => {
    navigate('/analytics', { state: { tab: 'alpha' } });
  };

  if (isLoading) {
    return (
      <div 
        className={cn("glass rounded-2xl p-6", className)} 
        style={style}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alpha Score</h3>
            <p className="text-sm text-muted-foreground">Overall life performance</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Loading alpha score data...</p>
        </div>
      </div>
    );
  }

  if (!latestScore || !latestScore.alpha_score_categories) {
    return (
      <div 
        className={cn("glass rounded-2xl p-6 hover-lift hover-scale cursor-pointer", className)} 
        style={style}
        onClick={handleClick}
        role="button"
        aria-label="Record Your First Alpha Score"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alpha Score</h3>
            <p className="text-sm text-muted-foreground">Overall life performance</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-32 space-y-2">
          <p className="text-muted-foreground">No alpha score recorded yet</p>
          <p className="text-sm text-primary">Click to record your first score</p>
        </div>
      </div>
    );
  }

  const categoryScores: CategoryScore[] = (latestScore?.alpha_score_categories || []).map(category => ({
    category: category.category as 'relationships' | 'purpose' | 'body' | 'mind',
    score: category.score,
    label: category.category.charAt(0).toUpperCase() + category.category.slice(1)
  }));

  return (
    <div 
      className={cn("glass rounded-2xl p-6 hover-lift hover-scale cursor-pointer", className)} 
      style={style}
      onClick={handleClick}
      role="button"
      aria-label="View Alpha Score Details"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alpha Score</h3>
          <p className="text-sm text-muted-foreground">
            {latestScore ? `${latestScore.quarter} ${latestScore.year}` : 'Overall life performance'}
          </p>
        </div>
        {scoreChange !== null && (
          <div className={cn(
            "flex items-center",
            scoreChange > 0 ? "text-green-500" : scoreChange < 0 ? "text-red-500" : "text-primary"
          )}>
            {scoreChange > 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">
              {scoreChange > 0 ? '+' : ''}{scoreChange.toFixed(1)}% from last quarter
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mb-8">
        <ProgressCircle 
          percentage={latestScore.total_score} 
          value={latestScore.total_score}
          size="lg"
          label="Overall Alpha Score"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categoryScores.map((category) => (
          <div key={category.category} className="flex flex-col items-center animate-fade-in">
            <ProgressCircle 
              percentage={category.score}
              size="sm"
              value={category.score}
              color={category.category}
              lightColor={`${category.category}-light`}
              label={category.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
