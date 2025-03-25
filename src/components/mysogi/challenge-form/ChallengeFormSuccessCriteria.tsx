
import React from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface ChallengeFormSuccessCriteriaProps {
  control: Control<any>;
}

export function ChallengeFormSuccessCriteria({ control }: ChallengeFormSuccessCriteriaProps) {
  return (
    <FormField
      control={control}
      name="successCriteria"
      render={({ field }) => (
        <FormItem>
          <FormLabel>I will know I met my goal because...</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="I will have meditated for at least 10 minutes every day for 30 days"
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Define clear success criteria for your challenge
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
