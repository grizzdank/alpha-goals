
import React from "react";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Award, CalendarClock } from "lucide-react";

interface AnnualChallengeFormValues {
  title: string;
  description: string;
  vision: string; // "This year I will..."
  purpose: string; // "This is important because..."
  prepSteps: string[]; // Preparation steps
  startDate: string;
  endDate: string;
}

interface AnnualChallengeFormProps {
  challenge?: Partial<AnnualChallengeFormValues>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: AnnualChallengeFormValues) => void;
}

export function AnnualChallengeForm({ 
  challenge, 
  open, 
  onOpenChange, 
  onSubmit 
}: AnnualChallengeFormProps) {
  const defaultValues: Partial<AnnualChallengeFormValues> = {
    title: "",
    description: "",
    vision: "",
    purpose: "",
    prepSteps: ["", "", ""],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
    ...challenge
  };

  const form = useForm<AnnualChallengeFormValues>({
    defaultValues
  });

  const handleSubmit = (values: AnnualChallengeFormValues) => {
    // Filter out empty prep steps
    const cleanedValues = {
      ...values,
      prepSteps: values.prepSteps.filter(step => step.trim() !== "")
    };
    
    onSubmit(cleanedValues);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <DialogTitle>{challenge?.title ? "Edit" : "Create"} Annual Mysogi Challenge</DialogTitle>
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Year of Discipline" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name that captures the essence of your annual challenge
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Master your daily habits and build unbreakable discipline..." 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>This year I will...</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Complete a marathon, read 52 books, and master meditation..."
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Describe specifically what you will accomplish
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>This is important because...</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="It will transform my health, expand my knowledge, and give me mental clarity..."
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Explain why this challenge matters to you
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <div className="space-y-3">
              <FormLabel>Preparation Steps</FormLabel>
              <FormDescription>
                What preparations are required? A proper Mysogi needs significant preparation.
              </FormDescription>
              
              {form.watch("prepSteps").map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`prepSteps.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={`Preparation step ${index + 1}`} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => form.setValue("prepSteps", [...form.watch("prepSteps"), ""])}
              >
                Add Another Step
              </Button>
            </div>
            
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
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {challenge?.title ? "Update" : "Create"} Challenge
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
