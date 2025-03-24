
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface NavbarProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Navbar({ title = "Mission Planner Pro", subtitle, children }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side - Title and mobile menu */}
        <div className="flex items-center">
          {/* Mobile menu trigger */}
          {children}
          
          {/* Title */}
          <div className="flex flex-col justify-center">
            <h1 className="text-lg md:text-xl font-semibold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Search */}
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="py-2 pl-9 pr-4 rounded-full bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all w-[160px] md:w-[180px] focus:w-[200px] md:focus:w-[220px]"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </button>

          {/* User avatar */}
          <div className="flex items-center">
            <button className="flex items-center hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                <User className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
