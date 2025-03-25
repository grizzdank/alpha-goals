
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiggyBank, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SavingsTrackerProps {
  currentSavings: number;
  setCurrentSavings: React.Dispatch<React.SetStateAction<number>>;
  annualFreedomNumber: number;
}

export function SavingsTracker({
  currentSavings,
  setCurrentSavings,
  annualFreedomNumber,
}: SavingsTrackerProps) {
  // Calculate percentage of freedom number achieved
  const percentToGoal = annualFreedomNumber > 0 
    ? Math.min(100, Math.round((currentSavings / annualFreedomNumber) * 100)) 
    : 0;
  
  // Calculate years to freedom assuming 7% annual return
  const annualReturnRate = 0.07;
  
  // Calculate expected annual passive income from current savings
  const expectedAnnualIncome = currentSavings * annualReturnRate;
  
  // Calculate percentage of annual freedom number covered by passive income
  const incomePercentage = annualFreedomNumber > 0 
    ? Math.min(100, Math.round((expectedAnnualIncome / annualFreedomNumber) * 100))
    : 0;

  const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setCurrentSavings(value);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-md md:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-purpose" /> Savings Tracker
          </CardTitle>
          <CardDescription>
            Track your progress towards financial freedom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="current-savings">Current Investment Portfolio</Label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                id="current-savings"
                type="number"
                className="pl-8"
                value={currentSavings || ''}
                onChange={handleSavingsChange}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the total value of all your investment accounts
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progress to Goal</span>
                <span className="text-sm font-medium">{percentToGoal}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-purpose h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentToGoal}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Your savings are {percentToGoal}% of your annual freedom number ({formatCurrency(annualFreedomNumber)})
              </div>
            </div>
            
            <div className="bg-purpose/10 p-4 rounded-lg">
              <Label className="text-sm text-muted-foreground">Expected Annual Passive Income</Label>
              <div className="text-2xl font-semibold mt-1">{formatCurrency(expectedAnnualIncome)}</div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">Freedom Coverage</span>
                <span className="text-xs font-medium">{incomePercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                <div 
                  className="bg-purpose h-1.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${incomePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purpose" /> Freedom Target
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(annualFreedomNumber)}</div>
          <p className="text-sm text-muted-foreground mt-2">
            Annual income needed to achieve financial freedom
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purpose" /> Current Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{incomePercentage}%</div>
          <p className="text-sm text-muted-foreground mt-2">
            Of your freedom income is covered by your current investments
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
