
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConfigFormProps {
  className?: string;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ className }) => {
  const [formState, setFormState] = useState({
    repository: '',
    owner: '',
    token: '',
    apiKey: '',
    labels: '',
    skipTests: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="github" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="github" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="owner">Repository Owner</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">The GitHub username or organization name that owns the repository.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="owner"
                  name="owner"
                  placeholder="e.g., octocat"
                  value={formState.owner}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="repository">Repository Name</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">The name of the repository you want to monitor.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="repository"
                  name="repository"
                  placeholder="e.g., hello-world"
                  value={formState.repository}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="token">GitHub Token</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">A GitHub personal access token with repo scope permissions.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="token"
                  name="token"
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  value={formState.token}
                  onChange={handleChange}
                  required
                />
              </div>
            </TabsContent>
            
            <TabsContent value="openai" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="apiKey">OpenAI API Key</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Your OpenAI API key used for generating code solutions.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
                  value={formState.apiKey}
                  onChange={handleChange}
                  required
                />
              </div>
            </TabsContent>
            
            <TabsContent value="options" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="labels">Issue Labels (comma separated)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Filter issues by these labels. Leave empty to process all issues.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="labels"
                  name="labels"
                  placeholder="e.g., bug, performance, refactor"
                  value={formState.labels}
                  onChange={handleChange}
                />
              </div>
            </TabsContent>
            
            <div className="mt-8">
              <Button className="w-full" type="submit" disabled={formSubmitted}>
                {formSubmitted ? (
                  <span className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Configuration Saved
                  </span>
                ) : (
                  "Save Configuration"
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  );
};

export default ConfigForm;
