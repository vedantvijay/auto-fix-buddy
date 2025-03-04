
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CircleOff, Loader2, RefreshCw, Search, Play } from "lucide-react";
import IssueCard from './IssueCard';
import { processorService, ProcessingResult } from '../services/processor';
import { configService } from '../services/config';
import { toast } from 'sonner';

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [issues, setIssues] = useState<ProcessingResult[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if services are configured
    setIsConfigured(configService.isConfigured());
    
    // Load existing results
    const results = processorService.getResults();
    setIssues(results);
  }, []);

  const handleRefresh = async () => {
    if (!isConfigured) {
      toast.error("Please configure GitHub and Gemini settings first");
      return;
    }
    
    setRefreshing(true);
    
    try {
      const results = await processorService.refreshIssues();
      setIssues(results);
      toast.success("Issues refreshed successfully");
    } catch (error) {
      console.error('Error refreshing issues:', error);
      toast.error(`Failed to refresh issues: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setRefreshing(false);
    }
  };

  const handleProcessIssue = async (issueId: number) => {
    if (!isConfigured) {
      toast.error("Please configure GitHub and Gemini settings first");
      return;
    }
    
    try {
      // Find the issue in the list
      const issueIndex = issues.findIndex(issue => issue.issue.id === issueId);
      
      if (issueIndex === -1) {
        toast.error("Issue not found");
        return;
      }
      
      // Update the issue status to processing
      const updatedIssues = [...issues];
      updatedIssues[issueIndex] = {
        ...updatedIssues[issueIndex],
        status: 'processing'
      };
      
      setIssues(updatedIssues);
      
      // Process the issue
      const result = await processorService.processIssue(issueId);
      
      // Update the issues list
      setIssues(prev => {
        const newIssues = [...prev];
        const index = newIssues.findIndex(issue => issue.issue.id === issueId);
        
        if (index !== -1) {
          newIssues[index] = result;
        }
        
        return newIssues;
      });
      
      // Show success or error message
      if (result.status === 'completed') {
        toast.success(`Successfully processed issue #${result.issue.number}`);
      } else if (result.status === 'failed') {
        toast.error(`Failed to process issue #${result.issue.number}: ${result.error}`);
      }
    } catch (error) {
      console.error('Error processing issue:', error);
      toast.error(`Failed to process issue: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const filteredIssues = issues.filter(issue => {
    // Filter by search query
    if (searchQuery && !issue.issue.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab !== 'all' && issue.status !== activeTab) {
      return false;
    }
    
    return true;
  });

  return (
    <div className={cn("", className)}>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleRefresh}
          disabled={refreshing || !isConfigured}
          title={isConfigured ? "Refresh issues" : "Configure settings first"}
        >
          {refreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {!isConfigured && (
        <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-md p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-200">
            Please configure your GitHub repository and Gemini API settings before using the dashboard.
          </p>
        </div>
      )}
      
      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 md:w-fit mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredIssues.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredIssues.map((result) => (
                <div key={result.issue.id} className="relative">
                  <IssueCard
                    title={result.issue.title}
                    number={result.issue.number}
                    status={result.status}
                    repository={result.issue.repository?.name || "Unknown"}
                    date={result.date}
                  />
                  
                  {result.status === 'pending' && isConfigured && (
                    <Button
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleProcessIssue(result.issue.id)}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Process
                    </Button>
                  )}
                  
                  {result.status === 'completed' && result.pullRequest && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => window.open(result.pullRequest?.html_url, '_blank')}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      View PR
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CircleOff className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No matching issues found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isConfigured 
                  ? "Try adjusting your search or filters, or click the refresh button to fetch issues"
                  : "Please configure your GitHub and Gemini settings first"}
              </p>
            </div>
          )}
        </TabsContent>
        
        {/* Other tab contents will be automatically handled by the activeTab filter */}
        <TabsContent value="pending" />
        <TabsContent value="processing" />
        <TabsContent value="completed" />
      </Tabs>
    </div>
  );
};

export default Dashboard;
