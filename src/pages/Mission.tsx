
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
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
          <main className="flex-1 px-3 py-3 overflow-auto">
            <MissionContainer />
          </main>
        </>
      ) : (
        <div className="flex flex-row">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
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
