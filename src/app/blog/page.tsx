
import type { ApiBlogPost } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

const RUST_API_URL = process.env.RUST_API_URL || 'http://localhost:8000';

async function getBlogPosts(): Promise<ApiBlogPost[]> {
  try {
    const res = await fetch(`${RUST_API_URL}/api/posts`, { cache: 'no-store' }); // Fetch from Rust backend
    if (!res.ok) {
      console.error('Failed to fetch posts from Rust backend:', res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching posts from Rust backend:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Our Blog</h1>
        <p className="text-lg text-muted-foreground">Insights, tutorials, and updates from the HEX THE ADD HUB team and community (data from Rust API).</p>
      </section>

      {posts.length === 0 && (
        <p className="text-center text-muted-foreground">No blog posts available at the moment. Check back soon!</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden bg-card hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader className="p-0">
              <Link href={`/blog/${post.slug}`}>
                <Image 
                  src={post.imageUrl} 
                  alt={post.title} 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-48 cursor-pointer"
                  data-ai-hint="blog post image"
                />
              </Link>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              {post.tags && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {post.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary text-xs">{tag}</Badge>)}
                </div>
              )}
              <Link href={`/blog/${post.slug}`}>
                <CardTitle className="text-xl font-semibold mb-2 text-foreground hover:text-primary transition-colors">{post.title}</CardTitle>
              </Link>
              <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">{post.summary}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex flex-col items-start space-y-3">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="author avatar" />
                  <AvatarFallback>{post.author.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
                {post.publishedAt && (
                  <>
                    <span className="mx-1">·</span>
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
              <Link href={`/blog/${post.slug}`} className="w-full">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
