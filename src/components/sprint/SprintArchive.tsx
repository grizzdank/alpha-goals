
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

export function SprintArchive() {
  // Sample sprint history - in a real app, this would come from a database
  const sprintHistory = [
    {
      id: "1",
      name: "Q2 2023 - Foundation Building",
      startDate: "2023-04-01",
      endDate: "2023-06-30",
      description: "Focused on establishing the basic habits and routines for success",
      progress: 100,
    },
    {
      id: "2",
      name: "Q1 2023 - Research & Planning",
      startDate: "2023-01-01",
      endDate: "2023-03-31",
      description: "Research phase to determine priorities and direction",
      progress: 100,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Sprint Archive</CardTitle>
          <CardDescription>Review your previous 90-day sprints and track long-term progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sprintHistory.map((sprint) => (
              <Card key={sprint.id} className="bg-white/40 dark:bg-gray-800/40 border-white/30">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{sprint.name}</h3>
                    <div className="h-8 w-8 rounded-full bg-relationships/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-relationships" />
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span>{new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-sm mb-3">{sprint.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium bg-green-600/20 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                      Completed
                    </span>
                    <Link to={`/sprints/detail/${sprint.id}`} className="text-primary text-sm flex items-center">
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6">
            <Link to="/sprints" className="text-primary flex items-center">
              <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
              Back to Current Sprint
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
