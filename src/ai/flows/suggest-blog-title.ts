// src/ai/flows/suggest-blog-title.ts
'use server';

/**
 * @fileOverview An AI agent that suggests blog post titles based on keywords.
 *
 * - suggestBlogTitle - A function that generates blog post titles.
 * - SuggestBlogTitleInput - The input type for the suggestBlogTitle function.
 * - SuggestBlogTitleOutput - The return type for the suggestBlogTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTitleInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords related to the blog post, separated by commas.'),
});
export type SuggestBlogTitleInput = z.infer<typeof SuggestBlogTitleInputSchema>;

const SuggestBlogTitleOutputSchema = z.object({
  titleSuggestions: z
    .array(z.string())
    .describe('An array of suggested blog post titles.'),
});
export type SuggestBlogTitleOutput = z.infer<typeof SuggestBlogTitleOutputSchema>;

export async function suggestBlogTitle(input: SuggestBlogTitleInput): Promise<SuggestBlogTitleOutput> {
  return suggestBlogTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTitlePrompt',
  input: {schema: SuggestBlogTitleInputSchema},
  output: {schema: SuggestBlogTitleOutputSchema},
  prompt: `You are a creative blog title generator. Given a list of keywords, you will generate 5 compelling blog post titles.

Keywords: {{{keywords}}}

Titles:`,
});

const suggestBlogTitleFlow = ai.defineFlow(
  {
    name: 'suggestBlogTitleFlow',
    inputSchema: SuggestBlogTitleInputSchema,
    outputSchema: SuggestBlogTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Split the output into an array of titles
    const titleSuggestions = output!.titleSuggestions;
    return {
      titleSuggestions: titleSuggestions,
    };
  }
);
