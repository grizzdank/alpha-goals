
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FinancialCardProps {
  className?: string;
  style?: React.CSSProperties;
  monthlyFreedomNumber?: number;
  annualFreedomNumber?: number;
  currentSavings?: number;
}

export function FinancialCard({
  className,
  style,
  monthlyFreedomNumber = 6500,
  annualFreedomNumber = 78000,
  currentSavings = 125000,
}: FinancialCardProps) {
  // Calculate percentage of annual freedom number achieved
  const percentToGoal = Math.min(100, Math.round((currentSavings / annualFreedomNumber) * 100));
  
  return (
    <div className={cn("glass rounded-2xl p-6 hover-lift", className)} style={style}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Financial Freedom</h3>
          <p className="text-sm text-muted-foreground">Your path to independence</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-purpose/10 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-purpose" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/40 rounded-xl p-4 border border-white/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Monthly Freedom Number</h4>
          <p className="text-2xl font-semibold">${monthlyFreedomNumber.toLocaleString()}</p>
        </div>
        
        <div className="bg-white/40 rounded-xl p-4 border border-white/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Annual Freedom Number</h4>
          <p className="text-2xl font-semibold">${annualFreedomNumber.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h4 className="text-sm font-medium">Progress to Freedom Goal</h4>
          <span className="text-sm font-medium">{percentToGoal}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className="bg-purpose h-2.5 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentToGoal}%` }}
          />
        </div>
      </div>
      
      <div>
        <Link to="/financial" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors card-link">
          View financial details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
