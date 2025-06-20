
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GalleryPreview from '@/components/GalleryPreview';
import About from '@/components/About';
import PriceCalculator from '@/components/PriceCalculator';
import BlogPreview from '@/components/BlogPreview';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <GalleryPreview />
        <About />
        <PriceCalculator />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
