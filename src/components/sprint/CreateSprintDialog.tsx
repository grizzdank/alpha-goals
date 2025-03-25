
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SprintFormValues, sprintFormSchema } from "./SprintDetailsForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { SprintDetailsForm } from "./SprintDetailsForm";

interface CreateSprintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateSprintDialog({ open, onOpenChange }: CreateSprintDialogProps) {
  const { toast } = useToast();
  
  // Default values for the next sprint (using current date + 90 days for end date)
  const today = new Date();
  const nextQuarterStart = new Date(today);
  const nextQuarterEnd = new Date(today);
  nextQuarterEnd.setDate(today.getDate() + 90);
  
  // Format dates as YYYY-MM-DD for the form
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const defaultValues: SprintFormValues = {
    name: `Q${Math.ceil((today.getMonth() + 1) / 3) + 1} - Next Steps`,
    description: "Focus on building momentum and making progress toward key objectives.",
    startDate: formatDateForInput(nextQuarterStart),
    endDate: formatDateForInput(nextQuarterEnd),
  };
  
  const form = useForm<SprintFormValues>({
    resolver: zodResolver(sprintFormSchema),
    defaultValues,
  });
  
  function onSubmit(data: SprintFormValues) {
    // In a real app, this would save to database
    console.log("Creating new sprint:", data);
    
    // Store in localStorage for now
    const existingSprints = JSON.parse(localStorage.getItem('sprints') || '[]');
    const newSprint = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      objectives: [],
      progress: 0
    };
    
    localStorage.setItem('sprints', JSON.stringify([...existingSprints, newSprint]));
    
    toast({
      title: "Sprint created",
      description: "Your next sprint has been created successfully."
    });
    
    onOpenChange(false);
    
    // Redirect to the current sprint tab
    window.location.href = "/sprints?tab=current";
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Next Sprint</DialogTitle>
          <DialogDescription>
            Plan your next 90-day focus period. What do you want to accomplish?
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SprintDetailsForm defaultValues={defaultValues} form={form} />
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Sprint</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
