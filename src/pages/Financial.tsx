
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseForm } from "@/components/financial/ExpenseForm";
import { FreedomCalculator } from "@/components/financial/FreedomCalculator";
import { SavingsTracker } from "@/components/financial/SavingsTracker";

const Financial = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("calculator");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [currentSavings, setCurrentSavings] = useState<number>(125000);

  // Calculate the 6-month average expense
  const averageExpense = monthlyExpenses.reduce((sum, expense) => sum + expense, 0) / 6;
  
  // Calculate monthly freedom number (1.1 times the 6-month average)
  const monthlyFreedomNumber = averageExpense * 1.1;
  
  // Calculate annual freedom number (12 times the monthly freedom number)
  const annualFreedomNumber = monthlyFreedomNumber * 12;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}
      
      <div className="flex flex-col flex-1">
        <Navbar subtitle="Calculate your financial freedom numbers and track your progress">
          {isMobile && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <button className="mr-2 p-2 rounded-md hover:bg-accent">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[80%] sm:max-w-xs">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
        </Navbar>
        
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Financial Freedom</h1>
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
        </main>
      </div>
    </div>
  );
};

export default Financial;
