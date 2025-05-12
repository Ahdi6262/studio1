// RecommendCourses Flow provides AI-powered course recommendations based on user interests and past activity.
// It takes user interests and past activity as input and returns a list of recommended courses.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCoursesInputSchema = z.object({
  interests: z
    .string()
    .describe('The user\'s interests, as a comma separated string.'),
  pastActivity: z
    .string()
    .describe('The user\'s past activity, as a comma separated string.'),
});

export type RecommendCoursesInput = z.infer<typeof RecommendCoursesInputSchema>;

const RecommendedCourseSchema = z.object({
  title: z.string().describe('The title of the recommended course.'),
  description: z.string().describe('A brief description of the course.'),
  url: z.string().url().describe('The URL of the course.'),
  relevanceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A score indicating the relevance of the course to the user.'),
});

const RecommendCoursesOutputSchema = z.array(RecommendedCourseSchema).describe('An array of recommended courses.');

export type RecommendCoursesOutput = z.infer<typeof RecommendCoursesOutputSchema>;

export async function recommendCourses(input: RecommendCoursesInput): Promise<RecommendCoursesOutput> {
  return recommendCoursesFlow(input);
}

const recommendCoursesPrompt = ai.definePrompt({
  name: 'recommendCoursesPrompt',
  input: {schema: RecommendCoursesInputSchema},
  output: {schema: RecommendCoursesOutputSchema},
  prompt: `You are a course recommendation expert. Given a user's interests and past activity, recommend a list of courses that would be relevant to them.

Interests: {{{interests}}}
Past Activity: {{{pastActivity}}}

Format your response as a JSON array of courses, each with a title, description, url, and relevanceScore (0-1).  The courses should be tailored to the user's interests and past activities. Only return courses that are highly relevant. Focus on extracting and matching key information from both interests and past activity to find relevant courses.

{{outputFormatInstructions}}`,
});

const recommendCoursesFlow = ai.defineFlow(
  {
    name: 'recommendCoursesFlow',
    inputSchema: RecommendCoursesInputSchema,
    outputSchema: RecommendCoursesOutputSchema,
  },
  async input => {
    const {output} = await recommendCoursesPrompt(input);
    return output!;
  }
);
