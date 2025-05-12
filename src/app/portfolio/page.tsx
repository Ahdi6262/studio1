
"use client";
import type { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const mockProjects: Project[] = [
  { id: '1', title: 'E-commerce Platform', description: 'A full-featured e-commerce platform with modern UI.', imageUrl: 'https://picsum.photos/seed/project1/600/400', tags: ['React', 'Node.js', 'MongoDB'], detailsUrl: '/portfolio/1' },
  { id: '2', title: 'Social Media App', description: 'A social networking app for connecting people.', imageUrl: 'https://picsum.photos/seed/project2/600/400', tags: ['Next.js', 'Firebase', 'TailwindCSS'], detailsUrl: '/portfolio/2' },
  { id: '3', title: 'Data Visualization Dashboard', description: 'An interactive dashboard for visualizing complex datasets.', imageUrl: 'https://picsum.photos/seed/project3/600/400', tags: ['D3.js', 'Python', 'Flask'], detailsUrl: '/portfolio/3' },
  { id: '4', title: 'Mobile Game "Pixel Adventure"', description: 'A retro-style pixel art adventure game for mobile devices.', imageUrl: 'https://picsum.photos/seed/project4/600/400', tags: ['Unity', 'C#', 'Pixel Art'], detailsUrl: '/portfolio/4' },
];

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  const allTags = Array.from(new Set(mockProjects.flatMap(p => p.tags)));

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'all' || project.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Our Portfolio</h1>
        <p className="text-lg text-muted-foreground">Explore the innovative projects crafted by our talented community.</p>
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
      
      {filteredProjects.length > 0 ? (
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
                <Link href={project.detailsUrl} className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
