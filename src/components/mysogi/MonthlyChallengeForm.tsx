
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";
import { ChallengeFormBasicFields } from "./challenge-form/ChallengeFormBasicFields";
import { ChallengeFormSuccessCriteria } from "./challenge-form/ChallengeFormSuccessCriteria";
import { ChallengeFormDateFields } from "./challenge-form/ChallengeFormDateFields";
import { ChallengeFormActions } from "./challenge-form/ChallengeFormActions";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MonthlyChallengeFormValues {
  id?: number;
  title: string;
  description: string;
  category: string;
  successCriteria: string; // "I will know I met my goal because..."
  startDate: string;
  endDate: string;
  progress?: number;
  status?: string;
}

interface MonthlyChallengeFormProps {
  challenge?: Partial<MonthlyChallengeFormValues>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: MonthlyChallengeFormValues) => void;
  categories: Array<{id: string, name: string}>;
}

export function MonthlyChallengeForm({ 
  challenge, 
  open, 
  onOpenChange, 
  onSubmit,
  categories
}: MonthlyChallengeFormProps) {
  // Calculate default dates (current month start/end)
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const defaultValues: Partial<MonthlyChallengeFormValues> = {
    title: "",
    description: "",
    category: categories[0]?.id || "mind",
    successCriteria: "",
    startDate: startOfMonth.toISOString().split('T')[0],
    endDate: endOfMonth.toISOString().split('T')[0],
    progress: 0,
    status: "upcoming",
    ...challenge
  };

  const form = useForm<MonthlyChallengeFormValues>({
    defaultValues
  });

  const handleSubmit = (values: MonthlyChallengeFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] md:max-h-none overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <DialogTitle>{challenge?.id ? "Edit" : "Create"} Monthly Challenge</DialogTitle>
          </div>
          <DialogDescription>
            Set a challenge for yourself to complete within the month
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-8rem)] md:max-h-none">
          <div className="px-1 py-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <ChallengeFormBasicFields control={form.control} categories={categories} />
                <ChallengeFormSuccessCriteria control={form.control} />
                <ChallengeFormDateFields control={form.control} />
                <ChallengeFormActions isEditing={!!challenge?.id} />
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
