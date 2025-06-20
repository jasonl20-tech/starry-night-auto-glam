
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import PriceCalculator from '@/components/PriceCalculator';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <About />
        <PriceCalculator />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
