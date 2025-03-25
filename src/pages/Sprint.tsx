
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { CurrentSprint } from "@/components/mission/CurrentSprint";
import { SprintEdit } from "@/components/sprint/SprintEdit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Sprint = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}
      
      <div className="flex flex-col flex-1">
        <Navbar subtitle="Configure your habits and align them with your mission">
          {isMobile && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <button className="mr-2 p-2 rounded-md hover:bg-accent">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[80%] sm:max-w-xs">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
        </Navbar>
        
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className={`grid w-full ${isMobile ? "" : "max-w-md"} grid-cols-2`}>
                  <TabsTrigger value="overview">Sprint Overview</TabsTrigger>
                  <TabsTrigger value="edit">Edit Sprint</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="mb-3 flex justify-end">
                    <Badge variant="secondary" className="bg-muted/50">
                      Current Sprint
                    </Badge>
                  </div>
                  <CurrentSprint />
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
  );
};

export default Sprint;
