
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BlogPreview = () => {
  const recentPosts = [
    {
      id: 1,
      title: 'Die Zukunft der Fahrzeugbeleuchtung',
      excerpt: 'Erfahren Sie mehr über die neuesten Trends in der Automobilbeleuchtung...',
      date: '15. März 2024'
    },
    {
      id: 2,
      title: 'Pflege und Wartung Ihres Sternenhimmels',
      excerpt: 'Wichtige Tipps zur optimalen Pflege für langanhaltende Schönheit...',
      date: '10. März 2024'
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-stellar-300 mb-4">
            AKTUELLES AUS UNSEREM BLOG
          </h2>
          <p className="text-lg text-gray-300">
            Interessante Artikel und Tipps rund um Auto-Sternenhimmel
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {recentPosts.map((post) => (
            <Card key={post.id} className="bg-midnight-800/30 border-stellar-400/20 hover:border-stellar-400/40 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-400">
                    {post.date}
                  </span>
                </div>
                <CardTitle className="text-xl font-space-grotesk font-semibold text-stellar-300">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <button className="text-stellar-300 hover:text-stellar-200 font-poppins font-medium transition-colors">
                  Weiterlesen →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button className="bg-stellar-500 hover:bg-stellar-600 text-midnight-900 font-poppins font-semibold">
              Alle Blog-Artikel ansehen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
