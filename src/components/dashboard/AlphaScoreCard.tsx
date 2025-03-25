
import React from 'react';
import { cn } from '@/lib/utils';
import { ProgressCircle } from '../ui/ProgressCircle';
import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryScore {
  category: 'relationships' | 'purpose' | 'body' | 'mind';
  score: number;
  label: string;
}

interface AlphaScoreCardProps {
  totalScore: number;
  categoryScores: CategoryScore[];
  className?: string;
  style?: React.CSSProperties;
}

export function AlphaScoreCard({ totalScore, categoryScores, className, style }: AlphaScoreCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/analytics', { state: { tab: 'alpha' } });
  };

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
          <p className="text-sm text-muted-foreground">Overall life performance</p>
        </div>
        <div className="flex items-center text-primary">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">+4.2% from last week</span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <ProgressCircle 
          percentage={totalScore} 
          value={totalScore}
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
