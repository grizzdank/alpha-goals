
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { 
  SprintDetailsForm, 
  sprintFormSchema, 
  type SprintFormValues 
} from "./SprintDetailsForm";
import { 
  SprintObjectivesSection 
} from "./SprintObjectives";
import { Objective } from "./SprintObjectiveItem";

interface SprintEditProps {
  onComplete?: () => void;
}

export function SprintEdit({ onComplete }: SprintEditProps = {}) {
  // Sample initial data - in a real app, this would come from a database
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: "1",
      title: "Launch Mission Planner Pro platform",
      description: "Create the foundation for digital growth",
      progress: 95,
    },
    {
      id: "2",
      title: "Produce weekly content",
      description: "Articles, videos, and social media posts",
      progress: 75,
    },
    {
      id: "3",
      title: "Grow newsletter subscribers",
      description: "Target: 500 subscribers by end of sprint",
      progress: 65,
    },
  ]);

  // Form setup
  const form = useForm<SprintFormValues>({
    resolver: zodResolver(sprintFormSchema),
    defaultValues: {
      name: "Q3 - Building digital presence",
      description: "This sprint focuses on establishing and growing your online presence through content creation, community building, and digital tools.",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
    },
  });

  // Handle form submission
  const onSubmit = (values: SprintFormValues) => {
    // In a real app, this would save to a database
    console.log("Sprint updated:", values);
    console.log("Objectives:", objectives);
    toast.success("Sprint updated successfully");
    
    if (onComplete) {
      onComplete();
    }
  };

  // Add a new objective
  const addObjective = () => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      title: "",
      description: "",
      progress: 0,
    };
    setObjectives([...objectives, newObjective]);
  };

  // Remove an objective
  const removeObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  // Update an objective
  const updateObjective = (id: string, field: keyof Objective, value: string | number) => {
    setObjectives(objectives.map(obj => 
      obj.id === id ? { ...obj, [field]: value } : obj
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Edit Sprint</CardTitle>
          <CardDescription>Update your sprint details, objectives, and track progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sprint Details Form */}
              <SprintDetailsForm form={form} />

              {/* Objectives Section */}
              <SprintObjectivesSection
                objectives={objectives}
                onAddObjective={addObjective}
                onRemoveObjective={removeObjective}
                onUpdateObjective={updateObjective}
              />

              <div className="flex justify-between">
                {onComplete && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onComplete}
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Sprint
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
