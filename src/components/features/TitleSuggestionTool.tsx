
"use client";

import { useState } from 'react';
import { suggestBlogTitle, type SuggestBlogTitleInput, type SuggestBlogTitleOutput } from '@/ai/flows/suggest-blog-title';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TitleSuggestionTool() {
  const [keywords, setKeywords] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) {
      setError('Please enter some keywords.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const input: SuggestBlogTitleInput = { keywords };
      const result: SuggestBlogTitleOutput = await suggestBlogTitle(input);
      setSuggestions(result.titleSuggestions || []);
      if (!result.titleSuggestions || result.titleSuggestions.length === 0) {
        setError('No suggestions generated. Try different keywords.');
      }
    } catch (err) {
      setError('Failed to generate_button suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: `"${text}"`,
          duration: 3000,
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          variant: "destructive",
          title: "Copy failed",
          description: "Could not copy text to clipboard.",
          duration: 3000,
        });
      });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center">
          <Lightbulb className="mr-2 h-7 w-7 text-primary" />
          AI Blog Title Suggester
        </CardTitle>
        <CardDescription>
          Enter keywords related to your blog post, and our AI will suggest compelling titles for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-1">
              Keywords (comma-separated)
            </Label>
            <Input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., Next.js, AI, Web Development"
              className="bg-background/50"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Suggest Titles'
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {suggestions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Suggested Titles:</h3>
            <ul className="space-y-3">
              {suggestions.map((title, index) => (
                <li key={index} className="p-3 bg-background/50 rounded-md flex justify-between items-center group">
                  <span className="text-foreground">{title}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleCopyToClipboard(title)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                    aria-label="Copy title"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
