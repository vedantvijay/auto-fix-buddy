
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Issue Dashboard</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Monitor and process GitHub issues with AI assistance
              </p>
            </div>
            
            <Dashboard />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
