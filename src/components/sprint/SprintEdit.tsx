
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { SprintDetailsForm, sprintFormSchema, SprintFormValues } from "./SprintDetailsForm";
import { SprintObjectivesSection } from "./SprintObjectives";
import { Objective } from "./SprintObjectiveItem";

interface SprintEditProps {
  onComplete: () => void;
}

export function SprintEdit({ onComplete }: SprintEditProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  
  // Sample data for the sprint form
  const defaultValues: SprintFormValues = {
    name: "Q3 2023 - Building Momentum",
    description: "Focus on establishing key habits and making measurable progress towards financial goals.",
    startDate: "2023-07-01",
    endDate: "2023-09-30",
  };
  
  // Sample objectives data
  const [objectives, setObjectives] = useState<Objective[]>([
    { id: "1", title: "Complete MVP of personal website", description: "Finish building and launch the first version of my portfolio site", progress: 65 },
    { id: "2", title: "Establish daily writing habit", description: "Write at least 500 words per day for the entire sprint", progress: 80 },
    { id: "3", title: "Increase emergency fund", description: "Add $3000 to emergency savings", progress: 45 },
  ]);
  
  const form = useForm<SprintFormValues>({
    resolver: zodResolver(sprintFormSchema),
    defaultValues,
  });
  
  function onSubmit(data: SprintFormValues) {
    // Here you would typically save the form data
    console.log("Form submitted:", data);
    console.log("Objectives:", objectives);
    
    toast({
      title: "Sprint updated",
      description: "Your sprint has been updated successfully.",
    });
    
    onComplete();
  }
  
  // Objective functions
  const handleAddObjective = () => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      title: "",
      description: "",
      progress: 0
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
  
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button type="button" variant="outline" onClick={onComplete}>
              Cancel
            </Button>
            <Button type="submit">Save Sprint</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
