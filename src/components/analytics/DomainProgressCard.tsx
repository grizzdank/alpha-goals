
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DomainProgress } from "./DomainProgress";

export const DomainProgressCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Progress</CardTitle>
        <CardDescription>Progress across all domains</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DomainProgress name="Mind" progress={85} />
        <DomainProgress name="Body" progress={65} />
        <DomainProgress name="Purpose" progress={78} />
        <DomainProgress name="Relationships" progress={70} />
      </CardContent>
    </Card>
  );
};
