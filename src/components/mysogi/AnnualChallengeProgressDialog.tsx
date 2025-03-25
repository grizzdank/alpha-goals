
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Award, CheckCircle, ListChecks } from "lucide-react";
import { toast } from "sonner";

interface AnnualChallengeProgressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: {
    title: string;
    progress: number;
    prepSteps?: string[];
    milestones: { title: string; completed: boolean }[];
  };
  onUpdateProgress: (data: {
    progress: number;
    completedPrepSteps: boolean[];
    completedMilestones: boolean[];
  }) => void;
  completedPrepSteps: boolean[];
}

export function AnnualChallengeProgressDialog({
  open,
  onOpenChange,
  challenge,
  onUpdateProgress,
  completedPrepSteps
}: AnnualChallengeProgressDialogProps) {
  const [progress, setProgress] = useState<number>(challenge.progress);
  const [stepStatus, setStepStatus] = useState<boolean[]>(completedPrepSteps);
  const [milestoneStatus, setMilestoneStatus] = useState<boolean[]>(
    challenge.milestones.map(m => m.completed)
  );

  const handleUpdateProgress = () => {
    onUpdateProgress({
      progress,
      completedPrepSteps: stepStatus,
      completedMilestones: milestoneStatus
    });
    toast.success("Challenge progress updated successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <DialogTitle>Update "{challenge.title}" Progress</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Overall progress slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Overall Progress: {progress}%</Label>
            </div>
            <Slider
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Preparation steps */}
          {challenge.prepSteps && challenge.prepSteps.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Preparation Steps</h3>
              </div>
              <div className="space-y-3">
                {challenge.prepSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent/20 rounded-md">
                    <Checkbox 
                      id={`step-${index}`} 
                      checked={stepStatus[index]}
                      onCheckedChange={(checked) => {
                        const newStatus = [...stepStatus];
                        newStatus[index] = checked === true;
                        setStepStatus(newStatus);
                      }}
                      className="mt-0.5"
                    />
                    <Label htmlFor={`step-${index}`} className="text-sm font-normal leading-tight">
                      {step}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Milestones */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Milestones</h3>
            </div>
            <div className="space-y-3">
              {challenge.milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-accent/20 rounded-md">
                  <Checkbox 
                    id={`milestone-${index}`} 
                    checked={milestoneStatus[index]}
                    onCheckedChange={(checked) => {
                      const newStatus = [...milestoneStatus];
                      newStatus[index] = checked === true;
                      setMilestoneStatus(newStatus);
                    }}
                    className="mt-0.5"
                  />
                  <Label htmlFor={`milestone-${index}`} className="text-sm font-normal leading-tight">
                    {milestone.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleUpdateProgress}
          >
            Save Progress
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
