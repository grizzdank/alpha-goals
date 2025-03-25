
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut, Search, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Navbar({ title = "Alpha Goals", subtitle, children }: NavbarProps) {
  const { user, profile, signOut } = useAuth();
  
  const getInitials = () => {
    if (profile?.username) {
      return profile.username.slice(0, 2).toUpperCase();
    }
    if (profile?.full_name) {
      return profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };
  
  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10">
      <div className="flex items-center justify-between h-full px-3 md:px-6">
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
        <div className="flex items-center space-x-1 md:space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Search - Hide on smaller screens */}
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="py-2 pl-9 pr-4 rounded-full bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all w-[160px] md:w-[180px] focus:w-[200px] md:focus:w-[220px]"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-1 md:p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </button>

          {/* User avatar / Auth buttons */}
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center hover:opacity-80 transition-opacity">
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.username || profile?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
