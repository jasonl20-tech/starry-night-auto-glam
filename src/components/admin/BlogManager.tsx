
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Trash2, Edit, Plus } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  published: boolean;
  created_at: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Fehler beim Laden der Blog-Posts');
    } else {
      setPosts(data || []);
    }
  };

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.content) {
      toast.error('Titel und Inhalt sind erforderlich');
      return;
    }

    const postData = {
      title: currentPost.title,
      content: currentPost.content,
      excerpt: currentPost.excerpt || '',
      image_url: currentPost.image_url || '',
      published: currentPost.published || false,
    };

    let error;
    if (currentPost.id) {
      ({ error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', currentPost.id));
    } else {
      ({ error } = await supabase
        .from('blog_posts')
        .insert([postData]));
    }

    if (error) {
      toast.error('Fehler beim Speichern');
    } else {
      toast.success('Blog-Post gespeichert');
      setIsEditing(false);
      setCurrentPost({});
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Post löschen möchten?')) {
      return;
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Fehler beim Löschen');
    } else {
      toast.success('Blog-Post gelöscht');
      fetchPosts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Blog Verwaltung</h2>
        <Button
          onClick={() => {
            setCurrentPost({});
            setIsEditing(true);
          }}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neuer Post
        </Button>
      </div>

      {isEditing && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {currentPost.id ? 'Post bearbeiten' : 'Neuer Post'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Titel</Label>
              <Input
                value={currentPost.title || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Kurzbeschreibung</Label>
              <Input
                value={currentPost.excerpt || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Bild URL</Label>
              <Input
                value={currentPost.image_url || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, image_url: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Inhalt</Label>
              <Textarea
                value={currentPost.content || ''}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={currentPost.published || false}
                onCheckedChange={(checked) => setCurrentPost({ ...currentPost, published: checked })}
              />
              <Label className="text-gray-300">Veröffentlicht</Label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Speichern
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentPost({});
                }}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">{post.title}</CardTitle>
                  <p className="text-gray-400 text-sm mt-1">{post.excerpt}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(post.created_at).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setCurrentPost(post);
                      setIsEditing(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs ${
                  post.published 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {post.published ? 'Veröffentlicht' : 'Entwurf'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
