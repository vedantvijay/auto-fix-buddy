
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { configService } from '../services/config';
import { toast } from 'sonner';

interface ConfigFormProps {
  className?: string;
  onConfigSaved?: () => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ className, onConfigSaved }) => {
  const [formState, setFormState] = useState({
    repository: '',
    owner: '',
    token: '',
    apiKey: '',
    labels: '',
    skipTests: false,
    branchPrefix: 'autopr-fix-',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load config on mount
  useEffect(() => {
    const config = configService.getConfig();
    setFormState({
      repository: config.github.repository,
      owner: config.github.owner,
      token: config.github.token,
      apiKey: config.gemini.apiKey,
      labels: config.options.labels.join(', '),
      skipTests: config.options.skipTests,
      branchPrefix: config.options.branchPrefix,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save config
    configService.updateConfig({
      github: {
        repository: formState.repository,
        owner: formState.owner,
        token: formState.token,
      },
      gemini: {
        apiKey: formState.apiKey,
      },
      options: {
        labels: formState.labels.split(',').map(label => label.trim()).filter(Boolean),
        skipTests: formState.skipTests,
        branchPrefix: formState.branchPrefix,
      }
    });
    
    // Show success
    setFormSubmitted(true);
    toast.success("Configuration saved successfully");
    
    setTimeout(() => {
      setFormSubmitted(false);
      if (onConfigSaved) {
        onConfigSaved();
      }
    }, 2000);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="github" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="gemini">Gemini</TabsTrigger>
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
            
            <TabsContent value="gemini" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="apiKey">Gemini API Key</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Your Google Gemini API key used for generating code solutions.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="branchPrefix">Branch Prefix</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Prefix to use for branches created by AutoPR.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="branchPrefix"
                  name="branchPrefix"
                  placeholder="e.g., autopr-fix-"
                  value={formState.branchPrefix}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="skipTests"
                  checked={formState.skipTests}
                  onCheckedChange={(checked) => handleSwitchChange(checked, "skipTests")}
                />
                <Label htmlFor="skipTests">Skip tests for generated code</Label>
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
