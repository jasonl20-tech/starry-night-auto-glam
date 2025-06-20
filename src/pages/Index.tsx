
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GalleryPreview from '@/components/GalleryPreview';
import CarSelector from '@/components/CarSelector';
import About from '@/components/About';
import BeforeAfter from '@/components/BeforeAfter';
import PriceCalculator from '@/components/PriceCalculator';
import ComparisonTable from '@/components/ComparisonTable';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import SocialProof from '@/components/SocialProof';
import UrgencyBanner from '@/components/UrgencyBanner';
import BlogPreview from '@/components/BlogPreview';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import ScrollAnimations from '@/components/ScrollAnimations';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <ScrollAnimations />
      <LiveChat />
      <main className="pt-20">
        <Hero />
        <SocialProof />
        <GalleryPreview />
        <CarSelector />
        <About />
        <BeforeAfter />
        <PriceCalculator />
        <ComparisonTable />
        <Testimonials />
        <UrgencyBanner />
        <FAQ />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
