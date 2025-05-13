
import type { ApiCourse } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Users, PlayCircle, Clock, BarChart, Download, CheckCircle } from 'lucide-react';

const RUST_API_URL = process.env.RUST_API_URL || 'http://localhost:8000';

async function getCourseById(courseId: string): Promise<ApiCourse | null> {
  try {
    const res = await fetch(`${RUST_API_URL}/api/courses/${courseId}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`Failed to fetch course ${courseId} from Rust backend:`, res.status, await res.text());
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching course ${courseId} from Rust backend:`, error);
    return null;
  }
}

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = await getCourseById(params.courseId);

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
              {course.lessons && course.lessons.length > 0 ? (
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
              ) : (
                <p className="text-muted-foreground mb-6">Course content details are not available yet.</p>
              )}


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

// Helper function to generate static paths if using SSG
export async function generateStaticParams() {
 try {
    const res = await fetch(`${RUST_API_URL}/api/courses`);
    if (!res.ok) {
      console.error('Failed to fetch courses for static params from Rust backend:', res.status, await res.text());
      return [];
    }
    const courses: ApiCourse[] = await res.json();
    return courses.map((course) => ({
      courseId: course.id,
    }));
  } catch (error) {
    console.error('Error fetching courses for static params from Rust backend:', error);
    return [];
  }
}
