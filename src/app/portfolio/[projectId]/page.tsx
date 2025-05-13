
import { ApiProject } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

const RUST_API_URL = process.env.RUST_API_URL || 'http://localhost:8000';

async function getProjectById(projectId: string): Promise<ApiProject | null> {
  try {
    const res = await fetch(`${RUST_API_URL}/api/projects/${projectId}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`Failed to fetch project ${projectId} from Rust backend:`, res.status, await res.text());
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching project ${projectId} from Rust backend:`, error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = await getProjectById(params.projectId);

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
              {/* Using a div for long description as prose might not handle plain text well if it's not HTML */}
              <div dangerouslySetInnerHTML={{ __html: project.longDescription.replace(/\n/g, '<br />') }} />
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

// Helper function to generate static paths if using SSG
export async function generateStaticParams() {
  try {
    const res = await fetch(`${RUST_API_URL}/api/projects`);
    if (!res.ok) {
      console.error('Failed to fetch projects for static params from Rust backend:', res.status, await res.text());
      return [];
    }
    const projects: ApiProject[] = await res.json();
    return projects.map((project) => ({
      projectId: project.id,
    }));
  } catch (error) {
    console.error('Error fetching projects for static params from Rust backend:', error);
    return [];
  }
}
