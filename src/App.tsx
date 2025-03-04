
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import { AppProvider } from './contexts/AppContext';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="autopr-theme">
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
