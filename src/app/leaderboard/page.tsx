
import type { LeaderboardUser } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, ShieldCheck, Star } from 'lucide-react'; // Example achievement icons

const mockLeaderboard: LeaderboardUser[] = [
  { id: '1', rank: 1, name: 'Alice Wonderland', avatarUrl: 'https://picsum.photos/seed/user1/40/40', points: 10500, achievements: ['Top Contributor', 'Community Helper'] },
  { id: '2', rank: 2, name: 'Bob The Builder', avatarUrl: 'https://picsum.photos/seed/user2/40/40', points: 9800, achievements: ['Bug Squasher', 'Early Adopter'] },
  { id: '3', rank: 3, name: 'Charlie Brown', avatarUrl: 'https://picsum.photos/seed/user3/40/40', points: 9200, achievements: ['Forum Guru'] },
  { id: '4', rank: 4, name: 'Diana Prince', avatarUrl: 'https://picsum.photos/seed/user4/40/40', points: 8500, achievements: ['Mentor', 'Content Creator'] },
  { id: '5', rank: 5, name: 'Edward Scissorhands', avatarUrl: 'https://picsum.photos/seed/user5/40/40', points: 7800, achievements: ['Top Learner'] },
];

const achievementIcons: { [key: string]: React.ElementType } = {
  'Top Contributor': Trophy,
  'Community Helper': ShieldCheck,
  'Bug Squasher': Star,
  'Early Adopter': Star,
  'Forum Guru': ShieldCheck,
  'Mentor': Trophy,
  'Content Creator': Star,
  'Top Learner': Trophy,
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Leaderboard</h1>
        <p className="text-lg text-muted-foreground">See who's making the biggest impact in our community.</p>
      </section>

      <Card className="bg-card shadow-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-card"> {/* Prevent hover on header row */}
                <TableHead className="w-[80px] text-center text-muted-foreground">Rank</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-right text-muted-foreground">Points</TableHead>
                <TableHead className="text-center text-muted-foreground">Achievements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((user) => (
                <TableRow key={user.id} className="hover:bg-background/50 transition-colors">
                  <TableCell className="font-medium text-center text-lg">
                    {user.rank === 1 && <Trophy className="h-6 w-6 text-yellow-400 inline-block" />}
                    {user.rank === 2 && <Trophy className="h-6 w-6 text-gray-400 inline-block" />}
                    {user.rank === 3 && <Trophy className="h-6 w-6 text-orange-400 inline-block" />}
                    {user.rank > 3 && user.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">{user.points.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center space-x-2">
                      {user.achievements.map((achievement, index) => {
                        const IconComponent = achievementIcons[achievement] || Star;
                        return (
                           <Badge key={index} variant="secondary" className="bg-primary/20 text-primary flex items-center gap-1 px-2 py-1">
                             <IconComponent className="h-3 w-3" />
                             {achievement}
                           </Badge>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
