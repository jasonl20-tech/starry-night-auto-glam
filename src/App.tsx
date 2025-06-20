
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Galerie from "./pages/Galerie";
import Blog from "./pages/Blog";
import Kontakt from "./pages/Kontakt";
import FAQPage from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/galerie" element={<Galerie />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
