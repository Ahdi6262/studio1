
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, User, UserPlus } from "lucide-react";

// Placeholder for social/Web3 icons
const GoogleIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.5,18.33 21.5,12.33C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg>;
const GithubIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6.082A2.25 2.25 0 0 1 18.75 20.25H5.25A2.25 2.25 0 0 1 3 18.082V12m18 0A2.25 2.25 0 0 0 18.75 9.75H5.25A2.25 2.25 0 0 0 3 12m0-4.875A2.25 2.25 0 0 1 5.25 4.875h13.5A2.25 2.25 0 0 1 21 7.125M3 12h18M3 7.125h18M3 12a2.25 2.25 0 0 0-2.25 2.25v.063c0 .513.195.992.536 1.35l2.098 2.377a2.25 2.25 0 0 0 1.614.713h13.5a2.25 2.25 0 0 0 1.614-.713l2.098-2.377a2.25 2.25 0 0 0 .536-1.35V14.25A2.25 2.25 0 0 0 21 12m-9 4.5h.008v.008H12v-.008Z" /></svg>;


export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!"); // Replace with Toaster notification
      return;
    }
    // Handle signup logic here
    console.log({ name, email, password });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">Create an Account</CardTitle>
          <CardDescription>Join our community and start your journey today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
               <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <div className="space-y-1">
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
            <div className="space-y-1">
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
            <div className="space-y-1">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="mr-2 h-5 w-5" /> Sign Up
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <Button variant="outline" className="w-full border-input hover:bg-accent/50">
                <GoogleIcon /> <span className="ml-2">Sign up with Google</span>
              </Button>
              <Button variant="outline" className="w-full border-input hover:bg-accent/50">
                <GithubIcon /> <span className="ml-2">Sign up with GitHub</span>
              </Button>
              <Button variant="outline" className="w-full border-input hover:bg-accent/50">
                <WalletIcon /> <span className="ml-2">Connect Web3 Wallet</span>
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" legacyBehavior>
              <a className="font-medium text-primary hover:underline">Login</a>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
