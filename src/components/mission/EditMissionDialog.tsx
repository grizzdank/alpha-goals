
import React from "react";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

interface IkigaiComponents {
  love: string;
  good: string;
  paid: string;
  needs: string;
}

interface MissionFormValues {
  statement: string;
  vision: string;
  ikigaiComponents: IkigaiComponents;
}

interface EditMissionDialogProps {
  currentStatement: string;
  currentVision: string;
  currentIkigaiComponents: IkigaiComponents;
  onSave: (values: MissionFormValues) => void;
}

export function EditMissionDialog({
  currentStatement,
  currentVision,
  currentIkigaiComponents,
  onSave,
}: EditMissionDialogProps) {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<MissionFormValues>({
    defaultValues: {
      statement: currentStatement,
      vision: currentVision,
      ikigaiComponents: currentIkigaiComponents,
    },
  });

  function onSubmit(values: MissionFormValues) {
    onSave(values);
    toast({
      title: "Mission updated",
      description: "Your mission statement has been successfully updated.",
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-8 right-8 h-9 w-9 rounded-full bg-background/50 hover:bg-background/80"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit mission statement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Mission</DialogTitle>
          <DialogDescription>
            Update your mission statement, vision, and Ikigai components to align with your current goals.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="statement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ikigai Statement</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your mission statement" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ikigaiComponents.love"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What I Love</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What activities bring you joy?" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ikigaiComponents.good"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What I'm Good At</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What are your skills and strengths?" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ikigaiComponents.paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What I Can Be Paid For</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What services or products can you provide that people would pay for?" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ikigaiComponents.needs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What the World Needs</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What problems can you help solve?" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="vision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vision</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your vision" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
