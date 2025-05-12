
import type { BlogPost } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle } from 'lucide-react';

const mockBlogPosts: BlogPost[] = [
  { id: '1', slug: 'getting-started-with-nextjs-14', title: 'Getting Started with Next.js 14', summary: 'A comprehensive guide to setting up your first Next.js 14 project with App Router.', author: 'Admin User', authorAvatar: 'https://picsum.photos/seed/admin/40/40', date: '2024-07-20', imageUrl: 'https://picsum.photos/seed/blog1/600/400', tags: ['Next.js', 'Web Development', 'JavaScript'] },
  { id: '2', slug: 'mastering-tailwind-css-techniques', title: 'Mastering Tailwind CSS: Advanced Techniques', summary: 'Unlock the full potential of Tailwind CSS with these advanced tips and tricks.', author: 'Community Writer', authorAvatar: 'https://picsum.photos/seed/writer1/40/40', date: '2024-07-18', imageUrl: 'https://picsum.photos/seed/blog2/600/400', tags: ['TailwindCSS', 'CSS', 'Frontend'] },
  { id: '3', slug: 'ai-in-modern-web-design', title: 'The Role of AI in Modern Web Design', summary: 'Explore how artificial intelligence is shaping the future of web design and user experience.', author: 'AI Enthusiast', authorAvatar: 'https://picsum.photos/seed/aiuser/40/40', date: '2024-07-15', imageUrl: 'https://picsum.photos/seed/blog3/600/400', tags: ['AI', 'Web Design', 'UX'] },
];

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Our Blog</h1>
        <p className="text-lg text-muted-foreground">Insights, tutorials, and updates from the HEX THE ADD HUB team and community.</p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogPosts.map((post) => (
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
                  <AvatarImage src={post.authorAvatar} alt={post.author} data-ai-hint="author avatar" />
                  <AvatarFallback>{post.author.substring(0,1)}</AvatarFallback>
                </Avatar>
                <span>{post.author}</span>
                <span className="mx-1">·</span>
                <CalendarDays className="h-3 w-3 mr-1" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
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
