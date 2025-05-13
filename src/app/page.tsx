
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, BookOpen, Briefcase, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <div className="flex justify-center mb-6">
          <Sparkles className="h-16 w-16 text-primary animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          Welcome to <span className="text-primary">HEX THE ADD HUB</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Your central hub for creativity, learning, and collaboration. Discover projects, master new skills, and connect with a vibrant community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/courses">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
              Explore Courses <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="outline" size="lg" className="text-primary-foreground border-primary hover:bg-primary/10 w-full sm:w-auto">
              View Portfolio <Briefcase className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card className="frosted-glass-cyan hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/20 rounded-md inline-block mb-4">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Showcase Your Work</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Build an impressive portfolio to highlight your skills and projects. Attract collaborators and opportunities.
            </CardDescription>
            <Link href="/portfolio" className="mt-4 inline-flex items-center text-primary font-medium hover:underline">
              Explore Portfolios <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        <Card className="frosted-glass-cyan hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="p-3 bg-primary/20 rounded-md inline-block mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Learn & Grow</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access a wide range of courses to expand your knowledge. From beginner to advanced levels.
            </CardDescription>
             <Link href="/courses" className="mt-4 inline-flex items-center text-primary font-medium hover:underline">
              Browse Courses <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        <Card className="frosted-glass-cyan hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
             <div className="p-3 bg-primary/20 rounded-md inline-block mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Join the Community</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Connect with peers, share insights on our blog, and climb the leaderboard through contributions.
            </CardDescription>
            <Link href="/leaderboard" className="mt-4 inline-flex items-center text-primary font-medium hover:underline">
              See Leaderboard <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Placeholder for Recent Activity Feed */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Recent Community Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(item => (
            <Card key={item} className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Image src="https://picsum.photos/40/40" alt="User Avatar" data-ai-hint="user avatar" width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-semibold text-foreground">User Activity #{item}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <p className="text-sm text-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
              </CardContent>
            </Card>
          ))}
        </div>
         <div className="text-center mt-8">
            <Button variant="outline" className="text-primary-foreground border-primary hover:bg-primary/10">View More Activity</Button>
        </div>
      </section>
    </div>
  );
}
