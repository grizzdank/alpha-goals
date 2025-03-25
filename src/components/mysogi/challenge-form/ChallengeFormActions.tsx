
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";

interface ChallengeFormActionsProps {
  isEditing: boolean;
}

export function ChallengeFormActions({ isEditing }: ChallengeFormActionsProps) {
  return (
    <DialogFooter className="mt-6">
      <DialogClose asChild>
        <Button type="button" variant="outline">Cancel</Button>
      </DialogClose>
      <Button type="submit">
        {isEditing ? "Update" : "Create"} Challenge
      </Button>
    </DialogFooter>
  );
}
