
import type { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock data - in a real app, this would be fetched based on params.slug
const mockBlogPosts: BlogPost[] = [
  { id: '1', slug: 'getting-started-with-nextjs-14', title: 'Getting Started with Next.js 14', summary: 'A comprehensive guide to setting up your first Next.js 14 project with App Router.', author: 'Admin User', authorAvatar: 'https://picsum.photos/seed/admin/40/40', date: '2024-07-20', imageUrl: 'https://picsum.photos/seed/blog1/1200/600', tags: ['Next.js', 'Web Development', 'JavaScript'], content: '<p>This is the full content for Getting Started with Next.js 14. It covers installation, project structure, creating pages with the App Router, and basic deployment tips. We delve into Server Components and Client Components, explaining their use cases and benefits.</p><p>Key topics include:</p><ul><li>Setting up a new Next.js project</li><li>Understanding the App Router</li><li>Creating layouts and pages</li><li>Fetching data with Server Components</li><li>Using Client Components for interactivity</li><li>Basic styling with Tailwind CSS</li><li>Deployment to Vercel</li></ul><p>This guide aims to provide a solid foundation for developers looking to leverage the power of Next.js 14 for their web applications.</p>' },
  { id: '2', slug: 'mastering-tailwind-css-techniques', title: 'Mastering Tailwind CSS: Advanced Techniques', summary: 'Unlock the full potential of Tailwind CSS with these advanced tips and tricks.', author: 'Community Writer', authorAvatar: 'https://picsum.photos/seed/writer1/40/40', date: '2024-07-18', imageUrl: 'https://picsum.photos/seed/blog2/1200/600', tags: ['TailwindCSS', 'CSS', 'Frontend'], content: '<p>Full content for Mastering Tailwind CSS...</p>' },
  { id: '3', slug: 'ai-in-modern-web-design', title: 'The Role of AI in Modern Web Design', summary: 'Explore how artificial intelligence is shaping the future of web design and user experience.', author: 'AI Enthusiast', authorAvatar: 'https://picsum.photos/seed/aiuser/40/40', date: '2024-07-15', imageUrl: 'https://picsum.photos/seed/blog3/1200/600', tags: ['AI', 'Web Design', 'UX'], content: '<p>Full content for AI in Modern Web Design...</p>' },
];

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts.find(p => p.slug === params.slug);

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
                <AvatarImage src={post.authorAvatar} alt={post.author} data-ai-hint="author avatar" />
                <AvatarFallback>{post.author.substring(0,1)}</AvatarFallback>
              </Avatar>
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>Published on {new Date(post.date).toLocaleDateString()}</span>
            </div>
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
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}
