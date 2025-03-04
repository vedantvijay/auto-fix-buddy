
import React, { createContext, useContext, useEffect, useState } from 'react';
import { configService } from '../services/config';
import { processorService, ProcessingResult } from '../services/processor';

interface AppContextType {
  isConfigured: boolean;
  issues: ProcessingResult[];
  refreshIssues: () => Promise<void>;
  processIssue: (issueId: number) => Promise<void>;
  refreshing: boolean;
}

const AppContext = createContext<AppContextType>({
  isConfigured: false,
  issues: [],
  refreshIssues: async () => {},
  processIssue: async () => {},
  refreshing: false
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [issues, setIssues] = useState<ProcessingResult[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsConfigured(configService.isConfigured());
    setIssues(processorService.getResults());
  }, []);

  const refreshIssues = async () => {
    if (!isConfigured) {
      throw new Error("Configuration not set");
    }
    
    setRefreshing(true);
    
    try {
      const results = await processorService.refreshIssues();
      setIssues(results);
      return;
    } catch (error) {
      console.error('Error refreshing issues:', error);
      throw error;
    } finally {
      setRefreshing(false);
    }
  };

  const processIssue = async (issueId: number) => {
    if (!isConfigured) {
      throw new Error("Configuration not set");
    }
    
    try {
      // Update the issue status in state
      setIssues(prev => {
        const newIssues = [...prev];
        const index = newIssues.findIndex(issue => issue.issue.id === issueId);
        
        if (index !== -1) {
          newIssues[index] = {
            ...newIssues[index],
            status: 'processing'
          };
        }
        
        return newIssues;
      });
      
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
    } catch (error) {
      console.error('Error processing issue:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{
      isConfigured,
      issues,
      refreshIssues,
      processIssue,
      refreshing
    }}>
      {children}
    </AppContext.Provider>
  );
};
