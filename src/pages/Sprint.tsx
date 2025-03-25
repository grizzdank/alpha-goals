
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, ChevronRight, Pencil } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { CurrentSprint } from "@/components/mission/CurrentSprint";
import { SprintEdit } from "@/components/sprint/SprintEdit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
              {isEditing ? (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Edit Sprint</h2>
                    <Button variant="outline" onClick={toggleEdit}>
                      Cancel
                    </Button>
                  </div>
                  <SprintEdit onComplete={toggleEdit} />
                </div>
              ) : (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-muted/50">
                        Current Sprint
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleEdit} 
                        className="h-8 w-8"
                        title="Edit Sprint"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    <Link to="/sprints/next">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        Next Sprint <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CurrentSprint />
                  <div className="mt-4 text-center">
                    <Link to="/sprints">
                      <Button variant="link" className="text-primary">
                        View all sprints
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sprint;
