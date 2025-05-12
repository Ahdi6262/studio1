
import type { Course } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Users, PlayCircle, Clock, BarChart, Download, CheckCircle } from 'lucide-react';

// Mock data - in a real app, this would be fetched based on params.courseId
const mockCourses: Course[] = [
   { id: '1', title: 'Advanced Web Development Bootcamp', description: 'Master modern web technologies including React, Node.js, and GraphQL.', imageUrl: 'https://picsum.photos/seed/course1/1200/600', author: 'Jane Doe', rating: 4.8, studentCount: 1250, price: '$99', detailsUrl: '/courses/1', category: 'Web Development', level: 'Advanced', duration: '12 Weeks', lessons: [{title: 'Introduction', duration: '30m'}, {title: 'React Basics', duration: '2h'}, {title: 'Advanced State Management', duration: '3h'}], instructor: {name: 'Jane Doe', bio: 'Lead Engineer at TechCorp, 10+ years experience.', avatarUrl: 'https://picsum.photos/seed/instructor1/100/100'}},
  { id: '2', title: 'Introduction to Machine Learning', description: 'Learn the fundamentals of machine learning and AI with Python.', imageUrl: 'https://picsum.photos/seed/course2/1200/600', author: 'John Smith', rating: 4.9, studentCount: 3400, price: 'Free', detailsUrl: '/courses/2', category: 'Data Science', level: 'Beginner', duration: '8 Weeks', lessons: [{title: 'What is ML?', duration: '45m'}, {title: 'Python for ML', duration: '2h 30m'}], instructor: {name: 'John Smith', bio: 'Data Scientist at AI Innovations, PhD in CS.', avatarUrl: 'https://picsum.photos/seed/instructor2/100/100'}},
];


export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = mockCourses.find(c => c.id === params.courseId);

  if (!course) {
    return (
       <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-destructive">Course not found</h1>
        <p className="text-muted-foreground">The course you are looking for does not exist or has been moved.</p>
        <Link href="/courses" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link href="/courses" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden bg-card">
            <CardHeader className="p-0">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={1200}
                height={600}
                className="w-full object-cover max-h-[400px]"
                data-ai-hint="course detail image"
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-3xl font-bold text-foreground mb-2">{course.title}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mb-4">{course.description}</CardDescription>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                {course.rating && (
                  <span className="flex items-center"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" /> {course.rating} rating</span>
                )}
                {course.studentCount && (
                  <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {course.studentCount.toLocaleString()} students</span>
                )}
                {course.level && (
                  <span className="flex items-center"><BarChart className="h-4 w-4 mr-1" /> {course.level}</span>
                )}
                {course.duration && (
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {course.duration}</span>
                )}
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-3">Course Content</h3>
              <ul className="space-y-2 mb-6">
                {course.lessons?.map((lesson, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-md">
                    <span className="flex items-center text-foreground">
                      <PlayCircle className="h-5 w-5 mr-2 text-primary" /> {lesson.title}
                    </span>
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </li>
                ))}
              </ul>

              {course.instructor && (
                <>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Instructor</h3>
                  <Card className="bg-background/50 p-4 flex items-start space-x-4">
                    <Image src={course.instructor.avatarUrl} alt={course.instructor.name} data-ai-hint="instructor avatar" width={80} height={80} className="rounded-full" />
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{course.instructor.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
                    </div>
                  </Card>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / Enrollment Area */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-primary mb-2">{course.price || 'Free'}</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">Get lifetime access</p>
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3">Enroll Now</Button>
            <Button variant="outline" size="lg" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">Add to Wishlist</Button>
            
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center"><Clock className="h-4 w-4 mr-2 text-primary" /> Full lifetime access</p>
              <p className="flex items-center"><Download className="h-4 w-4 mr-2 text-primary" /> Downloadable resources</p>
              <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary" /> Certificate of completion</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

