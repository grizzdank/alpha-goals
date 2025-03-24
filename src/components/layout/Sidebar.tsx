
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  BarChart, 
  DollarSign, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const navItems = [
  { 
    name: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/',
    description: 'Overview of your progress'
  },
  { 
    name: 'Mission', 
    icon: Target, 
    path: '/mission',
    description: 'Define your purpose and plan'
  },
  { 
    name: 'Sprints', 
    icon: Calendar, 
    path: '/sprints',
    description: 'Manage 90-day sprints and challenges'
  },
  { 
    name: 'Analytics', 
    icon: BarChart, 
    path: '/analytics',
    description: 'Track your progress over time'
  },
  { 
    name: 'Financial', 
    icon: DollarSign, 
    path: '/financial',
    description: 'Calculate your freedom number'
  },
  { 
    name: 'Settings', 
    icon: Settings, 
    path: '/settings',
    description: 'Customize your experience'
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 flex flex-col transition-all duration-300 ease-in-out",
        "border-r border-border bg-sidebar dark:bg-sidebar shadow-sm z-30",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border dark:border-sidebar-border">
        <div className={cn(
          "flex items-center transition-opacity duration-300",
          collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        )}>
          <div className="text-xl font-bold text-primary mr-2">Mission</div>
          <div className="text-xl font-semibold dark:text-white">Planner</div>
        </div>
        <div className={cn(
          "text-xl font-bold text-primary transition-opacity duration-300",
          collapsed ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
        )}>
          MP
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-3 transition-all duration-200",
                    "hover:bg-sidebar-accent group hover:shadow-sm",
                    isActive 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "text-sidebar-foreground"
                  )}
                >
                  <item.icon 
                    className={cn(
                      "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                      isActive ? "" : "group-hover:translate-x-1"
                    )} 
                  />
                  
                  <span 
                    className={cn(
                      "ml-3 flex-1 whitespace-nowrap transition-opacity duration-300",
                      collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    )}
                  >
                    {item.name}
                  </span>
                  
                  {!collapsed && !isActive && (
                    <span className="ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Collapse Button */}
      <div className="p-4 border-t border-border dark:border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          <span 
            className={cn(
              "ml-2 transition-opacity duration-300",
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}
          >
            {collapsed ? "Expand" : "Collapse"}
          </span>
        </button>
      </div>
    </aside>
  );
}
