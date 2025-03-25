
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HabitForm } from "@/components/sprint/HabitForm";

interface EditHabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habitToEdit: any;
  onSaveEdit: (updatedHabit: any) => void;
}

export function EditHabitDialog({ 
  open, 
  onOpenChange, 
  habitToEdit, 
  onSaveEdit 
}: EditHabitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
        </DialogHeader>
        {habitToEdit && (
          <HabitForm 
            initialValues={habitToEdit} 
            onSubmit={onSaveEdit} 
            submitButtonText="Save Changes"
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
