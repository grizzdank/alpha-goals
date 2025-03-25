
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CalendarPlus, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

type HabitFormValues = {
  id?: number;
  title: string;
  description: string;
  domain: "mind" | "body" | "purpose" | "relationships";
  streak?: number;
  active?: boolean;
  isPinned?: boolean;
};

interface HabitFormProps {
  initialValues?: HabitFormValues;
  onSubmit?: (habit: HabitFormValues) => void;
  submitButtonText?: string;
  onCancel?: () => void;
}

export function HabitForm({ 
  initialValues, 
  onSubmit: propOnSubmit, 
  submitButtonText = "Create Habit",
  onCancel
}: HabitFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<HabitFormValues>({
    defaultValues: initialValues || {
      title: "",
      description: "",
      domain: "mind",
    },
  });

  const onSubmit = async (values: HabitFormValues) => {
    setIsSubmitting(true);
    
    try {
      if (propOnSubmit) {
        // Use the provided onSubmit function if available
        propOnSubmit({
          ...values,
          id: initialValues?.id,
          streak: initialValues?.streak || 0,
          active: initialValues?.active !== undefined ? initialValues.active : true,
          isPinned: initialValues?.isPinned || false,
        });
      } else {
        // Default behavior for new habits
        console.log("Habit created:", values);
        toast.success("Habit created successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Error with habit:", error);
      toast.error("Failed to process habit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden hover-lift animate-fade-in mb-6">
      <CardHeader className="bg-primary/10 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg md:text-xl text-primary">
            {initialValues ? "Edit Habit" : "Create Daily Habit"}
          </CardTitle>
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <CalendarPlus className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Morning Meditation" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name your habit clearly so you know what to do each day.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what this habit involves..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Add details about how to perform this habit and why it matters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a domain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mind">Mind</SelectItem>
                      <SelectItem value="body">Body</SelectItem>
                      <SelectItem value="purpose">Purpose</SelectItem>
                      <SelectItem value="relationships">Relationships</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose which life domain this habit belongs to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-3 mt-4">
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : submitButtonText}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      
      {!initialValues && (
        <CardFooter className="bg-muted/20 px-4 py-3 border-t">
          <Link to="/habits" className="flex items-center gap-1.5 text-primary hover:underline text-sm">
            <ListChecks className="h-4 w-4" />
            <span className="font-medium">Manage All Habits</span>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
