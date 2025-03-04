
import React, { useEffect } from 'react';
import { usePreventAnimationOnLoad } from '@/lib/animations';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cog, Database, GitPullRequest, LineChart, Lock, Workflow } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import FeatureCard from '@/components/features/FeatureCard';
import ProcessSteps from '@/components/ProcessSteps';
import ConfigForm from '@/components/ConfigForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  // Prevent animations on initial load
  usePreventAnimationOnLoad();

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fadeIn">
              Automate your GitHub issue resolution
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fadeIn animation-delay-100">
              Resolve GitHub issues <br className="hidden md:inline" />
              <span className="text-primary">automatically with AI</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-fadeIn animation-delay-200">
              AutoPR leverages AI to fix common code issues, test solutions, 
              and submit pull requests without manual intervention.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animation-delay-300">
              <Button size="lg" className="gap-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Code snippet preview (abstract visualization) */}
        <div className="max-w-4xl mx-auto mt-16 px-4 animate-fadeIn animation-delay-400">
          <div className="rounded-xl overflow-hidden shadow-2xl border bg-card backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-muted-foreground">
                autopr-solution.js
              </div>
              <div className="w-16" />
            </div>
            
            <div className="p-4 text-sm font-mono overflow-x-auto text-left">
              <pre className="language-javascript">
                <div className="text-muted-foreground">// Before: Inefficient loop implementation</div>
                <div className="line-through opacity-50">for (let i = 0; i &lt; items.length; i++) {'{'}</div>
                <div className="line-through opacity-50">  const item = items[i];</div>
                <div className="line-through opacity-50">  if (item.value &gt; threshold) {'{'}</div>
                <div className="line-through opacity-50">    results.push(processItem(item));</div>
                <div className="line-through opacity-50">  {'}'}</div>
                <div className="line-through opacity-50">{'}'}</div>
                <div className="text-muted-foreground mt-2">// After: Optimized with filter and map</div>
                <div className="text-green-500 dark:text-green-400">const results = items</div>
                <div className="text-green-500 dark:text-green-400">  .filter(item =&gt; item.value &gt; threshold)</div>
                <div className="text-green-500 dark:text-green-400">  .map(processItem);</div>
              </pre>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-accent/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AutoPR comes with everything you need to streamline your GitHub workflow
              and eliminate repetitive code fixes.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="GitHub Integration"
              description="Seamlessly connect with GitHub repositories to identify and fix issues automatically."
              icon={<GitPullRequest className="h-6 w-6" />}
              className="animate-fadeIn"
            />
            <FeatureCard
              title="AI-Powered Solutions"
              description="Leverage OpenAI's powerful models to generate optimal code fixes for common problems."
              icon={<Code className="h-6 w-6" />}
              className="animate-fadeIn animation-delay-100"
            />
            <FeatureCard
              title="Automated Testing"
              description="Every solution is automatically tested in a sandbox environment to ensure quality."
              icon={<Workflow className="h-6 w-6" />}
              className="animate-fadeIn animation-delay-200"
            />
            <FeatureCard
              title="Secure By Design"
              description="Your code and API keys are handled securely with industry-standard encryption."
              icon={<Lock className="h-6 w-6" />}
              className="animate-fadeIn animation-delay-300"
            />
            <FeatureCard
              title="Scalable Architecture"
              description="BullMQ queue ensures efficient processing of multiple issues without overwhelming systems."
              icon={<LineChart className="h-6 w-6" />}
              className="animate-fadeIn animation-delay-400"
            />
            <FeatureCard
              title="Historical Analytics"
              description="Track and analyze past fixes with MongoDB integration for continuous improvement."
              icon={<Database className="h-6 w-6" />}
              className="animate-fadeIn animation-delay-500"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process takes you from issues to solutions with minimal effort
            </p>
          </div>
          
          <ProcessSteps />
        </div>
      </section>
      
      {/* Configuration Section */}
      <section id="configuration" className="py-16 md:py-24 bg-accent/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Configuration</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Set up your repository and API connections in minutes
            </p>
          </div>
          
          <ConfigForm />
        </div>
      </section>
      
      {/* Dashboard Section */}
      <section id="dashboard" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dashboard</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor your issue resolution progress in real-time
            </p>
          </div>
          
          <Dashboard />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to automate your issue resolution?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get started with AutoPR today and let AI handle the repetitive fixes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
