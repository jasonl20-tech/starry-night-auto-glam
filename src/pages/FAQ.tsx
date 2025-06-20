
import React from 'react';
import Navbar from '@/components/Navbar';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="pt-20">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
