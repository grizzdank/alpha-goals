
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FolderClock } from "lucide-react";
import { AnnualChallenge } from "@/components/mysogi/AnnualChallenge";
import { MonthlyChallenges, Challenge } from "@/components/mysogi/MonthlyChallenges";
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
  const [annualChallenge, setAnnualChallenge] = useState({
    title: "Year of Discipline",
    description: "Master your daily habits and build unbreakable discipline across all domains of life",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    progress: 68,
    domains: ["body", "mind", "relationships", "purpose"],
    vision: "Transform my mind and body through consistent daily actions, deepen my relationships, and make significant progress on my life's purpose.",
    purpose: "I want to develop the self-discipline that will serve as the foundation for all future growth and achievements in my life.",
    prepSteps: [
      "Create a detailed tracking system for all my habits",
      "Set up accountability partnerships for each domain",
      "Schedule quarterly reviews to assess progress"
    ],
    milestones: [
      { title: "Q1: Foundation", completed: true },
      { title: "Q2: Consistency", completed: true },
      { title: "Q3: Intensity", completed: false },
      { title: "Q4: Mastery", completed: false },
    ]
  });
  
  const [monthlyChallenges, setMonthlyChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Daily Meditation",
      description: "Practice meditation for at least 10 minutes every day",
      category: "mind",
      startDate: "2023-07-01",
      endDate: "2023-07-31",
      progress: 85,
      status: "active",
      successCriteria: "I will have completed 30 consecutive days of meditation and be able to focus for 20+ minutes"
    },
    {
      id: 2,
      title: "Cold Shower Challenge",
      description: "Take a cold shower every morning for 30 days",
      category: "body",
      startDate: "2023-08-01", 
      endDate: "2023-08-31",
      progress: 0,
      status: "upcoming",
      successCriteria: "I will have taken a cold shower every morning for 30 days straight and can stay in for 3+ minutes"
    },
    {
      id: 3,
      title: "Family Call Initiative",
      description: "Call one family member each day for a month",
      category: "relationships",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      progress: 100,
      status: "completed",
      successCriteria: "I will have spoken to each family member at least twice and deepened our relationships"
    },
    {
      id: 4,
      title: "Side Project Sprint",
      description: "Work on your side project for at least 30 minutes daily",
      category: "purpose",
      startDate: "2023-09-01",
      endDate: "2023-09-30",
      progress: 0,
      status: "upcoming",
      successCriteria: "I will have completed the MVP of my app and be ready for beta testing"
    },
  ]);
  
  return (
    <Layout title="Mysogi Challenges" subtitle="Push your limits with focused challenges">
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Header description */}
        <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-base md:text-lg text-primary-foreground/90">
            A Mysogi is an annual event or challenge so demanding that it defines your year. 
            This section helps you plan and prepare for this defining experience.
          </p>
        </div>

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
              setChallenge={setAnnualChallenge}
              getCategoryColor={getCategoryColor} 
            />
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <MonthlyChallenges 
              challenges={monthlyChallenges}
              setChallenges={setMonthlyChallenges}
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
