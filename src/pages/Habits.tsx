
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Plus, Edit } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { HabitForm } from "@/components/sprint/HabitForm";
import { HabitsList } from "@/components/habits/HabitsList";
import { HabitLimitDialog } from "@/components/habits/HabitLimitDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Habits = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("all");
  const [limitDialogOpen, setLimitDialogOpen] = useState(false);

  // Show the habit limit dialog when the page loads for first-time visitors
  // In a real app, this would check localStorage or user preferences
  React.useEffect(() => {
    const hasSeenDialog = localStorage.getItem("hasSeenHabitLimitDialog");
    if (!hasSeenDialog) {
      setLimitDialogOpen(true);
      localStorage.setItem("hasSeenHabitLimitDialog", "true");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile ? (
        <>
          <Navbar subtitle="Manage your habits to stay focused on what matters">
            <Sheet>
              <SheetTrigger asChild>
                <button className="mr-2 p-2 rounded-md hover:bg-accent">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[80%] sm:max-w-xs">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </Navbar>
          
          <main className="flex-1 px-4 py-6">
            <div className="max-w-7xl mx-auto animate-fade-in">
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All Habits</TabsTrigger>
                    <TabsTrigger value="new">New Habit</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4">
                    <HabitsList />
                  </TabsContent>
                  <TabsContent value="new" className="mt-4">
                    <HabitForm />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </>
      ) : (
        <div className="flex flex-row">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <Navbar subtitle="Manage your habits to stay focused on what matters" />
            
            <main className="flex-1 px-6 py-8">
              <div className="max-w-7xl mx-auto animate-fade-in">
                <div className="mb-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-md">
                      <TabsTrigger value="all">All Habits</TabsTrigger>
                      <TabsTrigger value="new">New Habit</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                      <HabitsList />
                    </TabsContent>
                    <TabsContent value="new" className="mt-4">
                      <HabitForm />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
      
      <HabitLimitDialog open={limitDialogOpen} onOpenChange={setLimitDialogOpen} />
    </div>
  );
};

export default Habits;
