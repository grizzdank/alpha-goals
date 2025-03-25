
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiggyBank, TrendingUp, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SavingsTrackerProps {
  currentSavings: number;
  setCurrentSavings: React.Dispatch<React.SetStateAction<number>>;
  annualFreedomNumber: number;
}

type IncomeSource = {
  name: string;
  amount: number;
  isPassive: boolean;
};

type InvestmentType = {
  name: string;
  value: number;
  expectedReturn: number;
};

export function SavingsTracker({
  currentSavings,
  setCurrentSavings,
  annualFreedomNumber,
}: SavingsTrackerProps) {
  const [activeIncomes, setActiveIncomes] = useState<IncomeSource[]>([
    { name: "Salary", amount: 5000, isPassive: false },
    { name: "Freelance", amount: 1000, isPassive: false },
  ]);
  
  const [passiveIncomes, setPassiveIncomes] = useState<IncomeSource[]>([
    { name: "Dividends", amount: 200, isPassive: true },
    { name: "Rental Income", amount: 800, isPassive: true },
  ]);
  
  const [investments, setInvestments] = useState<InvestmentType[]>([
    { name: "Index Funds", value: 70000, expectedReturn: 7 },
    { name: "Real Estate", value: 50000, expectedReturn: 5 },
    { name: "Bonds", value: 5000, expectedReturn: 3 },
  ]);

  // Calculate percentage of freedom number achieved
  const percentToGoal = annualFreedomNumber > 0 
    ? Math.min(100, Math.round((currentSavings / annualFreedomNumber) * 100)) 
    : 0;
  
  // Calculate annual return rate as weighted average of investments
  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const weightedAnnualReturn = investments.reduce(
    (sum, inv) => sum + (inv.value / totalInvestmentValue) * (inv.expectedReturn / 100), 
    0
  ) || 0.07; // Default to 7% if no investments
  
  // Calculate expected annual passive income from current savings
  const expectedAnnualIncome = currentSavings * weightedAnnualReturn;
  
  // Calculate total passive income (investments + other passive sources)
  const otherPassiveIncome = passiveIncomes.reduce((sum, inc) => sum + inc.amount, 0) * 12;
  const totalPassiveIncome = expectedAnnualIncome + otherPassiveIncome;
  
  // Calculate total active income
  const totalActiveIncome = activeIncomes.reduce((sum, inc) => sum + inc.amount, 0) * 12;
  
  // Calculate percentage of annual freedom number covered by passive income
  const incomePercentage = annualFreedomNumber > 0 
    ? Math.min(100, Math.round((totalPassiveIncome / annualFreedomNumber) * 100))
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

  // Form for adding new investment
  const investmentForm = useForm({
    defaultValues: {
      name: "",
      value: 0,
      expectedReturn: 7,
    },
  });

  const onSubmitInvestment = (data: InvestmentType) => {
    setInvestments([...investments, data]);
    setCurrentSavings(currentSavings + data.value);
    investmentForm.reset();
    toast.success("Investment added successfully");
  };

  // Form for adding new income source
  const incomeForm = useForm({
    defaultValues: {
      name: "",
      amount: 0,
      isPassive: false,
    },
  });

  const onSubmitIncome = (data: IncomeSource) => {
    if (data.isPassive) {
      setPassiveIncomes([...passiveIncomes, data]);
    } else {
      setActiveIncomes([...activeIncomes, data]);
    }
    incomeForm.reset();
    toast.success("Income source added successfully");
  };

  // Delete investment
  const handleDeleteInvestment = (index: number) => {
    const deletedValue = investments[index].value;
    const newInvestments = [...investments];
    newInvestments.splice(index, 1);
    setInvestments(newInvestments);
    setCurrentSavings(currentSavings - deletedValue);
    toast.success("Investment removed");
  };

  // Delete income source
  const handleDeleteIncome = (index: number, isPassive: boolean) => {
    if (isPassive) {
      const newPassiveIncomes = [...passiveIncomes];
      newPassiveIncomes.splice(index, 1);
      setPassiveIncomes(newPassiveIncomes);
    } else {
      const newActiveIncomes = [...activeIncomes];
      newActiveIncomes.splice(index, 1);
      setActiveIncomes(newActiveIncomes);
    }
    toast.success("Income source removed");
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
              <div className="text-2xl font-semibold mt-1">{formatCurrency(totalPassiveIncome)}</div>
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
      
      {/* Investments Section */}
      <Card className="shadow-md md:col-span-1">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purpose" /> Investments
          </CardTitle>
          <CardDescription>
            Manage your investment portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-background">
                <div>
                  <p className="font-medium">{investment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(investment.value)} • {investment.expectedReturn}% return
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => handleDeleteInvestment(index)}
                >
                  <span className="sr-only">Delete</span>
                  ×
                </Button>
              </div>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                >
                  <PiggyBank className="mr-2 h-4 w-4" />
                  Add Investment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new investment</DialogTitle>
                  <DialogDescription>
                    Add details about your investment below
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...investmentForm}>
                  <form onSubmit={investmentForm.handleSubmit(onSubmitInvestment)} className="space-y-4">
                    <FormField
                      control={investmentForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investment Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Index Fund, Real Estate" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={investmentForm.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Value ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={investmentForm.control}
                      name="expectedReturn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Annual Return (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            The expected annual percentage return on this investment
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Add Investment</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      
      {/* Income Sources Section */}
      <Card className="shadow-md md:col-span-1">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-purpose" /> Income Sources
          </CardTitle>
          <CardDescription>
            Track your active and passive income
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Active Income
              <span className="ml-auto font-normal text-muted-foreground">
                {formatCurrency(totalActiveIncome / 12)}/mo
              </span>
            </h3>
            {activeIncomes.map((income, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-background">
                <div>
                  <p className="font-medium">{income.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(income.amount)}/month
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => handleDeleteIncome(index, false)}
                >
                  <span className="sr-only">Delete</span>
                  ×
                </Button>
              </div>
            ))}
            
            <h3 className="text-sm font-semibold flex items-center gap-2 mt-6">
              <TrendingUp className="h-4 w-4" /> Passive Income
              <span className="ml-auto font-normal text-muted-foreground">
                {formatCurrency(otherPassiveIncome / 12)}/mo
              </span>
            </h3>
            {passiveIncomes.map((income, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-background">
                <div>
                  <p className="font-medium">{income.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(income.amount)}/month
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => handleDeleteIncome(index, true)}
                >
                  <span className="sr-only">Delete</span>
                  ×
                </Button>
              </div>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add Income Source
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new income source</DialogTitle>
                  <DialogDescription>
                    Add details about your income source below
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...incomeForm}>
                  <form onSubmit={incomeForm.handleSubmit(onSubmitIncome)} className="space-y-4">
                    <FormField
                      control={incomeForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Income Source Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Salary, Dividends" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={incomeForm.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Amount ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={incomeForm.control}
                      name="isPassive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Passive Income
                            </FormLabel>
                            <FormDescription>
                              Check if this income requires minimal or no ongoing work
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Add Income Source</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
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
            Of your freedom income is covered by your passive income sources
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
