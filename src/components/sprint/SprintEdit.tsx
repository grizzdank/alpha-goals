
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle, Trash, Save } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Define the form schema
const sprintFormSchema = z.object({
  name: z.string().min(2, {
    message: "Sprint name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startDate: z.string(),
  endDate: z.string(),
});

// Define the objective type
type Objective = {
  id: string;
  title: string;
  description: string;
  progress: number;
};

export function SprintEdit() {
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
  const form = useForm<z.infer<typeof sprintFormSchema>>({
    resolver: zodResolver(sprintFormSchema),
    defaultValues: {
      name: "Q3 - Building digital presence",
      description: "This sprint focuses on establishing and growing your online presence through content creation, community building, and digital tools.",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof sprintFormSchema>) => {
    // In a real app, this would save to a database
    console.log("Sprint updated:", values);
    console.log("Objectives:", objectives);
    toast.success("Sprint updated successfully");
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sprint Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Q3 - Building digital presence" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what this sprint is about"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Objectives Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Sprint Objectives</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addObjective}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Objective
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {objectives.map((objective) => (
                    <Card key={objective.id} className="bg-white/60 dark:bg-gray-800/60">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 mr-2">
                              <Label htmlFor={`objective-title-${objective.id}`}>Title</Label>
                              <Input
                                id={`objective-title-${objective.id}`}
                                value={objective.title}
                                onChange={(e) => updateObjective(objective.id, "title", e.target.value)}
                                placeholder="Objective title"
                                className="mt-1"
                              />
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeObjective(objective.id)}
                              className="text-destructive hover:text-destructive/90 mt-6"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>

                          <div>
                            <Label htmlFor={`objective-desc-${objective.id}`}>Description</Label>
                            <Input
                              id={`objective-desc-${objective.id}`}
                              value={objective.description}
                              onChange={(e) => updateObjective(objective.id, "description", e.target.value)}
                              placeholder="Brief description"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <Label htmlFor={`objective-progress-${objective.id}`}>Progress</Label>
                              <span className="text-sm font-medium">{objective.progress}%</span>
                            </div>
                            <Input
                              id={`objective-progress-${objective.id}`}
                              type="range"
                              min="0"
                              max="100"
                              value={objective.progress}
                              onChange={(e) => updateObjective(objective.id, "progress", parseInt(e.target.value))}
                              className="mt-1"
                            />
                            <Progress value={objective.progress} className="h-2 mt-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full sm:w-auto flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Sprint
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
