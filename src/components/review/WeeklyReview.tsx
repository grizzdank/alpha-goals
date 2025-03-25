
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Check, CheckCircle, Target, ThumbsUp, XCircle } from "lucide-react";

const weeklyReviewSchema = z.object({
  wins: z.string().min(1, "Please share at least one win from this week"),
  challenges: z.string().min(1, "Please share at least one challenge you faced"),
  lessons: z.string().min(1, "Please share at least one lesson you learned"),
  nextWeekFocus: z.string().min(1, "Please set at least one focus for next week"),
  habits: z.array(
    z.object({
      name: z.string(),
      completed: z.number(),
      target: z.number(),
      progress: z.number().optional(),
    })
  ).optional(),
});

type WeeklyReviewValues = z.infer<typeof weeklyReviewSchema>;

interface WeeklyReviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WeeklyReview({ open, onOpenChange }: WeeklyReviewProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<"review" | "plan">("review");
  
  const defaultValues: WeeklyReviewValues = {
    wins: "",
    challenges: "",
    lessons: "",
    nextWeekFocus: "",
    habits: [
      { name: "Meditation", completed: 4, target: 7, progress: 57 },
      { name: "Exercise", completed: 3, target: 5, progress: 60 },
      { name: "Journaling", completed: 5, target: 7, progress: 71 },
    ],
  };
  
  const form = useForm<WeeklyReviewValues>({
    resolver: zodResolver(weeklyReviewSchema),
    defaultValues,
  });
  
  function onSubmit(data: WeeklyReviewValues) {
    console.log("Weekly review submitted:", data);
    
    // In a real app, you would save this data to your state/API
    localStorage.setItem("lastWeeklyReview", JSON.stringify({
      date: new Date().toISOString(),
      data
    }));
    
    toast({
      title: "Weekly review completed!",
      description: "You've successfully completed your weekly review.",
    });
    
    onOpenChange(false);
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Weekly Review & Planning</DialogTitle>
          <DialogDescription>
            Reflect on your past week and plan for the next one.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === "review" ? (
              <>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="wins"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-500" />
                          What wins did you have this week?
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I completed my project presentation, spent quality time with family..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="challenges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          What challenges did you face?
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I struggled with time management, missed my exercise goals..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lessons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          What lessons did you learn?
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I learned that I need more structure in my mornings, that batch processing emails saves time..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {form.formState.errors.wins || form.formState.errors.challenges || form.formState.errors.lessons ? (
                  <Button type="button" className="w-full" disabled>
                    Continue to Planning
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={() => setCurrentStep("plan")}
                  >
                    Continue to Planning
                  </Button>
                )}
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-medium mb-4">Habit Performance</h3>
                  <div className="space-y-4">
                    {form.getValues().habits?.map((habit, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                        <div>
                          <p className="font-medium">{habit.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {habit.completed}/{habit.target} days completed
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${habit.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{habit.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="nextWeekFocus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-500" />
                        What will you focus on next week?
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="I will prioritize morning exercise, complete my project milestone, schedule dedicated family time..." 
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setCurrentStep("review")}
                    className="w-full sm:w-auto"
                  >
                    Back to Review
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">
                    Complete Weekly Review
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
