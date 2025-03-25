
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Archive } from "lucide-react";
import { CurrentSprint } from "@/components/mission/CurrentSprint";
import { SprintEdit } from "@/components/sprint/SprintEdit";
import { SprintArchive } from "@/components/sprint/SprintArchive";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Sprint = () => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  
  const isArchivePage = location.pathname.includes('/archive');
  const title = isArchivePage ? "Sprint Archive" : "Sprints";

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Layout title={title}>
      <div className="max-w-7xl mx-auto animate-fade-in">
        {isArchivePage ? (
          <SprintArchive />
        ) : (
          <Tabs defaultValue="current" className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="current">Current Sprint</TabsTrigger>
                <TabsTrigger value="next">Next Sprint</TabsTrigger>
              </TabsList>
              <Link to="/sprints/archive">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Archive className="h-4 w-4" />
                  Sprint Archive
                </Button>
              </Link>
            </div>

            <TabsContent value="current" className="mt-0">
              {isEditing ? (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Edit Current Sprint</h2>
                    <Button variant="outline" onClick={toggleEdit}>
                      Cancel
                    </Button>
                  </div>
                  <SprintEdit onComplete={toggleEdit} />
                </div>
              ) : (
                <div>
                  <CurrentSprint onEdit={toggleEdit} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="next" className="mt-0">
              <div className="glass rounded-xl md:rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Next Sprint Planning</h2>
                <p className="text-muted-foreground mb-6">
                  Plan your next 90-day focus period to continue making meaningful progress on your mission.
                </p>
                <Button>Create Next Sprint</Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Sprint;
