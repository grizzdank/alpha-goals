
import React, { useState, useEffect } from "react";
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
import {
  AlphaScoreAnalytics
} from "@/components/analytics/AlphaScoreAnalytics";
import { useLocation } from "react-router-dom";

const Analytics = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("progress");

  // Check if there's a tab specified in the location state
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  return (
    <Layout title="Analytics">
      <div className="max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="habits">Habits</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="alpha">Alpha Score</TabsTrigger>
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
            <TabsContent value="alpha" className="mt-4">
              <AlphaScoreAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
