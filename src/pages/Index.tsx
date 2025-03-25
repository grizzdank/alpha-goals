import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { DailyHabitCard } from "@/components/dashboard/DailyHabitCard";
import { AlphaScoreCard } from "@/components/dashboard/AlphaScoreCard";
import { MissionCard } from "@/components/dashboard/MissionCard";
import { FinancialCard } from "@/components/dashboard/FinancialCard";
import { calculateAnimationDelay } from "@/utils/animations";
import { Calendar, CheckCircle, Menu, Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

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

  // Sample daily habit data
  const dailyHabitData = {
    id: 1,
    title: "20-minute meditation",
    description: "Mindfulness practice every morning to start the day centered",
    streak: 5,
    days: [
      { date: "2023-07-01", completed: true },
      { date: "2023-07-02", completed: true },
      { date: "2023-07-03", completed: true },
      { date: "2023-07-04", completed: true },
      { date: "2023-07-05", completed: true },
      { date: new Date().toISOString().split('T')[0], completed: false }
    ]
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
    <div className="flex min-h-screen flex-col">
      {isMobile ? (
        <>
          <Navbar subtitle="Welcome back! Ready to align your mission with action?">
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
              {/* Dashboard Grid - Mobile */}
              <div className="space-y-6 mb-6">
                <DailyHabitCard 
                  className="animate-fade-in"
                  style={{ animationDelay: calculateAnimationDelay(0) }}
                  currentHabit={dailyHabitData}
                />
                
                <AlphaScoreCard 
                  className="animate-fade-in"
                  style={{ animationDelay: calculateAnimationDelay(1) }}
                  totalScore={alphaScoreData.totalScore}
                  categoryScores={alphaScoreData.categoryScores}
                />
                
                <MissionCard 
                  className="animate-fade-in"
                  style={{ animationDelay: calculateAnimationDelay(2) }}
                />
                
                <FinancialCard 
                  className="animate-fade-in"
                  style={{ animationDelay: calculateAnimationDelay(3) }}
                />
              </div>
              
              {/* Upcoming Activities */}
              <div 
                className="glass rounded-2xl p-4 animate-fade-in" 
                style={{ animationDelay: calculateAnimationDelay(4) }}
              >
                <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {upcomingActivities.map((activity, index) => (
                    <div 
                      key={activity.id}
                      className="bg-white/40 rounded-xl p-4 border border-white/30 hover-lift animate-fade-in"
                      style={{ animationDelay: calculateAnimationDelay(index + 5, 50) }}
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
        </>
      ) : (
        <div className="flex flex-row">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <Navbar subtitle="Welcome back! Ready to align your mission with action?" />
            
            <main className="flex-1 px-6 py-8">
              <div 
                className="max-w-7xl mx-auto animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                {/* Dashboard Grid - Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <DailyHabitCard 
                    className="lg:col-span-3 animate-fade-in"
                    style={{ animationDelay: calculateAnimationDelay(0) }}
                    currentHabit={dailyHabitData}
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
                
                {/* Upcoming Activities */}
                <div 
                  className="glass rounded-2xl p-6 animate-fade-in" 
                  style={{ animationDelay: calculateAnimationDelay(4) }}
                >
                  <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {upcomingActivities.map((activity, index) => (
                      <div 
                        key={activity.id}
                        className="bg-white/40 rounded-xl p-4 border border-white/30 hover-lift animate-fade-in"
                        style={{ animationDelay: calculateAnimationDelay(index + 5, 50) }}
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
      )}
    </div>
  );
};

export default Index;
