
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
import { 
  ProgressOverview 
} from "@/components/analytics/ProgressOverview";
import { 
  HabitPerformance 
} from "@/components/analytics/HabitPerformance";
import { 
  DomainBreakdown 
} from "@/components/analytics/DomainBreakdown";

const Analytics = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("progress");

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile ? (
        <>
          <Navbar subtitle="Track your progress and visualize your journey">
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
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="habits">Habits</TabsTrigger>
                    <TabsTrigger value="domains">Domains</TabsTrigger>
                  </TabsList>
                  <TabsContent value="progress" className="mt-4">
                    <ProgressOverview />
                  </TabsContent>
                  <TabsContent value="habits" className="mt-4">
                    <HabitPerformance />
                  </TabsContent>
                  <TabsContent value="domains" className="mt-4">
                    <DomainBreakdown />
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
            <Navbar subtitle="Track your progress and visualize your journey" />
            
            <main className="flex-1 px-6 py-8">
              <div className="max-w-7xl mx-auto animate-fade-in">
                <div className="mb-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-md">
                      <TabsTrigger value="progress">Progress</TabsTrigger>
                      <TabsTrigger value="habits">Habits</TabsTrigger>
                      <TabsTrigger value="domains">Domains</TabsTrigger>
                    </TabsList>
                    <TabsContent value="progress" className="mt-4">
                      <ProgressOverview />
                    </TabsContent>
                    <TabsContent value="habits" className="mt-4">
                      <HabitPerformance />
                    </TabsContent>
                    <TabsContent value="domains" className="mt-4">
                      <DomainBreakdown />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
