
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfigForm from '@/components/ConfigForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();

  const handleConfigSaved = () => {
    toast.success("Configuration saved successfully");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Configuration</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Configure your GitHub repository and Gemini API settings
              </p>
            </div>
            
            <ConfigForm onConfigSaved={handleConfigSaved} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
