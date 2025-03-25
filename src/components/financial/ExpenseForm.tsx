
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpenseFormProps {
  monthlyExpenses: number[];
  setMonthlyExpenses: React.Dispatch<React.SetStateAction<number[]>>;
}

export function ExpenseForm({ monthlyExpenses, setMonthlyExpenses }: ExpenseFormProps) {
  const handleExpenseChange = (index: number, value: string) => {
    // Convert to number, default to 0 if not a valid number
    const expenseValue = value ? parseFloat(value) : 0;
    
    const newExpenses = [...monthlyExpenses];
    newExpenses[index] = expenseValue;
    setMonthlyExpenses(newExpenses);
  };

  const resetExpenses = () => {
    setMonthlyExpenses([0, 0, 0, 0, 0, 0]);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Coins className="h-5 w-5 text-purpose" /> Monthly Expenses
        </CardTitle>
        <CardDescription>
          Enter your last 6 months of expenses excluding large non-recurring expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground flex items-start gap-2 mb-4 p-3 bg-muted/50 rounded-md">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>Enter your regular monthly expenses. Exclude large one-time purchases or irregular expenses.</span>
        </div>
        
        <div className="space-y-4">
          {monthlyExpenses.map((expense, index) => (
            <div key={index} className="grid grid-cols-1 gap-2">
              <Label htmlFor={`month-${index + 1}`}>Month {index + 1}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  id={`month-${index + 1}`}
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={expense || ''}
                  onChange={(e) => handleExpenseChange(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={resetExpenses}
          >
            Reset All Expenses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
