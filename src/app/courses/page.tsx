
"use client";
import type { Course } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Search, Filter, GraduationCap } from 'lucide-react';
import CourseRecommendations from '@/components/features/CourseRecommendations';
import { useState } from 'react';

const mockCourses: Course[] = [
  { id: '1', title: 'Advanced Web Development Bootcamp', description: 'Master modern web technologies including React, Node.js, and GraphQL.', imageUrl: 'https://picsum.photos/seed/course1/600/300', author: 'Jane Doe', rating: 4.8, studentCount: 1250, price: '$99', detailsUrl: '/courses/1', category: 'Web Development', level: 'Advanced' },
  { id: '2', title: 'Introduction to Machine Learning', description: 'Learn the fundamentals of machine learning and AI with Python.', imageUrl: 'https://picsum.photos/seed/course2/600/300', author: 'John Smith', rating: 4.9, studentCount: 3400, price: 'Free', detailsUrl: '/courses/2', category: 'Data Science', level: 'Beginner' },
  { id: '3', title: 'UI/UX Design Masterclass', description: 'Create stunning user interfaces and experiences from scratch.', imageUrl: 'https://picsum.photos/seed/course3/600/300', author: 'Alice Brown', rating: 4.7, studentCount: 800, price: '$49', detailsUrl: '/courses/3', category: 'Design', level: 'Intermediate' },
  { id: '4', title: 'Cybersecurity Essentials', description: 'Protect systems and data from cyber threats. Learn ethical hacking.', imageUrl: 'https://picsum.photos/seed/course4/600/300', author: 'Bob Green', rating: 4.6, studentCount: 1500, price: '$79', detailsUrl: '/courses/4', category: 'Cybersecurity', level: 'Intermediate' },
];

const allCategories = Array.from(new Set(mockCourses.map(c => c.category).filter(Boolean))) as string[];
const allLevels = Array.from(new Set(mockCourses.map(c => c.level).filter(Boolean))) as ('Beginner' | 'Intermediate' | 'Advanced')[];


export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Explore Our Courses</h1>
        <p className="text-lg text-muted-foreground">Unlock your potential with our diverse range of expert-led courses.</p>
      </section>

      {/* AI Recommendations Section */}
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

        {filteredCourses.length > 0 ? (
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
                  <p className="text-sm text-muted-foreground mb-1">By {course.author}</p>
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
                  <Link href={course.detailsUrl} className="w-full">
                    <Button variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      View Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
           <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No courses found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}
