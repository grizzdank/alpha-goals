
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { habitCompletionData } from "./HabitData";

export const HabitDetailsTable = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Habit Tracking Details</CardTitle>
        <CardDescription>Detailed breakdown of habit completion status and performance</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Habit</TableHead>
                <TableHead className="text-right">Completed</TableHead>
                <TableHead className="text-right">Missed</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {habitCompletionData.map((habit) => {
                const successRate = (habit.completed / (habit.completed + habit.missed)) * 100;
                const total = habit.completed + habit.missed;
                return (
                  <TableRow key={habit.habit}>
                    <TableCell className="font-medium">{habit.habit}</TableCell>
                    <TableCell className="text-right">{habit.completed}</TableCell>
                    <TableCell className="text-right">{habit.missed}</TableCell>
                    <TableCell className="text-right">{total}</TableCell>
                    <TableCell className="text-right">
                      <span 
                        className={`font-medium ${
                          successRate >= 80 ? "text-green-500" : 
                          successRate >= 60 ? "text-yellow-500" : 
                          "text-red-500"
                        }`}
                      >
                        {successRate.toFixed(0)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          successRate >= 80 ? "bg-green-100 text-green-800" : 
                          successRate >= 60 ? "bg-yellow-100 text-yellow-800" : 
                          "bg-red-100 text-red-800"
                        }`}
                      >
                        {successRate >= 80 ? "On Track" : 
                         successRate >= 60 ? "Need Focus" : 
                         "At Risk"}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
