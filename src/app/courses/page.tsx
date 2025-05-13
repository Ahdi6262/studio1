
"use client";
import type { ApiCourse } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Search, Filter, GraduationCap, Loader2 } from 'lucide-react';
import CourseRecommendations from '@/components/features/CourseRecommendations';
import { useState, useEffect } from 'react';

const RUST_API_URL = process.env.NEXT_PUBLIC_RUST_API_URL || 'http://localhost:8000';

async function getCoursesFromApi(): Promise<ApiCourse[]> {
  try {
    const res = await fetch(`${RUST_API_URL}/api/courses`, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch courses from Rust backend:', res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching courses from Rust backend:', error);
    return [];
  }
}

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<ApiCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  
  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      setError(null);
      try {
        const courses = await getCoursesFromApi();
        setAllCourses(courses);
      } catch (e) {
        setError("Failed to load courses.");
        console.error(e);
      }
      setIsLoading(false);
    }
    loadCourses();
  }, []);

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const allCategories = Array.from(new Set(allCourses.map(c => c.category).filter(Boolean)));
  const allLevels = Array.from(new Set(allCourses.map(c => c.level).filter(Boolean)));
  
  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Explore Our Courses</h1>
        <p className="text-lg text-muted-foreground">Unlock your potential with our diverse range of expert-led courses.</p>
      </section>

      <CourseRecommendations />
      
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground">All Courses</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card rounded-lg shadow">
          <div className="relative flex-grow">
            <Input 
              type="search" 
              placeholder="Search courses..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="relative flex-grow md:max-w-xs">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full pl-10">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="relative flex-grow md:max-w-xs">
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full pl-10">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                 {allLevels.map(lvl => (
                  <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Loading courses...</p>
          </div>
        )}

        {error && !isLoading && (
           <div className="text-center py-10 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredCourses.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col overflow-hidden bg-card hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <CardHeader className="p-0 relative">
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title} 
                    width={600} 
                    height={300} 
                    className="object-cover w-full h-48"
                    data-ai-hint="course thumbnail" 
                  />
                  {course.price && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1">
                      {course.price}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-xl font-semibold mb-2 text-foreground">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-1">By {course.authorName}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                    {course.rating && (
                      <span className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" /> {course.rating}
                      </span>
                    )}
                    {course.studentCount && (
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" /> {course.studentCount.toLocaleString()} students
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">{course.description}</p>
                   <div className="flex flex-wrap gap-1">
                    {course.category && <Badge variant="outline" className="text-xs border-primary/50 text-primary/80">{course.category}</Badge>}
                    {course.level && <Badge variant="outline" className="text-xs border-primary/50 text-primary/80">{course.level}</Badge>}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/courses/${course.id}`} className="w-full">
                    <Button variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      View Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        {!isLoading && !error && filteredCourses.length === 0 && (
           <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No courses found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}
