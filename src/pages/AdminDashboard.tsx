
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Image, FileText, HelpCircle, DollarSign, Users, Phone, Camera } from 'lucide-react';
import BlogManager from '@/components/admin/BlogManager';
import FAQManager from '@/components/admin/FAQManager';
import PricingManager from '@/components/admin/PricingManager';
import GalleryManager from '@/components/admin/GalleryManager';
import ContactManager from '@/components/admin/ContactManager';
import UserManager from '@/components/admin/UserManager';
import HeroImageManager from '@/components/admin/HeroImageManager';

const AdminDashboard = () => {
  const { user, isAdmin, signOut } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="border-b border-gray-700 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-amber-300">Admin Dashboard</h1>
          <Button
            onClick={signOut}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full sm:w-auto"
          >
            Abmelden
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <Tabs defaultValue="hero" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-7 bg-gray-800 min-w-max">
              <TabsTrigger value="hero" className="flex items-center gap-2 px-2 sm:px-4">
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Hero</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2 px-2 sm:px-4">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Galerie</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-2 px-2 sm:px-4">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center gap-2 px-2 sm:px-4">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Preise</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2 px-2 sm:px-4">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2 px-2 sm:px-4">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Kontakt</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2 px-2 sm:px-4">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Nutzer</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hero">
            <HeroImageManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingManager />
          </TabsContent>

          <TabsContent value="faq">
            <FAQManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
