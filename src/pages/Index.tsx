
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GalleryPreview from '@/components/GalleryPreview';
import About from '@/components/About';
import VideoPreview from '@/components/VideoPreview';
import PriceCalculator from '@/components/PriceCalculator';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import SocialProof from '@/components/SocialProof';
import BlogPreview from '@/components/BlogPreview';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
      <Navbar />
      <LiveChat />
      <main className="w-full">
        <Hero />
        <div className="px-4 sm:px-6 lg:px-8">
          <SocialProof />
          <About />
          <GalleryPreview />
          <VideoPreview />
          <PriceCalculator />
          <Testimonials />
          <FAQ />
          <BlogPreview />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
