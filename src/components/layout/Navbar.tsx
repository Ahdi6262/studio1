
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, Home, Briefcase, BookOpen, Trophy, Newspaper, UserCircle, LogIn, UserPlus, BarChartHorizontalBig } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/ai-tools', label: 'AI Tools', icon: Sparkles },
  { href: '/life-tracker', label: 'Life Tracker', icon: BarChartHorizontalBig },
];

export default function Navbar() {
  const pathname = usePathname();
  // Placeholder for authentication state
  const isAuthenticated = false; 

  const NavLinkItems = () => (
    <>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <Button
            variant="ghost"
            className={cn(
              "justify-start text-foreground hover:bg-accent/20 hover:text-accent-foreground",
              pathname === link.href && "text-primary font-semibold" // Updated: removed background, set text to primary for active mobile links
            )}
          >
            <link.icon className="mr-2 h-5 w-5" />
            {link.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">HEX THE ADD HUB</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button
                variant="ghost"
                className={cn(
                  "text-foreground hover:text-primary",
                  pathname === link.href && "text-primary font-semibold"
                )}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <Link href="/profile" passHref>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <UserCircle className="mr-2 h-5 w-5" /> Profile
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <LogIn className="mr-2 h-5 w-5" /> Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-foreground">HEX THE ADD HUB</span>
                </Link>
                <NavLinkItems />
                <hr className="my-4 border-border" />
                {isAuthenticated ? (
                  <Link href="/profile" passHref>
                    <Button variant="outline" className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <UserCircle className="mr-2 h-5 w-5" /> Profile
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" passHref>
                      <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary">
                        <LogIn className="mr-2 h-5 w-5" /> Login
                      </Button>
                    </Link>
                    <Link href="/signup" passHref>
                      <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                        <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
