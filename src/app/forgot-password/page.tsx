
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Mail, Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here (e.g., send reset link)
    console.log({ email });
    setIsSubmitted(true);
    toast({
      title: "Password Reset Email Sent",
      description: `If an account exists for ${email}, you will receive an email with instructions to reset your password.`,
      duration: 5000,
    });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">Forgot Your Password?</CardTitle>
          <CardDescription>
            {isSubmitted 
              ? "Check your inbox for a password reset link."
              : "Enter your email address and we'll send you a link to reset your password."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="mr-2 h-5 w-5" /> Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                If you don&apos;t see the email, please check your spam folder or try again later.
              </p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Try a different email
              </Button>
            </div>
          )}
          
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/login" legacyBehavior>
              <a className="font-medium text-primary hover:underline flex items-center justify-center">
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Login
              </a>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
