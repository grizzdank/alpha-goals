import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Archive, BarChart3 } from "lucide-react";
import { CurrentSprintView } from "@/components/sprint/CurrentSprintView";
import { SprintEdit } from "@/components/sprint/SprintEdit";
import { SprintArchive } from "@/components/sprint/SprintArchive";
import { AlphaScoreRecorder } from "@/components/sprint/AlphaScoreRecorder";
import { CreateSprintDialog } from "@/components/sprint/CreateSprintDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Sprint = () => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showAlphaScoreDialog, setShowAlphaScoreDialog] = useState(false);
  const [showCreateSprintDialog, setShowCreateSprintDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("current");
  
  const isArchivePage = location.pathname.includes('/archive');
  const title = isArchivePage ? "Sprint Archive" : "Sprints";

  useEffect(() => {
    if (location.state && location.state.showAlphaScoreDialog) {
      setShowAlphaScoreDialog(true);
      window.history.replaceState({}, document.title);
    }
    
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    // Check for tab query parameter
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateAlphaScore = () => {
    setShowAlphaScoreDialog(true);
  };

  const handleCreateNextSprint = () => {
    setShowCreateSprintDialog(true);
  };

  return (
    <Layout title={title}>
      <div className="max-w-7xl mx-auto animate-fade-in">
        {isArchivePage ? (
          <SprintArchive />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="current">Current Sprint</TabsTrigger>
                <TabsTrigger value="next">Next Sprint</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleUpdateAlphaScore}
                >
                  <BarChart3 className="h-4 w-4" />
                  Update Alpha Score
                </Button>
                <Link to="/sprints/archive">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Archive className="h-4 w-4" />
                    Sprint Archive
                  </Button>
                </Link>
              </div>
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
                  <CurrentSprintView 
                    onEdit={toggleEdit}
                    onUpdateAlphaScore={handleUpdateAlphaScore}
                  />
                  
                  <div className="glass rounded-xl md:rounded-2xl p-4 md:p-6 mt-4 md:mt-6 border border-muted/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-1">End of Sprint Approaching</h3>
                        <p className="text-muted-foreground text-sm">
                          Don't forget to update your Alpha Score to track your overall life performance.
                        </p>
                      </div>
                      <Button 
                        onClick={handleUpdateAlphaScore} 
                        className="md:flex-shrink-0"
                      >
                        Update Alpha Score
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="next" className="mt-0">
              <div className="glass rounded-xl md:rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Next Sprint Planning</h2>
                <p className="text-muted-foreground mb-6">
                  Plan your next 90-day focus period to continue making meaningful progress on your mission.
                </p>
                <Button onClick={handleCreateNextSprint}>Create Next Sprint</Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        <AlphaScoreRecorder 
          open={showAlphaScoreDialog} 
          onOpenChange={setShowAlphaScoreDialog}
        />
        
        <CreateSprintDialog
          open={showCreateSprintDialog}
          onOpenChange={setShowCreateSprintDialog}
        />
      </div>
    </Layout>
  );
};

export default Sprint;
