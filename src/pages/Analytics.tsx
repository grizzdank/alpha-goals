
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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
  const [activeTab, setActiveTab] = useState("progress");

  return (
    <Layout title="Analytics">
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
    </Layout>
  );
};

export default Analytics;
