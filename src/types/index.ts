
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  detailsUrl: string; 
  longDescription?: string;
  technologies?: string[];
  liveLink?: string;
  repoLink?: string;
  date?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  rating?: number;
  studentCount?: number;
  price?: string; 
  detailsUrl: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  lessons?: { title: string, duration: string }[];
  instructor?: { name: string, bio: string, avatarUrl: string };
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  points: number;
  achievements: string[]; // badge names or image URLs
}

export interface BlogPost {
  id:string;
  title: string;
  slug: string;
  summary: string;
  author: string;
  authorAvatar?: string;
  date: string;
  imageUrl: string;
  content?: string; // Full content for detail page
  tags?: string[];
}

export interface LifeStage {
  name: string;
  color: string; // Tailwind color class e.g. bg-blue-500
  endAge: number;
}
