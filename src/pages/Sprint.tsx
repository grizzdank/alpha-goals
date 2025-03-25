
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { HabitForm } from "@/components/sprint/HabitForm";
import { CurrentSprint } from "@/components/mission/CurrentSprint";

const Sprint = () => {
  const isMobile = useIsMobile();

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
              <CurrentSprint />
              <HabitForm />
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
                <CurrentSprint />
                <HabitForm />
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sprint;
