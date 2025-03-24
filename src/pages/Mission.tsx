
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Target, ArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Mission = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar title="Mission & Vision" subtitle="Define your purpose and align your actions" />
        
        <main className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            
            {/* Header Section */}
            <div className="glass rounded-2xl p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Your Mission Statement</h1>
                  <p className="text-muted-foreground max-w-2xl">
                    Your mission statement defines your purpose, values, and direction. 
                    It's the foundation that guides all your decisions and actions.
                  </p>
                </div>
                <div className="h-14 w-14 rounded-full bg-purpose/20 flex items-center justify-center">
                  <Target className="h-7 w-7 text-purpose" />
                </div>
              </div>
              
              <div className="bg-white/40 rounded-xl p-6 border border-white/30 mb-6">
                <h3 className="font-semibold mb-3">Ikigai Statement</h3>
                <p className="text-lg italic">
                  "Empowering individuals to align their personal purpose with action through innovative tools and methodologies."
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/40 rounded-xl p-5 border border-white/30">
                  <h3 className="font-medium mb-2">Core Values</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purpose mr-2"></div>
                      <span>Authenticity</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purpose mr-2"></div>
                      <span>Growth mindset</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purpose mr-2"></div>
                      <span>Impact-focused</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purpose mr-2"></div>
                      <span>Balance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/40 rounded-xl p-5 border border-white/30">
                  <h3 className="font-medium mb-2">Vision</h3>
                  <p className="text-muted-foreground">
                    To create a world where individuals are empowered to live 
                    purposefully and achieve their highest potential through
                    alignment of values, strengths, and actions.
                  </p>
                </div>
                
                <div className="bg-white/40 rounded-xl p-5 border border-white/30">
                  <h3 className="font-medium mb-2">Purpose</h3>
                  <p className="text-muted-foreground">
                    To provide innovative tools and methodologies that help people
                    discover their purpose and translate it into actionable steps
                    for a fulfilling life.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Current Sprint Section */}
            <div className="glass rounded-2xl p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Current Sprint</h2>
                  <p className="text-muted-foreground">
                    Your 90-day focus period to make meaningful progress on your mission
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-relationships/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-relationships" />
                </div>
              </div>
              
              <div className="bg-white/40 rounded-xl p-6 border border-white/30 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Q3 - Building digital presence</h3>
                  <div className="flex items-center text-primary">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-medium">18 days remaining</span>
                  </div>
                </div>
                
                <div className="w-full bg-white/50 rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  This sprint focuses on establishing and growing your online presence 
                  through content creation, community building, and digital tools.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/40 rounded-xl p-5 border border-white/30">
                  <h3 className="font-medium mb-3">Key Objectives</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded bg-purpose/20 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-3 w-3 rounded-sm bg-purpose"></div>
                      </div>
                      <div>
                        <p className="font-medium">Launch Mission Planner Pro platform</p>
                        <p className="text-sm text-muted-foreground">Create the foundation for digital growth</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded bg-purpose/20 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-3 w-3 rounded-sm bg-purpose"></div>
                      </div>
                      <div>
                        <p className="font-medium">Produce weekly content</p>
                        <p className="text-sm text-muted-foreground">Articles, videos, and social media posts</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded bg-purpose/20 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-3 w-3 rounded-sm bg-purpose"></div>
                      </div>
                      <div>
                        <p className="font-medium">Grow newsletter subscribers</p>
                        <p className="text-sm text-muted-foreground">Target: 500 subscribers by end of sprint</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/40 rounded-xl p-5 border border-white/30">
                  <h3 className="font-medium mb-3">Progress Updates</h3>
                  <div className="space-y-4">
                    <div className="border-b border-white/30 pb-3">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Mission Planner Pro platform</p>
                        <span className="text-xs font-medium bg-green-500/20 text-green-700 px-2 py-0.5 rounded-full">95% complete</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Final testing in progress, launch scheduled for next week</p>
                    </div>
                    
                    <div className="border-b border-white/30 pb-3">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Content production</p>
                        <span className="text-xs font-medium bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full">75% complete</span>
                      </div>
                      <p className="text-sm text-muted-foreground">9/12 planned pieces published, on track for completion</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Newsletter growth</p>
                        <span className="text-xs font-medium bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full">65% complete</span>
                      </div>
                      <p className="text-sm text-muted-foreground">325/500 subscribers, increased promotion needed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/sprints" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  View all sprints
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mission;
