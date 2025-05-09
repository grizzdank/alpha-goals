import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MailIcon } from 'lucide-react';

const passwordResetSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

interface PasswordResetFormProps {
  onBackToLogin?: () => void; // Optional: Callback to switch view back to login
}

export const PasswordResetForm = ({ onBackToLogin }: PasswordResetFormProps) => {
  const { requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    setIsLoading(true);
    setApiError(null);
    setIsSubmitted(false);
    try {
      const { error } = await requestPasswordReset(data.email);
      if (error) {
        setApiError(error.message);
      } else {
        setIsSubmitted(true); // Indicate success to show a message
        form.reset(); // Clear the form
      }
    } catch (e: any) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-foreground">
          If an account exists for the provided email, a password reset link has been sent.
          Please check your inbox (and spam folder).
        </p>
        {onBackToLogin && (
          <Button variant="link" onClick={onBackToLogin} className="text-primary">
            Back to Login
          </Button>
        )}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="you@example.com" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {apiError && (
          <p className="text-sm font-medium text-destructive">{apiError}</p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
        {onBackToLogin && (
          <Button variant="link" onClick={onBackToLogin} className="w-full mt-2 text-muted-foreground">
            Cancel
          </Button>
        )}
      </form>
    </Form>
  );
}; 