
import React from "react";
import { Navbar } from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Mission Planner Pro", 
  subtitle 
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar title={title} subtitle={subtitle}>
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
      <div className="flex flex-1">
        {!isMobile && <Sidebar />}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};
