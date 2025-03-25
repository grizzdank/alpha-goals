
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { habitCompletionData } from "./HabitData";

export const HabitDetailsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Tracking Details</CardTitle>
        <CardDescription>Detailed breakdown of habit completion</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Habit</TableHead>
              <TableHead className="text-right">Completed</TableHead>
              <TableHead className="text-right">Missed</TableHead>
              <TableHead className="text-right">Success Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {habitCompletionData.map((habit) => (
              <TableRow key={habit.habit}>
                <TableCell className="font-medium">{habit.habit}</TableCell>
                <TableCell className="text-right">{habit.completed}</TableCell>
                <TableCell className="text-right">{habit.missed}</TableCell>
                <TableCell className="text-right">
                  {((habit.completed / (habit.completed + habit.missed)) * 100).toFixed(0)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
