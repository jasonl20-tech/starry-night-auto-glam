
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  created_at: string;
  author_id?: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Fehler beim Laden der Blog-Posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-900 text-white">
        <Navbar />
        <main className="pt-20">
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center">
                <div className="text-white">Lade Blog-Posts...</div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-white">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold text-stellar-300 mb-6">
                BLOG
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Entdecken Sie interessante Artikel, Tipps und Neuigkeiten 
                rund um Auto-Sternenhimmel und Luxus-Fahrzeugausstattung
              </p>
            </div>

            {blogPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="bg-midnight-800/50 border-stellar-400/30 hover:border-stellar-400/60 transition-all duration-300 group">
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
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center text-sm text-stellar-400 gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.created_at).toLocaleDateString('de-DE')}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-space-grotesk font-bold text-stellar-300 group-hover:text-stellar-200 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Button 
                        onClick={() => setSelectedPost(post)}
                        className="text-stellar-300 hover:text-stellar-200 font-poppins font-medium transition-colors bg-transparent p-0 h-auto"
                        variant="ghost"
                      >
                        Weiterlesen →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-stellar-300 mb-4">Noch keine Blog-Posts</h3>
                <p className="text-gray-300">
                  Schauen Sie bald wieder vorbei oder erstellen Sie Ihre ersten Artikel im Admin Panel.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Blog-Post Details Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-midnight-800 border-stellar-400/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-stellar-300 mb-4">
              {selectedPost?.title}
            </DialogTitle>
            <div className="flex items-center text-sm text-stellar-400 gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{selectedPost && new Date(selectedPost.created_at).toLocaleDateString('de-DE')}</span>
              </div>
            </div>
          </DialogHeader>
          
          {selectedPost?.image_url && (
            <div className="mb-6">
              <img
                src={selectedPost.image_url}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedPost?.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
