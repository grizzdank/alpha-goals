
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HabitLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HabitLimitDialog({ open, onOpenChange }: HabitLimitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Focus on Quality Over Quantity</DialogTitle>
          <DialogDescription>
            Research shows that trying to build too many habits at once significantly reduces your chances of success.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="rounded-lg bg-primary/5 p-4">
            <h3 className="font-semibold mb-2">Recommended Habit Limit: 3-5</h3>
            <p className="text-sm text-muted-foreground">
              For optimal results, focus on 3-5 key habits that align with your mission. This number strikes the perfect balance between progress and sustainability.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0 mt-0.5">
                ✗
              </div>
              <p className="text-sm">
                <span className="font-medium">Too many habits</span>: Spreads your attention too thin, leading to overwhelm and abandonment
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-sm">
                <span className="font-medium">Focused approach</span>: Builds momentum, creates stronger neural pathways, and leads to lasting change
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-sm">
                <span className="font-medium">Quality over quantity</span>: A few consistent habits yield better results than many inconsistent ones
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
