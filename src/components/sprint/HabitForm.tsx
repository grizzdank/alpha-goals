
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
  title: string;
  description: string;
  domain: "mind" | "body" | "purpose" | "relationships";
};

export function HabitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<HabitFormValues>({
    defaultValues: {
      title: "",
      description: "",
      domain: "mind",
    },
  });

  const onSubmit = async (values: HabitFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically save to a database
      console.log("Habit created:", values);
      
      // Show success message
      toast.success("Habit created successfully!");
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error creating habit:", error);
      toast.error("Failed to create habit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden hover-lift animate-fade-in mb-6">
      <CardHeader className="bg-primary/10 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg md:text-xl text-primary">Create Daily Habit</CardTitle>
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
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Habit"}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="bg-muted/20 px-4 py-3 border-t">
        <Link to="/habits" className="flex items-center gap-1.5 text-primary hover:underline text-sm">
          <ListChecks className="h-4 w-4" />
          <span className="font-medium">Manage All Habits</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
