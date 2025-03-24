
import React from "react";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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

interface MissionFormValues {
  statement: string;
  vision: string;
  purpose: string;
}

interface EditMissionDialogProps {
  currentStatement: string;
  currentVision: string;
  currentPurpose: string;
  onSave: (values: MissionFormValues) => void;
}

export function EditMissionDialog({
  currentStatement,
  currentVision,
  currentPurpose,
  onSave,
}: EditMissionDialogProps) {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<MissionFormValues>({
    defaultValues: {
      statement: currentStatement,
      vision: currentVision,
      purpose: currentPurpose,
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
          className="absolute top-8 right-24 h-9 w-9 rounded-full bg-background/50 hover:bg-background/80"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit mission statement</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Mission</DialogTitle>
          <DialogDescription>
            Update your mission statement, vision, and purpose to align with your current goals.
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
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your purpose" 
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
