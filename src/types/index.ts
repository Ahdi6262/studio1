
// Types for Project, Course, LeaderboardUser, BlogPost will now be primarily sourced from API responses.

export interface ApiPostAuthor {
  name: string;
  avatarUrl: string;
}

export interface ApiBlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  author: ApiPostAuthor;
  publishedAt?: string; // ISO date string from Rust API
  tags: string[];
  content?: string; // Optional for list view, present for detail
}

export interface ApiCourseInstructor {
  name: string;
  bio: string;
  avatarUrl: string;
}
export interface ApiCourseLesson {
  title: string;
  duration: string;
}

export interface ApiCourse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string; 
  instructor?: ApiCourseInstructor;
  rating?: number;
  studentCount?: number;
  price: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  duration?: string;
  lessons?: ApiCourseLesson[];
  // detailsUrl is a frontend concept, remove from backend type if not essential
}

export interface ApiProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  technologies?: string[];
  liveLink?: string;
  repoLink?: string;
  date?: string; // ISO date string
  // detailsUrl is a frontend concept
}

export interface ApiLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  points: number;
  achievements: string[];
}


// This type is for the client-side LifeTracker component and is not stored in the database yet.
export interface LifeStage {
  name: string;
  color: string; // Tailwind color class e.g. bg-blue-500
  endAge: number;
}

// Example of how you might use Prisma types along with custom additions:
/*
import type { Course as PrismaCourse, Lesson as PrismaLesson, Instructor as PrismaInstructor } from '@prisma/client';

export type CourseWithDetails = PrismaCourse & {
  lessons: PrismaLesson[];
  instructor: PrismaInstructor | null;
  // any additional client-side properties
};
*/

