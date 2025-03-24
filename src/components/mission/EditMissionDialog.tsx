
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Plus, Trash2 } from "lucide-react";
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

interface IkigaiComponents {
  love: string;
  good: string;
  paid: string;
  needs: string;
}

interface VisionGoals {
  oneYear: {
    statement: string;
    milestones: string[];
  };
  fiveYear: {
    statement: string;
    milestones: string[];
  };
  tenYear: {
    statement: string;
    milestones: string[];
  };
}

interface MissionFormValues {
  statement: string;
  visionGoals: VisionGoals;
  ikigaiComponents: IkigaiComponents;
}

interface EditMissionDialogProps {
  currentStatement: string;
  currentVisionGoals: VisionGoals;
  currentIkigaiComponents: IkigaiComponents;
  onSave: (values: MissionFormValues) => void;
}

export function EditMissionDialog({
  currentStatement,
  currentVisionGoals,
  currentIkigaiComponents,
  onSave,
}: EditMissionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [oneYearMilestones, setOneYearMilestones] = useState<string[]>([...currentVisionGoals.oneYear.milestones]);
  const [fiveYearMilestones, setFiveYearMilestones] = useState<string[]>([...currentVisionGoals.fiveYear.milestones]);
  const [tenYearMilestones, setTenYearMilestones] = useState<string[]>([...currentVisionGoals.tenYear.milestones]);
  
  const form = useForm<MissionFormValues>({
    defaultValues: {
      statement: currentStatement,
      visionGoals: currentVisionGoals,
      ikigaiComponents: currentIkigaiComponents,
    },
  });

  function onSubmit(values: MissionFormValues) {
    // Update milestones from local state
    values.visionGoals.oneYear.milestones = oneYearMilestones;
    values.visionGoals.fiveYear.milestones = fiveYearMilestones;
    values.visionGoals.tenYear.milestones = tenYearMilestones;
    
    onSave(values);
    toast({
      title: "Mission updated",
      description: "Your mission statement and vision have been successfully updated.",
    });
    setOpen(false);
  }

  // Functions to handle milestones
  const addMilestone = (year: 'oneYear' | 'fiveYear' | 'tenYear') => {
    if (year === 'oneYear') {
      setOneYearMilestones([...oneYearMilestones, '']);
    } else if (year === 'fiveYear') {
      setFiveYearMilestones([...fiveYearMilestones, '']);
    } else {
      setTenYearMilestones([...tenYearMilestones, '']);
    }
  };

  const updateMilestone = (year: 'oneYear' | 'fiveYear' | 'tenYear', index: number, value: string) => {
    if (year === 'oneYear') {
      const updated = [...oneYearMilestones];
      updated[index] = value;
      setOneYearMilestones(updated);
    } else if (year === 'fiveYear') {
      const updated = [...fiveYearMilestones];
      updated[index] = value;
      setFiveYearMilestones(updated);
    } else {
      const updated = [...tenYearMilestones];
      updated[index] = value;
      setTenYearMilestones(updated);
    }
  };

  const removeMilestone = (year: 'oneYear' | 'fiveYear' | 'tenYear', index: number) => {
    if (year === 'oneYear') {
      setOneYearMilestones(oneYearMilestones.filter((_, i) => i !== index));
    } else if (year === 'fiveYear') {
      setFiveYearMilestones(fiveYearMilestones.filter((_, i) => i !== index));
    } else {
      setTenYearMilestones(tenYearMilestones.filter((_, i) => i !== index));
    }
  };

  const MilestoneInputs = ({ year, milestones, setMilestone, addMilestone, removeMilestone }: {
    year: 'oneYear' | 'fiveYear' | 'tenYear';
    milestones: string[];
    setMilestone: (index: number, value: string) => void;
    addMilestone: () => void;
    removeMilestone: (index: number) => void;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <FormLabel>Key Milestones</FormLabel>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addMilestone}
          className="h-7 px-2"
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </div>
      {milestones.map((milestone, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={milestone}
            onChange={(e) => setMilestone(index, e.target.value)}
            placeholder={`Milestone ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeMilestone(index)}
            className="h-10 w-10 shrink-0"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-background/50 hover:bg-background/80"
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
            
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-medium">Vision Timeline</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="visionGoals.oneYear.statement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1-Year Vision</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="In 1 year, I will..." 
                          className="min-h-[60px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <MilestoneInputs 
                  year="oneYear"
                  milestones={oneYearMilestones}
                  setMilestone={(index, value) => updateMilestone('oneYear', index, value)}
                  addMilestone={() => addMilestone('oneYear')}
                  removeMilestone={(index) => removeMilestone('oneYear', index)}
                />
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="visionGoals.fiveYear.statement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5-Year Vision</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="In 5 years, I will..." 
                          className="min-h-[60px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <MilestoneInputs 
                  year="fiveYear"
                  milestones={fiveYearMilestones}
                  setMilestone={(index, value) => updateMilestone('fiveYear', index, value)}
                  addMilestone={() => addMilestone('fiveYear')}
                  removeMilestone={(index) => removeMilestone('fiveYear', index)}
                />
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="visionGoals.tenYear.statement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>10-Year Vision</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="In 10 years, I will..." 
                          className="min-h-[60px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <MilestoneInputs 
                  year="tenYear"
                  milestones={tenYearMilestones}
                  setMilestone={(index, value) => updateMilestone('tenYear', index, value)}
                  addMilestone={() => addMilestone('tenYear')}
                  removeMilestone={(index) => removeMilestone('tenYear', index)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
