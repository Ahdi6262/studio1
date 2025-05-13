
// Types for Project, Course, LeaderboardUser, BlogPost will now be primarily sourced from Prisma Client.
// Example: import type { Project as PrismaProject } from '@prisma/client';

// This type is for the client-side LifeTracker component and is not stored in the database yet.
export interface LifeStage {
  name: string;
  color: string; // Tailwind color class e.g. bg-blue-500
  endAge: number;
}

// You can define related or augmented types here if needed.
// For example, if you need a type that combines Prisma types or adds client-side properties.

// Example of how you might use Prisma types along with custom additions:
/*
import type { Course as PrismaCourse, Lesson as PrismaLesson, Instructor as PrismaInstructor } from '@prisma/client';

export type CourseWithDetails = PrismaCourse & {
  lessons: PrismaLesson[];
  instructor: PrismaInstructor | null;
  // any additional client-side properties
};
*/
