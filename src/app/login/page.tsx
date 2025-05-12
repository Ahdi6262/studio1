
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";

// Placeholder for social login icons (Lucide doesn't have brand icons)
const GoogleIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.5,18.33 21.5,12.33C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg>;
const GithubIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H17L16.5,14H14V22H10V14H7V10H10V6.5C10,3.55 11.79,2 14.22,2H17Z" /></svg>;


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, keepSignedIn });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">Login to Your Account</CardTitle>
          <CardDescription>Access your portfolio, courses, and community features.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="keep-signed-in" 
                  checked={keepSignedIn} 
                  onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="keep-signed-in" className="text-sm">Keep me signed in</Label>
              </div>
              <Link href="/forgot-password" legacyBehavior>
                <a className="text-sm text-primary hover:underline">Forgot password?</a>
              </Link>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Button variant="outline" className="border-input hover:bg-accent/50">
                <GoogleIcon /> <span className="sr-only md:not-sr-only ml-2">Google</span>
              </Button>
              <Button variant="outline" className="border-input hover:bg-accent/50">
                <GithubIcon /> <span className="sr-only md:not-sr-only ml-2">GitHub</span>
              </Button>
              <Button variant="outline" className="border-input hover:bg-accent/50">
                <FacebookIcon /> <span className="sr-only md:not-sr-only ml-2">Facebook</span>
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" legacyBehavior>
              <a className="font-medium text-primary hover:underline">Sign up</a>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
