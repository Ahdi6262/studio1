
"use client";

import { useState, useEffect } from 'react';
import type { RecommendCoursesInput, RecommendCoursesOutput } from '@/ai/flows/recommend-courses';
import { recommendCourses } from '@/ai/flows/recommend-courses';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CourseRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendCoursesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interests, setInterests] = useState<string>('Web Development, AI');
  const [pastActivity, setPastActivity] = useState<string>('Completed JavaScript course, Viewed Python tutorials');

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const input: RecommendCoursesInput = { interests, pastActivity };
      const result = await recommendCourses(input);
      setRecommendations(result);
    } catch (e) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch initial recommendations on component mount
    fetchRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="space-y-6 p-4 md:p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-foreground flex items-center">
        <Lightbulb className="mr-2 h-7 w-7 text-primary" />
        Personalized Course Recommendations
      </h2>
      <p className="text-muted-foreground">
        Tell us about your interests and past activities to get tailored course suggestions.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="interests" className="text-foreground">Your Interests (comma-separated)</Label>
          <Input 
            id="interests"
            value={interests} 
            onChange={(e) => setInterests(e.target.value)} 
            placeholder="e.g., Machine Learning, UI/UX Design" 
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="pastActivity" className="text-foreground">Past Activity (comma-separated)</Label>
          <Input 
            id="pastActivity"
            value={pastActivity} 
            onChange={(e) => setPastActivity(e.target.value)} 
            placeholder="e.g., Finished React course, Watched data science videos" 
            className="mt-1"
          />
        </div>
      </div>
      <Button onClick={fetchRecommendations} disabled={isLoading} className="w-full md:w-auto">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? 'Getting Recommendations...' : 'Refresh Recommendations'}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && !recommendations && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-muted rounded-t-lg"></div>
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {recommendations && recommendations.length === 0 && !isLoading && (
        <p className="text-muted-foreground text-center py-4">No specific recommendations found based on your input. Try broadening your interests!</p>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recommendations.map((course, index) => (
            <Card key={index} className="flex flex-col overflow-hidden bg-background/50 hover:shadow-primary/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Image 
                  src={`https://picsum.photos/seed/${course.title.replace(/\s+/g, '')}/600/300`} 
                  alt={course.title} 
                  width={600} 
                  height={300} 
                  className="object-cover w-full h-40 rounded-t-lg"
                  data-ai-hint="course cover"
                />
                <CardTitle className="mt-4 text-xl font-semibold text-foreground">{course.title}</CardTitle>
                <Badge variant="outline" className="mt-1 border-primary text-primary">Relevance: {(course.relevanceScore * 100).toFixed(0)}%</Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground line-clamp-3">{course.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    View Course
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
