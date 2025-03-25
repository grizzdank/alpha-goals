
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DailyHabitCard } from "@/components/dashboard/DailyHabitCard";
import { AlphaScoreCard } from "@/components/dashboard/AlphaScoreCard";
import { MissionCard } from "@/components/dashboard/MissionCard";
import { FinancialCard } from "@/components/dashboard/FinancialCard";
import { calculateAnimationDelay } from "@/utils/animations";
import { Calendar, CheckCircle, ClipboardCheck, Target } from "lucide-react";
import { WeeklyReview } from "@/components/review/WeeklyReview";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showWeeklyReview, setShowWeeklyReview] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Alpha score data
  const alphaScoreData = {
    totalScore: 76,
    categoryScores: [
      { category: "relationships" as const, score: 82, label: "Relationships" },
      { category: "purpose" as const, score: 75, label: "Purpose" },
      { category: "body" as const, score: 68, label: "Body" },
      { category: "mind" as const, score: 79, label: "Mind" },
    ],
  };

  // Upcoming activities
  const upcomingActivities = [
    {
      id: 1,
      title: "Weekly Review",
      description: "Review your goals and reflect on progress",
      date: "Today, 4:00 PM",
      icon: CheckCircle,
      color: "bg-purpose/10 text-purpose",
      action: () => setShowWeeklyReview(true),
    },
    {
      id: 2,
      title: "Sprint Planning",
      description: "Plan your next 90-day sprint objectives",
      date: "Tomorrow, 10:00 AM",
      icon: Target,
      color: "bg-relationships/10 text-relationships",
    },
    {
      id: 3,
      title: "Monthly Challenge",
      description: "Begin your meditation challenge",
      date: "Starts in 2 days",
      icon: Calendar,
      color: "bg-mind/10 text-mind",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin-slow"></div>
          <p className="mt-4 text-lg font-medium text-foreground animate-pulse">
            Loading your mission...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout title="Dashboard" subtitle="Welcome back! Ready to align your mission with action?">
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Dashboard Grid - Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DailyHabitCard 
            className="lg:col-span-3 animate-fade-in"
            style={{ animationDelay: calculateAnimationDelay(0) }}
          />
          
          <AlphaScoreCard 
            className="lg:col-span-2 animate-fade-in"
            style={{ animationDelay: calculateAnimationDelay(1) }}
            totalScore={alphaScoreData.totalScore}
            categoryScores={alphaScoreData.categoryScores}
          />
          
          <div className="flex flex-col space-y-6">
            <MissionCard 
              className="flex-1 animate-fade-in"
              style={{ animationDelay: calculateAnimationDelay(2) }}
            />
            
            <FinancialCard 
              className="flex-1 animate-fade-in"
              style={{ animationDelay: calculateAnimationDelay(3) }}
            />
          </div>
        </div>
        
        {/* Weekly Review Card */}
        <div 
          className="glass rounded-2xl p-6 mb-8 animate-fade-in" 
          style={{ animationDelay: calculateAnimationDelay(4) }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purpose/10 text-purpose">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Weekly Review & Planning</h2>
                <p className="text-sm text-muted-foreground">Reflect on your progress and plan for the week ahead</p>
              </div>
            </div>
            <Button onClick={() => setShowWeeklyReview(true)}>
              Start Weekly Review
            </Button>
          </div>
          
          <div className="bg-card/50 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Benefits of Weekly Reviews:</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span>Identify what's working & what's not</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span>Celebrate your wins to build momentum</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                <span>Adjust your strategies & tactics</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Upcoming Activities */}
        <div 
          className="glass rounded-2xl p-6 animate-fade-in" 
          style={{ animationDelay: calculateAnimationDelay(5) }}
        >
          <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingActivities.map((activity, index) => (
              <div 
                key={activity.id}
                className="bg-white/40 rounded-xl p-4 border border-white/30 hover-lift animate-fade-in cursor-pointer"
                style={{ animationDelay: calculateAnimationDelay(index + 6, 50) }}
                onClick={activity.action}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${activity.color} mr-3`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs font-medium text-primary mt-2">
                      {activity.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Weekly Review Dialog */}
        <WeeklyReview 
          open={showWeeklyReview}
          onOpenChange={setShowWeeklyReview}
        />
      </div>
    </Layout>
  );
};

export default Index;
