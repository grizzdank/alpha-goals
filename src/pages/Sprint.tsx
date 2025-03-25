
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Plus, Edit, ListChecks } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { HabitForm } from "@/components/sprint/HabitForm";
import { CurrentSprint } from "@/components/mission/CurrentSprint";
import { SprintEdit } from "@/components/sprint/SprintEdit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Sprint = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen flex-col">
      {isMobile ? (
        <>
          <Navbar subtitle="Configure your habits and align them with your mission">
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
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Sprint Overview</TabsTrigger>
                    <TabsTrigger value="edit">Edit Sprint</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <div className="mb-3 flex justify-between items-center">
                      <Link to="/habits" className="flex items-center gap-1.5 text-primary hover:underline">
                        <ListChecks className="h-4 w-4" />
                        <span className="font-medium">Manage All Habits</span>
                      </Link>
                      <Badge variant="secondary" className="bg-muted/50">
                        Current Sprint
                      </Badge>
                    </div>
                    <CurrentSprint />
                    <HabitForm />
                  </TabsContent>
                  <TabsContent value="edit" className="mt-4">
                    <SprintEdit />
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
            <Navbar subtitle="Configure your habits and align them with your mission" />
            
            <main className="flex-1 px-6 py-8">
              <div className="max-w-7xl mx-auto animate-fade-in">
                <div className="mb-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-md">
                      <TabsTrigger value="overview">Sprint Overview</TabsTrigger>
                      <TabsTrigger value="edit">Edit Sprint</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <div className="mb-3 flex justify-between items-center">
                        <Link to="/habits" className="flex items-center gap-1.5 text-primary hover:underline">
                          <ListChecks className="h-4 w-4" />
                          <span className="font-medium">Manage All Habits</span>
                        </Link>
                        <Badge variant="secondary" className="bg-muted/50">
                          Current Sprint
                        </Badge>
                      </div>
                      <CurrentSprint />
                      <HabitForm />
                    </TabsContent>
                    <TabsContent value="edit" className="mt-4">
                      <SprintEdit />
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

export default Sprint;
