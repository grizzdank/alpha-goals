
import React from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Challenge } from "./MonthlyChallenges";
import { ChartBar } from "lucide-react";

interface ProgressUpdateDialogProps {
  challenge: Challenge;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (challenge: Challenge) => void;
}

interface FormValues {
  progress: number;
}

export function ProgressUpdateDialog({
  challenge,
  open,
  onOpenChange,
  onUpdate
}: ProgressUpdateDialogProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      progress: challenge.progress
    }
  });

  const handleSubmit = (values: FormValues) => {
    // If progress is 100%, mark as completed
    const newStatus = values.progress === 100 ? "completed" : challenge.status;
    
    const updatedChallenge = {
      ...challenge,
      progress: values.progress,
      status: newStatus
    };
    
    onUpdate(updatedChallenge);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-primary" />
            <DialogTitle>Update Challenge Progress</DialogTitle>
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
              
              <FormField
                control={form.control}
                name="progress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Progress: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="py-4"
                      />
                    </FormControl>
                    <FormDescription>
                      Slide to update your progress. Setting to 100% will mark the challenge as completed.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Update Progress</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
