
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lightbulb, ChevronRight } from "lucide-react";

const aiTools = [
  {
    title: "Blog Title Suggester",
    description: "Generate compelling blog post titles based on your keywords.",
    href: "/ai-tools/title-suggester",
    icon: Lightbulb,
  },
  // Add more AI tools here as they are developed
];

export default function AiToolsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">AI-Powered Tools</h1>
        <p className="text-lg text-muted-foreground">Leverage artificial intelligence to enhance your creative process.</p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {aiTools.map((tool) => (
          <Card key={tool.title} className="bg-card hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <tool.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-semibold text-foreground">{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{tool.description}</CardDescription>
              <Link href={tool.href} passHref>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Use Tool <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
