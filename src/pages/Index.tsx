
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GalleryPreview from '@/components/GalleryPreview';
import About from '@/components/About';
import PriceCalculator from '@/components/PriceCalculator';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import SocialProof from '@/components/SocialProof';
import UrgencyBanner from '@/components/UrgencyBanner';
import BlogPreview from '@/components/BlogPreview';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <LiveChat />
      <main>
        <Hero />
        <SocialProof />
        <About />
        <GalleryPreview />
        <PriceCalculator />
        <Testimonials />
        <FAQ />
        <UrgencyBanner />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
