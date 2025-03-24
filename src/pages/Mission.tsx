
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { MissionContainer } from "@/components/mission/MissionContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

const Mission = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen flex-col">
      {isMobile ? (
        <>
          <Navbar title="Mission & Vision" subtitle="Define your purpose and align your actions">
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
          
          <main className="flex-1 px-3 py-3 overflow-auto">
            <MissionContainer />
          </main>
        </>
      ) : (
        <div className="flex flex-row">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <Navbar title="Mission & Vision" subtitle="Define your purpose and align your actions" />
            
            <main className="flex-1 px-6 py-8 overflow-auto">
              <MissionContainer />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mission;
