import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Heart, Brain, DollarSign, Globe } from 'lucide-react';
import { missionService } from '@/services/missionService';
import { useAuth } from '@/hooks/use-auth';

interface IkigaiComponentsForm {
  love: string;
  good: string;
  paid: string;
  needs: string;
}

export function IkigaiEditor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<IkigaiComponentsForm>({
    love: '',
    good: '',
    paid: '',
    needs: ''
  });

  useEffect(() => {
    const loadIkigaiComponents = async () => {
      if (!user?.id) return;
      
      try {
        const components = await missionService.getIkigaiComponents(user.id);
        if (components) {
          setForm({
            love: components.love,
            good: components.good,
            paid: components.paid,
            needs: components.needs
          });
        }
      } catch (error) {
        console.error('Error loading ikigai components:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your ikigai components',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadIkigaiComponents();
  }, [user?.id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsSaving(true);
    try {
      await missionService.updateIkigaiComponents(user.id, form);
      toast({
        title: 'Success',
        description: 'Your ikigai components have been updated',
      });
    } catch (error) {
      console.error('Error saving ikigai components:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your ikigai components',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof IkigaiComponentsForm) => (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-24 flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Ikigai</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">What you love</h3>
              </div>
              <Textarea
                placeholder="What activities bring you joy and fulfillment?"
                value={form.love}
                onChange={handleChange('love')}
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">What you're good at</h3>
              </div>
              <Textarea
                placeholder="What are your natural talents and developed skills?"
                value={form.good}
                onChange={handleChange('good')}
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">What you can be paid for</h3>
              </div>
              <Textarea
                placeholder="What services or value can you provide that people will pay for?"
                value={form.paid}
                onChange={handleChange('paid')}
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">What the world needs</h3>
              </div>
              <Textarea
                placeholder="What problems or needs in the world align with your skills and passions?"
                value={form.needs}
                onChange={handleChange('needs')}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}