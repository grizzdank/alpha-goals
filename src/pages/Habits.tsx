
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HabitForm } from "@/components/sprint/HabitForm";
import { HabitsList } from "@/components/habits/HabitsList";
import { HabitLimitDialog } from "@/components/habits/HabitLimitDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Habits = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [limitDialogOpen, setLimitDialogOpen] = useState(false);

  // Set active tab based on URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam === "new") {
      setActiveTab("new");
    }
  }, [location.search]);

  // Show the habit limit dialog when the page loads for first-time visitors
  // In a real app, this would check localStorage or user preferences
  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("hasSeenHabitLimitDialog");
    if (!hasSeenDialog) {
      setLimitDialogOpen(true);
      localStorage.setItem("hasSeenHabitLimitDialog", "true");
    }
  }, []);

  return (
    <Layout title="Habits" subtitle="Manage your habits to stay focused on what matters">
      <div className="max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="all">All Habits</TabsTrigger>
              <TabsTrigger value="new">New Habit</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <HabitsList />
            </TabsContent>
            <TabsContent value="new" className="mt-4">
              <HabitForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <HabitLimitDialog open={limitDialogOpen} onOpenChange={setLimitDialogOpen} />
    </Layout>
  );
};

export default Habits;
