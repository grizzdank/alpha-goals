
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DomainProgress } from "./DomainProgress";
import { Users, Target, Heart, Brain } from "lucide-react";

export const DomainProgressCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Progress</CardTitle>
        <CardDescription>Progress across all life domains</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DomainProgress name="Mind" progress={79} icon={<Brain className="h-4 w-4" />} />
        <DomainProgress name="Body" progress={68} icon={<Heart className="h-4 w-4" />} />
        <DomainProgress name="Purpose" progress={75} icon={<Target className="h-4 w-4" />} />
        <DomainProgress name="Relationships" progress={82} icon={<Users className="h-4 w-4" />} />
      </CardContent>
    </Card>
  );
};
