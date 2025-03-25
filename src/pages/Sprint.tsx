
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Archive, Pencil } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { CurrentSprint } from "@/components/mission/CurrentSprint";
import { SprintEdit } from "@/components/sprint/SprintEdit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Sprint = () => {
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}
      
      <div className="flex flex-col flex-1">
        <Navbar subtitle="Configure your sprints and align them with your mission">
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
            <Tabs defaultValue="current" className="w-full">
              <div className="mb-6 flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="current">Current Sprint</TabsTrigger>
                  <TabsTrigger value="next">Next Sprint</TabsTrigger>
                </TabsList>
                <Link to="/sprints/archive">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Archive className="h-4 w-4" />
                    Sprint Archive
                  </Button>
                </Link>
              </div>

              <TabsContent value="current" className="mt-0">
                {isEditing ? (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Edit Current Sprint</h2>
                      <Button variant="outline" onClick={toggleEdit}>
                        Cancel
                      </Button>
                    </div>
                    <SprintEdit onComplete={toggleEdit} />
                  </div>
                ) : (
                  <div>
                    <CurrentSprint onEdit={toggleEdit} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="next" className="mt-0">
                <div className="glass rounded-xl md:rounded-2xl p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Next Sprint Planning</h2>
                  <p className="text-muted-foreground mb-6">
                    Plan your next 90-day focus period to continue making meaningful progress on your mission.
                  </p>
                  <Button>Create Next Sprint</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sprint;
