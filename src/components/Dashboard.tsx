<lov-codelov-code>
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CircleOff, Loader2, RefreshCw, Search } from "lucide-react";
import IssueCard from './IssueCard';

interface DashboardProps {
  className?: string;
}

// Sample issue data
const SAMPLE_ISSUES = [
  {
    id: 1,
    title: "Fix inefficient loop in user authentication module",
    number: 42,
    status: 'completed' as const,
    repository: 'user-service',
    date: '2 hours ago'
  },
  {
    id: 2,
    title: "Memory leak in image processing pipeline",
    number: 51,
    status: 'processing' as const,
    repository: 'image-processor',
    date: '4 hours ago'
  },
  {
    id: 3,
    title: "Optimize database query for product search",
    number: 87,
    status: 'pending' as const,
    repository: 'catalog-service',
    date: '1 day ago'
  },
  {
    id: 4,
    title: "Fix race condition in concurrent task execution",
    number: 112,
    status: 'failed' as const,
    repository: 'task-scheduler',
    date: '2 days ago'
  },
  {
    id: 5,
    title: "Reduce bundle size by tree-shaking unused dependencies",
    number: 118,
    status: 'pending' as const,
    repository: 'web-client',
    date: '3 days ago'
  },
  {
    id: 6,
    title: "Implement pagination for API responses to improve performance",
    number: 134,
    status: 'completed' as const,
    repository: 'api-gateway',
    date: '5 days ago'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [issues, setIssues] = useState(SAMPLE_ISSUES);
  const [activeTab, setActiveTab] = useState('all');

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const filteredIssues = issues.filter(issue => {
    // Filter by search query
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase())) {
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
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </div>
      
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
              {filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  title={issue.title}
                  number={issue.number}
                  status={issue.status}
                  repository={issue.repository}
                  date={issue.date}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CircleOff className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No matching issues found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filters
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
</lov-code>
