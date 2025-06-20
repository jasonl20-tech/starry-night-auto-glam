
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
}

const BlogPreview = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, image_url, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.log('Fehler beim Laden der Blog-Posts:', error);
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            BLOG & NEUIGKEITEN
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bleiben Sie auf dem Laufenden mit unseren neuesten Artikeln und Einblicken
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Card key={post.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
                {post.image_url && (
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('de-DE')}
                    </span>
                    <Button variant="link" className="text-amber-300 hover:text-amber-200 p-0">
                      Weiterlesen <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-400 py-8">
              <p>Keine Blog-Posts verfügbar. Erstellen Sie Ihre ersten Artikel im Admin Panel.</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              Alle Artikel anzeigen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
