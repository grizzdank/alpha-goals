
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SprintFormValues, sprintFormSchema } from "./SprintDetailsForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { SprintDetailsForm } from "./SprintDetailsForm";
import { SprintObjectivesSection } from "./SprintObjectives";
import { Objective } from "./SprintObjectiveItem";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface CreateSprintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateSprintDialog({ open, onOpenChange }: CreateSprintDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("details");
  const [objectives, setObjectives] = useState<Objective[]>([
    { id: "1", title: "", description: "", progress: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  // Objective functions
  const handleAddObjective = () => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      title: "",
      description: "",
      progress: -1 // Will be set to 0 when saving
    };
    
    setObjectives([...objectives, newObjective]);
  };
  
  const handleRemoveObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };
  
  const handleUpdateObjective = (id: string, field: keyof Objective, value: string | number) => {
    setObjectives(objectives.map(obj => 
      obj.id === id ? { ...obj, [field]: value } : obj
    ));
  };
  
  async function onSubmit(data: SprintFormValues) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a sprint.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Validate that the objectives have titles
    const validObjectives = objectives.filter(obj => obj.title.trim() !== "");
    
    // Set progress to 0 for all objectives (they start at 0 in a new sprint)
    const finalObjectives = validObjectives.map(obj => ({
      ...obj,
      progress: 0
    }));
    
    try {
      // Insert the sprint to Supabase
      const { data: sprintData, error: sprintError } = await supabase
        .from('sprints')
        .insert({
          user_id: user.id,
          name: data.name,
          description: data.description,
          start_date: data.startDate,
          end_date: data.endDate,
          progress: 0,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
        
      if (sprintError) throw sprintError;
      
      if (finalObjectives.length > 0 && sprintData) {
        // Now insert objectives
        const objectivesWithSprintId = finalObjectives.map(obj => ({
          sprint_id: sprintData.id,
          title: obj.title,
          description: obj.description || "",
          progress: 0,
        }));
        
        const { error: objectivesError } = await supabase
          .from('sprint_objectives')
          .insert(objectivesWithSprintId);
          
        if (objectivesError) throw objectivesError;
      }
      
      toast({
        title: "Sprint created",
        description: "Your next sprint has been created successfully."
      });
      
      onOpenChange(false);
      
      // Redirect to the current sprint tab
      window.location.href = "/sprints?tab=current";
      
    } catch (error: any) {
      console.error("Error creating sprint:", error);
      toast({
        title: "Failed to create sprint",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6 mt-6">
                <SprintDetailsForm defaultValues={defaultValues} form={form} />
              </TabsContent>
              
              <TabsContent value="objectives" className="space-y-6 mt-6">
                <SprintObjectivesSection
                  objectives={objectives}
                  onAddObjective={handleAddObjective}
                  onRemoveObjective={handleRemoveObjective}
                  onUpdateObjective={handleUpdateObjective}
                />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Sprint"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
