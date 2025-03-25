
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FolderClock } from "lucide-react";
import { AnnualChallenge } from "@/components/mysogi/AnnualChallenge";
import { MonthlyChallenges } from "@/components/mysogi/MonthlyChallenges";
import { getCategoryIcon, getCategoryColor, getStatusBadge } from "@/components/mysogi/categoryUtils";

const Mysogi = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("annual");
  
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  
  // Sample data for challenges
  const annualChallenge = {
    title: "Year of Discipline",
    description: "Master your daily habits and build unbreakable discipline across all domains of life",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    progress: 68,
    domains: ["body", "mind", "relationships", "purpose"],
    milestones: [
      { title: "Q1: Foundation", completed: true },
      { title: "Q2: Consistency", completed: true },
      { title: "Q3: Intensity", completed: false },
      { title: "Q4: Mastery", completed: false },
    ]
  };
  
  const monthlyChallenges = [
    {
      id: 1,
      title: "Daily Meditation",
      description: "Practice meditation for at least 10 minutes every day",
      category: "mind",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
      progress: 85,
      status: "active"
    },
    {
      id: 2,
      title: "Cold Shower Challenge",
      description: "Take a cold shower every morning for 30 days",
      category: "body",
      startDate: "2023-08-01", 
      endDate: "2023-08-31",
      progress: 0,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Family Call Initiative",
      description: "Call one family member each day for a month",
      category: "relationships",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      progress: 100,
      status: "completed"
    },
    {
      id: 4,
      title: "Side Project Sprint",
      description: "Work on your side project for at least 30 minutes daily",
      category: "purpose",
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      progress: 0,
      status: "upcoming"
    },
  ];
  
  return (
    <Layout title="Mysogi Challenges" subtitle="Push your limits with focused challenges">
      <div className="max-w-7xl mx-auto animate-fade-in">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="annual">Annual Challenge</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Challenges</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <FolderClock className="h-4 w-4" />
                Challenge Archive
              </Button>
            </div>
          </div>

          <TabsContent value="annual" className="mt-0">
            <AnnualChallenge 
              challenge={annualChallenge} 
              getCategoryColor={getCategoryColor} 
            />
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <MonthlyChallenges 
              challenges={monthlyChallenges}
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Mysogi;
