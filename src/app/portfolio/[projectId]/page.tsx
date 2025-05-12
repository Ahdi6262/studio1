
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

// Mock data - in a real app, this would be fetched based on params.projectId
const mockProjects: Project[] = [
  { id: '1', title: 'E-commerce Platform', description: 'A full-featured e-commerce platform with modern UI.', imageUrl: 'https://picsum.photos/seed/project1/800/500', tags: ['React', 'Node.js', 'MongoDB'], detailsUrl: '/portfolio/1', longDescription: 'This project is a comprehensive e-commerce solution designed for scalability and user experience. It features product listings, user authentication, shopping cart functionality, and an admin panel for managing products and orders. Built with a MERN stack, it leverages modern web technologies for optimal performance.', technologies: ['React', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API'], liveLink: '#', repoLink: '#', date: '2023-05-15' },
  { id: '2', title: 'Social Media App', description: 'A social networking app for connecting people.', imageUrl: 'https://picsum.photos/seed/project2/800/500', tags: ['Next.js', 'Firebase', 'TailwindCSS'], detailsUrl: '/portfolio/2', longDescription: 'A dynamic social media application enabling users to share updates, connect with friends, and discover new content. Features include real-time notifications, a news feed, user profiles, and direct messaging. The tech stack focuses on serverless architecture and real-time database capabilities.', technologies: ['Next.js', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'Vercel'], liveLink: '#', repoLink: '#', date: '2023-08-20' },
  { id: '3', title: 'Data Visualization Dashboard', description: 'An interactive dashboard for visualizing complex datasets.', imageUrl: 'https://picsum.photos/seed/project3/800/500', tags: ['D3.js', 'Python', 'Flask'], detailsUrl: '/portfolio/3', longDescription: 'This dashboard provides powerful tools for data analysis and visualization. Users can upload datasets, generate various chart types, and customize views to gain insights. The backend is built with Python and Flask, serving data to a D3.js-powered frontend.', technologies: ['D3.js', 'JavaScript', 'Python', 'Flask', 'Pandas'], liveLink: '#', repoLink: '#', date: '2022-11-10' },
  { id: '4', title: 'Mobile Game "Pixel Adventure"', description: 'A retro-style pixel art adventure game for mobile devices.', imageUrl: 'https://picsum.photos/seed/project4/800/500', tags: ['Unity', 'C#', 'Pixel Art'], detailsUrl: '/portfolio/4', longDescription: 'Pixel Adventure is an engaging 2D platformer game with a charming pixel art style. It features multiple levels, challenging enemies, and a unique storyline. Developed using Unity, it is optimized for both Android and iOS platforms.', technologies: ['Unity Engine', 'C#', 'Aseprite', 'Mobile Optimization'], liveLink: '#', repoLink: '#', date: '2024-01-05' },
];


export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = mockProjects.find(p => p.id === params.projectId);

  if (!project) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-destructive">Project not found</h1>
        <p className="text-muted-foreground">The project you are looking for does not exist or has been moved.</p>
        <Link href="/portfolio" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link href="/portfolio" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Portfolio
      </Link>

      <Card className="overflow-hidden bg-card">
        <CardHeader className="p-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1200}
            height={600}
            className="w-full object-cover max-h-[500px]"
            data-ai-hint="project detail image"
          />
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">{project.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mb-6">{project.description}</CardDescription>
          
          {project.date && <p className="text-sm text-muted-foreground mb-4">Published on: {new Date(project.date).toLocaleDateString()}</p>}

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map(tech => <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary px-3 py-1 text-sm">{tech}</Badge>)}
            </div>
          </div>
          
          {project.longDescription && (
            <div className="prose prose-invert max-w-none text-foreground/90 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">About this project:</h3>
              <p>{project.longDescription}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {project.liveLink && project.liveLink !== '#' && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  <ExternalLink className="mr-2 h-4 w-4" /> View Live Project
                </Button>
              </a>
            )}
            {project.repoLink && project.repoLink !== '#' && (
               <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Github className="mr-2 h-4 w-4" /> View Code Repository
                </Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
