import { PrismaClient, CourseLevel } from '@prisma/client';
import { hash } from 'bcryptjs'; // Example for password hashing, if needed for User seeding

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Seed Users and Profiles
  const user1 = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      image: 'https://picsum.photos/seed/admin/200/200',
      profile: {
        create: {
          bio: 'Administrator of this platform.',
          achievements: ['Top Contributor', 'Platform Moderator'],
        },
      },
    },
    include: { profile: true }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Community Writer',
      email: 'writer@example.com',
      image: 'https://picsum.photos/seed/writer1/200/200',
      profile: {
        create: {
          bio: 'Writes insightful articles for the community.',
          achievements: ['Content Creator', 'Prolific Blogger'],
        },
      },
    },
    include: { profile: true }
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'AI Enthusiast',
      email: 'ai_fan@example.com',
      image: 'https://picsum.photos/seed/aiuser/200/200',
      profile: {
        create: {
          bio: 'Exploring the frontiers of Artificial Intelligence.',
          achievements: ['AI Innovator', 'Early Adopter'],
        },
      },
    },
    include: { profile: true }
  });
  
  // Leaderboard Users (using the users created above)
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Wonderland',
      email: 'alice@example.com',
      image: 'https://picsum.photos/seed/user1/40/40',
      profile: {
        create: { bio: 'Curiouser and curiouser!', achievements: ['Top Contributor', 'Community Helper'] },
      },
    },
    include: { profile: true },
  });
  await prisma.leaderboardEntry.create({
    data: { userId: alice.id, points: 10500 },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob The Builder',
      email: 'bob@example.com',
      image: 'https://picsum.photos/seed/user2/40/40',
      profile: {
        create: { bio: 'Can we fix it? Yes, we can!', achievements: ['Bug Squasher', 'Early Adopter'] },
      },
    },
    include: { profile: true },
  });
  await prisma.leaderboardEntry.create({
    data: { userId: bob.id, points: 9800 },
  });

  const charlie = await prisma.user.create({
    data: {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      image: 'https://picsum.photos/seed/user3/40/40',
      profile: {
        create: { bio: 'Good grief!', achievements: ['Forum Guru'] },
      },
    },
    include: { profile: true },
  });
  await prisma.leaderboardEntry.create({
    data: { userId: charlie.id, points: 9200 },
  });

   const diana = await prisma.user.create({
    data: {
      name: 'Diana Prince',
      email: 'diana@example.com',
      image: 'https://picsum.photos/seed/user4/40/40',
      profile: {
        create: { bio: 'Fighting for those who cannot fight for themselves.', achievements: ['Mentor', 'Content Creator'] },
      },
    },
    include: { profile: true },
  });
  await prisma.leaderboardEntry.create({
    data: { userId: diana.id, points: 8500 },
  });

  const edward = await prisma.user.create({
    data: {
      name: 'Edward Scissorhands',
      email: 'edward@example.com',
      image: 'https://picsum.photos/seed/user5/40/40',
      profile: {
        create: { bio: 'I am not complete.', achievements: ['Top Learner'] },
      },
    },
    include: { profile: true },
  });
  await prisma.leaderboardEntry.create({
    data: { userId: edward.id, points: 7800 },
  });


  // Seed Blog Posts
  await prisma.blogPost.create({
    data: {
      slug: 'getting-started-with-nextjs-14',
      title: 'Getting Started with Next.js 14',
      summary: 'A comprehensive guide to setting up your first Next.js 14 project with App Router.',
      authorId: user1.id,
      publishedAt: new Date('2024-07-20'),
      imageUrl: 'https://picsum.photos/seed/blog1/1200/600',
      tags: ['Next.js', 'Web Development', 'JavaScript'],
      content: '<p>This is the full content for Getting Started with Next.js 14. It covers installation, project structure, creating pages with the App Router, and basic deployment tips. We delve into Server Components and Client Components, explaining their use cases and benefits.</p><p>Key topics include:</p><ul><li>Setting up a new Next.js project</li><li>Understanding the App Router</li><li>Creating layouts and pages</li><li>Fetching data with Server Components</li><li>Using Client Components for interactivity</li><li>Basic styling with Tailwind CSS</li><li>Deployment to Vercel</li></ul><p>This guide aims to provide a solid foundation for developers looking to leverage the power of Next.js 14 for their web applications.</p>',
    },
  });

  await prisma.blogPost.create({
    data: {
      slug: 'mastering-tailwind-css-techniques',
      title: 'Mastering Tailwind CSS: Advanced Techniques',
      summary: 'Unlock the full potential of Tailwind CSS with these advanced tips and tricks.',
      authorId: user2.id,
      publishedAt: new Date('2024-07-18'),
      imageUrl: 'https://picsum.photos/seed/blog2/1200/600',
      tags: ['TailwindCSS', 'CSS', 'Frontend'],
      content: '<p>Full content for Mastering Tailwind CSS...</p>',
    },
  });

  await prisma.blogPost.create({
    data: {
      slug: 'ai-in-modern-web-design',
      title: 'The Role of AI in Modern Web Design',
      summary: 'Explore how artificial intelligence is shaping the future of web design and user experience.',
      authorId: user3.id,
      publishedAt: new Date('2024-07-15'),
      imageUrl: 'https://picsum.photos/seed/blog3/1200/600',
      tags: ['AI', 'Web Design', 'UX'],
      content: '<p>Full content for AI in Modern Web Design...</p>',
    },
  });

  // Seed Instructors
  const instructorJane = await prisma.instructor.create({
    data: {
      name: 'Jane Doe',
      bio: 'Lead Engineer at TechCorp, 10+ years experience.',
      avatarUrl: 'https://picsum.photos/seed/instructor1/100/100',
    },
  });

  const instructorJohn = await prisma.instructor.create({
    data: {
      name: 'John Smith',
      bio: 'Data Scientist at AI Innovations, PhD in CS.',
      avatarUrl: 'https://picsum.photos/seed/instructor2/100/100',
    },
  });
  
  const instructorAlice = await prisma.instructor.create({
    data: {
      name: 'Alice Brown',
      bio: 'Award-winning designer with a passion for user-centric products.',
      avatarUrl: 'https://picsum.photos/seed/instructor3/100/100',
    },
  });

  const instructorBob = await prisma.instructor.create({
    data: {
      name: 'Bob Green',
      bio: 'Cybersecurity expert with experience in ethical hacking and defense.',
      avatarUrl: 'https://picsum.photos/seed/instructor4/100/100',
    },
  });

  // Seed Courses and Lessons
  await prisma.course.create({
    data: {
      title: 'Advanced Web Development Bootcamp',
      description: 'Master modern web technologies including React, Node.js, and GraphQL.',
      imageUrl: 'https://picsum.photos/seed/course1/600/300',
      authorName: instructorJane.name, // Using instructor's name
      instructorId: instructorJane.id,
      rating: 4.8,
      studentCount: 1250,
      price: '$99',
      category: 'Web Development',
      level: CourseLevel.Advanced,
      duration: '12 Weeks',
      lessons: {
        create: [
          { title: 'Introduction to Web Dev', duration: '30m' },
          { title: 'React Fundamentals', duration: '2h' },
          { title: 'Advanced State Management with Redux', duration: '3h' },
        ],
      },
    },
  });

  await prisma.course.create({
    data: {
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning and AI with Python.',
      imageUrl: 'https://picsum.photos/seed/course2/600/300',
      authorName: instructorJohn.name,
      instructorId: instructorJohn.id,
      rating: 4.9,
      studentCount: 3400,
      price: 'Free',
      category: 'Data Science',
      level: CourseLevel.Beginner,
      duration: '8 Weeks',
      lessons: {
        create: [
          { title: 'What is Machine Learning?', duration: '45m' },
          { title: 'Python for Machine Learning', duration: '2h 30m' },
        ],
      },
    },
  });

  await prisma.course.create({
    data: {
      title: 'UI/UX Design Masterclass',
      description: 'Create stunning user interfaces and experiences from scratch.',
      imageUrl: 'https://picsum.photos/seed/course3/600/300',
      authorName: instructorAlice.name,
      instructorId: instructorAlice.id,
      rating: 4.7,
      studentCount: 800,
      price: '$49',
      category: 'Design',
      level: CourseLevel.Intermediate,
      duration: '10 Weeks',
       lessons: {
        create: [
          { title: 'Design Principles', duration: '1h' },
          { title: 'User Research', duration: '2h' },
          { title: 'Prototyping in Figma', duration: '3h' },
        ],
      },
    },
  });

  await prisma.course.create({
    data: {
      title: 'Cybersecurity Essentials',
      description: 'Protect systems and data from cyber threats. Learn ethical hacking.',
      imageUrl: 'https://picsum.photos/seed/course4/600/300',
      authorName: instructorBob.name,
      instructorId: instructorBob.id,
      rating: 4.6,
      studentCount: 1500,
      price: '$79',
      category: 'Cybersecurity',
      level: CourseLevel.Intermediate,
      duration: '6 Weeks',
      lessons: {
        create: [
          { title: 'Intro to Cybersecurity', duration: '1h' },
          { title: 'Network Security', duration: '2.5h' },
          { title: 'Ethical Hacking Basics', duration: '3h' },
        ],
      },
    },
  });

  // Seed Projects
  await prisma.project.create({
    data: {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with modern UI.',
      longDescription: 'This project is a comprehensive e-commerce solution designed for scalability and user experience. It features product listings, user authentication, shopping cart functionality, and an admin panel for managing products and orders. Built with a MERN stack, it leverages modern web technologies for optimal performance.',
      imageUrl: 'https://picsum.photos/seed/project1/600/400',
      tags: ['React', 'Node.js', 'MongoDB'],
      technologies: ['React', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API'],
      liveLink: '#',
      repoLink: '#',
      date: new Date('2023-05-15'),
    },
  });

  await prisma.project.create({
    data: {
      title: 'Social Media App',
      description: 'A social networking app for connecting people.',
      longDescription: 'A dynamic social media application enabling users to share updates, connect with friends, and discover new content. Features include real-time notifications, a news feed, user profiles, and direct messaging. The tech stack focuses on serverless architecture and real-time database capabilities.',
      imageUrl: 'https://picsum.photos/seed/project2/600/400',
      tags: ['Next.js', 'Firebase', 'TailwindCSS'],
      technologies: ['Next.js', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'Vercel'],
      liveLink: '#',
      repoLink: '#',
      date: new Date('2023-08-20'),
    },
  });
  
  await prisma.project.create({
    data: {
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing complex datasets.',
      longDescription: 'This dashboard provides powerful tools for data analysis and visualization. Users can upload datasets, generate various chart types, and customize views to gain insights. The backend is built with Python and Flask, serving data to a D3.js-powered frontend.',
      imageUrl: 'https://picsum.photos/seed/project3/600/400',
      tags: ['D3.js', 'Python', 'Flask'],
      technologies: ['D3.js', 'JavaScript', 'Python', 'Flask', 'Pandas'],
      liveLink: '#',
      repoLink: '#',
      date: new Date('2022-11-10'),
    },
  });

  await prisma.project.create({
    data: {
      title: 'Mobile Game "Pixel Adventure"',
      description: 'A retro-style pixel art adventure game for mobile devices.',
      longDescription: 'Pixel Adventure is an engaging 2D platformer game with a charming pixel art style. It features multiple levels, challenging enemies, and a unique storyline. Developed using Unity, it is optimized for both Android and iOS platforms.',
      imageUrl: 'https://picsum.photos/seed/project4/600/400',
      tags: ['Unity', 'C#', 'Pixel Art'],
      technologies: ['Unity Engine', 'C#', 'Aseprite', 'Mobile Optimization'],
      liveLink: '#',
      repoLink: '#',
      date: new Date('2024-01-05'),
    },
  });


  console.log('Seeding finished.');
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
