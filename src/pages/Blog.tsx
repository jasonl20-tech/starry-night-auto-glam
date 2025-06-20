
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Die Zukunft der Fahrzeugbeleuchtung',
      excerpt: 'Erfahren Sie mehr über die neuesten Trends in der Automobilbeleuchtung und wie Sternenhimmel die Zukunft prägen.',
      date: '15. März 2024',
      category: 'Technologie'
    },
    {
      id: 2,
      title: 'Pflege und Wartung Ihres Sternenhimmels',
      excerpt: 'Wichtige Tipps zur optimalen Pflege Ihres Auto-Sternenhimmels für langanhaltende Schönheit.',
      date: '10. März 2024',
      category: 'Ratgeber'
    },
    {
      id: 3,
      title: 'Luxus-Ausstattung: Was macht den Unterschied?',
      excerpt: 'Warum hochwertige Materialien und professionelle Installation den Unterschied ausmachen.',
      date: '5. März 2024',
      category: 'Luxus'
    },
    {
      id: 4,
      title: 'Kundengeschichten: Traumhafte Transformationen',
      excerpt: 'Lesen Sie inspirierende Geschichten unserer Kunden und ihre Erfahrungen mit unserem Service.',
      date: '1. März 2024',
      category: 'Erfahrungen'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gold-400 mb-6">
                BLOG
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entdecken Sie interessante Artikel, Tipps und Neuigkeiten 
                rund um Auto-Sternenhimmel und Luxus-Fahrzeugausstattung
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-gray-900/50 border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gold-400 font-rajdhani font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-400">
                        {post.date}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-orbitron font-bold text-gold-400 group-hover:text-gold-300 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <button className="text-gold-400 hover:text-gold-300 font-rajdhani font-medium transition-colors">
                      Weiterlesen →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
