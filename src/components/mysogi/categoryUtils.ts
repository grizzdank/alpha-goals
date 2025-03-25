
import { Brain, Dumbbell, Heart, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

export interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

export const monthlyCategories: Category[] = [
  { id: "body", name: "Body", icon: Dumbbell, color: "bg-body/10 text-body" },
  { id: "mind", name: "Mind", icon: Brain, color: "bg-mind/10 text-mind" },
  { id: "relationships", name: "Relationships", icon: Heart, color: "bg-relationships/10 text-relationships" },
  { id: "purpose", name: "Purpose", icon: Target, color: "bg-purpose/10 text-purpose" },
];

export const getCategoryIcon = (categoryId: string) => {
  const category = monthlyCategories.find(cat => cat.id === categoryId);
  if (!category) return Target;
  return category.icon;
};

export const getCategoryColor = (categoryId: string) => {
  const category = monthlyCategories.find(cat => cat.id === categoryId);
  if (!category) return "bg-gray-100 text-gray-500";
  return category.color;
};

export const getStatusBadge = (status: string): React.ReactNode => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">Active</Badge>;
    case "completed":
      return <Badge className="bg-blue-500">Completed</Badge>;
    case "upcoming":
      return <Badge className="bg-amber-500">Upcoming</Badge>;
    default:
      return null;
  }
};
