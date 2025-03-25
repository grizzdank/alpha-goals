
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DollarSign, Calculator } from "lucide-react";

interface FreedomCalculatorProps {
  monthlyFreedomNumber: number;
  annualFreedomNumber: number;
  averageExpense: number;
}

export function FreedomCalculator({
  monthlyFreedomNumber,
  annualFreedomNumber,
  averageExpense,
}: FreedomCalculatorProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purpose" /> Freedom Numbers
        </CardTitle>
        <CardDescription>
          Your calculated financial freedom targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <Label className="text-sm text-muted-foreground">Average Monthly Expense</Label>
            <div className="text-2xl font-semibold mt-1">{formatCurrency(averageExpense)}</div>
            <div className="text-xs text-muted-foreground mt-1">Based on your last 6 months</div>
          </div>
          
          <div className="bg-purpose/10 p-4 rounded-lg">
            <Label className="text-sm text-purpose">Monthly Freedom Number</Label>
            <div className="text-2xl font-semibold mt-1">{formatCurrency(monthlyFreedomNumber)}</div>
            <div className="text-xs text-muted-foreground mt-1">1.1x your average monthly expense</div>
          </div>
          
          <div className="bg-purpose/20 p-4 rounded-lg">
            <Label className="text-sm text-purpose font-medium">Annual Freedom Number</Label>
            <div className="text-3xl font-bold mt-1">{formatCurrency(annualFreedomNumber)}</div>
            <div className="text-xs text-muted-foreground mt-1">12x your monthly freedom number</div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <p>Your freedom number represents the annual income you need to achieve financial independence.</p>
              <p className="mt-2">When your investments generate this amount passively, you've reached financial freedom.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
