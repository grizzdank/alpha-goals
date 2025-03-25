
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseForm } from "@/components/financial/ExpenseForm";
import { FreedomCalculator } from "@/components/financial/FreedomCalculator";
import { SavingsTracker } from "@/components/financial/SavingsTracker";

const Financial = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("calculator");
  const [monthlyExpenses, setMonthlyExpenses] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [currentSavings, setCurrentSavings] = useState<number>(125000);

  // Calculate the 6-month average expense
  const averageExpense = monthlyExpenses.reduce((sum, expense) => sum + expense, 0) / 6;
  
  // Calculate monthly freedom number (1.1 times the 6-month average)
  const monthlyFreedomNumber = averageExpense * 1.1;
  
  // Calculate annual freedom number (12 times the monthly freedom number)
  const annualFreedomNumber = monthlyFreedomNumber * 12;

  return (
    <Layout title="Financial Freedom">
      <div className="max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6">
          <p className="text-muted-foreground mb-8">
            Calculate your financial freedom numbers and track your progress towards financial independence.
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? "" : "max-w-md"} grid-cols-2`}>
              <TabsTrigger value="calculator">Freedom Calculator</TabsTrigger>
              <TabsTrigger value="tracker">Savings Tracker</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ExpenseForm 
                  monthlyExpenses={monthlyExpenses}
                  setMonthlyExpenses={setMonthlyExpenses}
                />
                <FreedomCalculator 
                  monthlyFreedomNumber={monthlyFreedomNumber}
                  annualFreedomNumber={annualFreedomNumber}
                  averageExpense={averageExpense}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="tracker" className="mt-6">
              <SavingsTracker 
                currentSavings={currentSavings}
                setCurrentSavings={setCurrentSavings}
                annualFreedomNumber={annualFreedomNumber}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Financial;
