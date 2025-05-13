
"use client";
import type { ApiProject } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const RUST_API_URL = process.env.NEXT_PUBLIC_RUST_API_URL || 'http://localhost:8000';

async function getProjectsFromApi(): Promise<ApiProject[]> {
  try {
    const res = await fetch(`${RUST_API_URL}/api/projects`, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch projects from Rust backend:', res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching projects from Rust backend:', error);
    return [];
  }
}


export default function PortfolioPage() {
  const [allProjects, setAllProjects] = useState<ApiProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  
  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      setError(null);
      try {
        const projects = await getProjectsFromApi();
        setAllProjects(projects);
      } catch (e) {
        setError("Failed to load projects.");
        console.error(e);
      }
      setIsLoading(false);
    }
    loadProjects();
  }, []);


  const allTags = Array.from(new Set(allProjects.flatMap(p => p.tags)));

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'all' || project.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Our Portfolio</h1>
        <p className="text-lg text-muted-foreground">Explore the innovative projects crafted by our talented community (data from Rust API).</p>
      </section>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow">
          <Input 
            type="search" 
            placeholder="Search projects..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="relative flex-grow md:max-w-xs">
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-full pl-10">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Loading projects...</p>
          </div>
      )}
      {error && !isLoading && (
           <div className="text-center py-10 text-destructive">
            <p>{error}</p>
          </div>
      )}

      {!isLoading && !error && filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden bg-card hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader className="p-0">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-48"
                  data-ai-hint="project image" 
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2 text-foreground">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary">{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/portfolio/${project.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !isLoading && !error && <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
