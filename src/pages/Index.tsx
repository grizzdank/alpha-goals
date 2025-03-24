
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { AlphaScoreCard } from "@/components/dashboard/AlphaScoreCard";
import { MissionCard } from "@/components/dashboard/MissionCard";
import { FinancialCard } from "@/components/dashboard/FinancialCard";
import { calculateAnimationDelay } from "@/utils/animations";
import { Calendar, CheckCircle, Target } from "lucide-react";

const Index = () => {
  const [loading, setLoading] = useState(true);

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
      <div className="flex h-screen w-full items-center justify-center bg-background">
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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar subtitle="Welcome back! Ready to align your mission with action?" />
        
        <main className="flex-1 px-6 py-8">
          <div 
            className="max-w-7xl mx-auto animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <AlphaScoreCard 
                className="lg:col-span-2 animate-fade-in"
                style={{ animationDelay: calculateAnimationDelay(0) }}
                totalScore={alphaScoreData.totalScore}
                categoryScores={alphaScoreData.categoryScores}
              />
              
              <div className="flex flex-col space-y-6">
                <MissionCard 
                  className="flex-1 animate-fade-in"
                />
                
                <FinancialCard 
                  className="flex-1 animate-fade-in"
                />
              </div>
            </div>
            
            {/* Upcoming Activities */}
            <div 
              className="glass rounded-2xl p-6 animate-fade-in" 
              style={{ animationDelay: calculateAnimationDelay(3) }}
            >
              <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingActivities.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="bg-background/80 rounded-xl p-4 border border-border hover-lift animate-fade-in"
                    style={{ animationDelay: calculateAnimationDelay(index + 4, 50) }}
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
