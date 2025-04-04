import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { financialService } from '@/services/financialService';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface FinancialCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export function FinancialCard({ className, style }: FinancialCardProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [financialData, setFinancialData] = useState<{
    monthlyFreedomNumber: number;
    annualFreedomNumber: number;
    currentSavings: number;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      try {
        const data = await financialService.getFinancialData(user.id);
        if (data) {
          setFinancialData({
            monthlyFreedomNumber: data.monthly_freedom_number,
            annualFreedomNumber: data.annual_freedom_number,
            currentSavings: data.current_savings
          });
        }
      } catch (error) {
        console.error('Error loading financial data:', error);
        toast.error('Failed to load financial data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className={cn("glass rounded-2xl p-6", className)} style={style}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Financial Freedom</h3>
            <p className="text-sm text-muted-foreground">Your path to independence</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-purple" />
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (!financialData) {
    return (
      <div className={cn("glass rounded-2xl p-6 hover-lift", className)} style={style}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Financial Freedom</h3>
            <p className="text-sm text-muted-foreground">Your path to independence</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-purple" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-32 space-y-2">
          <p className="text-muted-foreground">No financial data available</p>
          <Link 
            to="/financial" 
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Set up your financial goals
          </Link>
        </div>
      </div>
    );
  }

  const percentToGoal = Math.min(100, Math.round((financialData.currentSavings / financialData.annualFreedomNumber) * 100));
  
  return (
    <div className={cn("glass rounded-2xl p-6 hover-lift", className)} style={style}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Financial Freedom</h3>
          <p className="text-sm text-muted-foreground">Your path to independence</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-purple/10 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-purple" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/40 rounded-xl p-4 border border-white/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Monthly Freedom Number</h4>
          <p className="text-2xl font-semibold">${financialData.monthlyFreedomNumber.toLocaleString()}</p>
        </div>
        
        <div className="bg-white/40 rounded-xl p-4 border border-white/30">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Annual Freedom Number</h4>
          <p className="text-2xl font-semibold">${financialData.annualFreedomNumber.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h4 className="text-sm font-medium">Progress to Freedom Goal</h4>
          <span className="text-sm font-medium">{percentToGoal}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className="bg-purple h-2.5 rounded-full transition-all duration-1000 ease-out"
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
