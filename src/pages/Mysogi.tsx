
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, FolderClock, Award, PlusCircle, Dumbbell, Brain, Heart, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateAnimationDelay } from "@/utils/animations";

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
  
  const monthlyCategories = [
    { id: "body", name: "Body", icon: Dumbbell, color: "bg-body/10 text-body" },
    { id: "mind", name: "Mind", icon: Brain, color: "bg-mind/10 text-mind" },
    { id: "relationships", name: "Relationships", icon: Heart, color: "bg-relationships/10 text-relationships" },
    { id: "purpose", name: "Purpose", icon: Target, color: "bg-purpose/10 text-purpose" },
  ];
  
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "upcoming":
        return <Badge className="bg-amber-500">Upcoming</Badge>;
      default:
        return null;
    }
  };
  
  const getCategoryIcon = (categoryId: string) => {
    const category = monthlyCategories.find(cat => cat.id === categoryId);
    if (!category) return Target;
    return category.icon;
  };
  
  const getCategoryColor = (categoryId: string) => {
    const category = monthlyCategories.find(cat => cat.id === categoryId);
    if (!category) return "bg-gray-100 text-gray-500";
    return category.color;
  };
  
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
            <div className="glass rounded-xl md:rounded-2xl p-6 mb-6 animate-fade-in" style={{ animationDelay: calculateAnimationDelay(0) }}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-6 w-6 text-amber-500" />
                    <h2 className="text-xl font-bold">{annualChallenge.title}</h2>
                  </div>
                  <p className="text-muted-foreground">{annualChallenge.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {annualChallenge.domains.map((domain) => (
                      <Badge key={domain} variant="outline" className={getCategoryColor(domain)}>
                        {domain.charAt(0).toUpperCase() + domain.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-center lg:items-end">
                  <div className="text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {annualChallenge.startDate} - {annualChallenge.endDate}
                  </div>
                  <div className="w-full max-w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${annualChallenge.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium mt-1">{annualChallenge.progress}% Complete</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {annualChallenge.milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${milestone.completed ? 'bg-primary/10 border-primary/20' : 'bg-card/50 border-border/50'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{milestone.title}</span>
                      {milestone.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button className="mb-6">Update Annual Challenge Progress</Button>
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Monthly Challenges</h2>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Challenge
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthlyChallenges.map((challenge, index) => {
                const CategoryIcon = getCategoryIcon(challenge.category);
                
                return (
                  <Card 
                    key={challenge.id} 
                    className="animate-fade-in hover-lift cursor-pointer"
                    style={{ animationDelay: calculateAnimationDelay(index, 50) }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-lg ${getCategoryColor(challenge.category)}`}>
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        {getStatusBadge(challenge.status)}
                      </div>
                      <CardTitle className="mt-2">{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {challenge.startDate} - {challenge.endDate}
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium mt-1">{challenge.progress}% Complete</div>
                    </CardContent>
                    <CardFooter>
                      {challenge.status === "active" && (
                        <Button variant="outline" className="w-full">Update Progress</Button>
                      )}
                      {challenge.status === "upcoming" && (
                        <Button variant="outline" className="w-full">Start Early</Button>
                      )}
                      {challenge.status === "completed" && (
                        <Button variant="outline" className="w-full">View Details</Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
              
              {/* Add Challenge Card */}
              <Card className="border-dashed border-2 flex items-center justify-center h-[300px] animate-fade-in cursor-pointer hover:bg-accent/50 transition-colors group" style={{ animationDelay: calculateAnimationDelay(monthlyChallenges.length, 50) }}>
                <div className="flex flex-col items-center text-muted-foreground group-hover:text-foreground">
                  <PlusCircle className="h-10 w-10 mb-2 group-hover:text-primary transition-colors" />
                  <p className="font-medium">Create New Challenge</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Mysogi;
