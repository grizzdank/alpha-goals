
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Pin, PinOff } from "lucide-react";

interface HabitCardProps {
  habit: {
    id: number;
    title: string;
    description: string;
    domain: string;
    active: boolean;
    streak: number;
    createdAt: string;
    isPinned: boolean;
  };
  onToggleActive: (id: number) => void;
  onEdit: (habit: any) => void;
  onDelete: (habit: any) => void;
  onTogglePin: (habit: any) => void;
  getDomainIcon: (domain: string) => React.ReactNode;
  getDomainColorClass: (domain: string) => string;
}

export function HabitCard({
  habit,
  onToggleActive,
  onEdit,
  onDelete,
  onTogglePin,
  getDomainIcon,
  getDomainColorClass
}: HabitCardProps) {
  return (
    <Card key={habit.id} className={`hover:shadow-md transition-shadow ${!habit.active ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Checkbox 
              id={`active-${habit.id}`}
              checked={habit.active}
              onCheckedChange={() => onToggleActive(habit.id)}
            />
            <div>
              <CardTitle className="text-base">{habit.title}</CardTitle>
              <CardDescription>{habit.description}</CardDescription>
            </div>
          </div>
          <Badge className={`flex items-center gap-1 ${getDomainColorClass(habit.domain)}`}>
            {getDomainIcon(habit.domain)}
            <span>{habit.domain.charAt(0).toUpperCase() + habit.domain.slice(1)}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm">
          <span className="font-medium">{habit.streak}</span>
          <span className="text-muted-foreground ml-1">day streak</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => onEdit(habit)}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="gap-1"
            onClick={() => onTogglePin(habit)}
            title={habit.isPinned ? "Unpin from dashboard" : "Pin to dashboard"}
          >
            {habit.isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            {habit.isPinned ? "Unpin" : "Pin"}
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 gap-1"
          onClick={() => onDelete(habit)}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
