
import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthCardFooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AuthCardFooter = ({ activeTab, onTabChange }: AuthCardFooterProps) => {
  return (
    <div className="flex justify-center text-sm text-muted-foreground">
      {activeTab === "login" ? (
        <p>Don't have an account? <Button variant="link" className="p-0 h-auto" onClick={() => onTabChange("signup")}>Sign up</Button></p>
      ) : (
        <p>Already have an account? <Button variant="link" className="p-0 h-auto" onClick={() => onTabChange("login")}>Sign in</Button></p>
      )}
    </div>
  );
};
