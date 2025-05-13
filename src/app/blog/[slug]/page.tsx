
import type { ApiBlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const RUST_API_URL = process.env.RUST_API_URL || 'http://localhost:8000';

async function getPostBySlug(slug: string): Promise<ApiBlogPost | null> {
  try {
    const res = await fetch(`${RUST_API_URL}/api/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`Failed to fetch post ${slug} from Rust backend:`, res.status, await res.text());
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching post ${slug} from Rust backend:`, error);
    return null;
  }
}

export default async function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-destructive">Post not found</h1>
        <p className="text-muted-foreground">The blog post you are looking for does not exist or has been moved.</p>
        <Link href="/blog" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <Card className="overflow-hidden bg-card">
        <CardHeader className="p-0">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full object-cover max-h-[500px]"
            data-ai-hint="blog post detail image"
          />
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</CardTitle>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="author avatar" />
                <AvatarFallback>{post.author.name.substring(0,1)}</AvatarFallback>
              </Avatar>
              <span>By {post.author.name}</span>
            </div>
            {post.publishedAt && (
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>Published on {new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {post.tags && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary">{tag}</Badge>)}
            </div>
          )}

          {post.content && (
            <div 
              className="prose prose-invert max-w-none text-foreground/90 
                         prose-headings:text-foreground prose-p:text-foreground/90 
                         prose-strong:text-foreground prose-a:text-primary 
                         prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                         prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to generate static paths if using SSG
export async function generateStaticParams() {
  try {
    const res = await fetch(`${RUST_API_URL}/api/posts`);
    if (!res.ok) {
      console.error('Failed to fetch posts for static params from Rust backend:', res.status, await res.text());
      return [];
    }
    const posts: ApiBlogPost[] = await res.json();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error fetching posts for static params from Rust backend:', error);
    return [];
  }
}
