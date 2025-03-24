
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { MissionContainer } from "@/components/mission/MissionContainer";

const Mission = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar title="Mission & Vision" subtitle="Define your purpose and align your actions" />
        
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8 overflow-auto">
          <MissionContainer />
        </main>
      </div>
    </div>
  );
};

export default Mission;
