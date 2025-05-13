
import type { ApiLeaderboardEntry } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, ShieldCheck, Star } from 'lucide-react';

const RUST_API_URL = process.env.RUST_API_URL || 'http://localhost:8000';

async function getLeaderboardData(): Promise<ApiLeaderboardEntry[]> {
  try {
    const res = await fetch(`${RUST_API_URL}/api/leaderboard`, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch leaderboard from Rust backend:', res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching leaderboard from Rust backend:', error);
    return [];
  }
}

const achievementIcons: { [key: string]: React.ElementType } = {
  'Top Contributor': Trophy,
  'Community Helper': ShieldCheck,
  'Bug Squasher': Star,
  'Early Adopter': Star,
  'Forum Guru': ShieldCheck,
  'Mentor': Trophy,
  'Content Creator': Star,
  'Top Learner': Trophy,
  'Ferris Follower': Trophy, // Example for Rust specific achievement
  'Concurrency King': Star, // Example for Rust specific achievement
};

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();
  
  // Sort by rank client-side if not guaranteed by API, or by points if rank is not definitive
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => a.rank - b.rank || b.points - a.points);


  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Leaderboard</h1>
        <p className="text-lg text-muted-foreground">See who's making the biggest impact in our community (data from Rust API).</p>
      </section>

      {leaderboardData.length === 0 && (
        <p className="text-center text-muted-foreground">Leaderboard data is not available at the moment.</p>
      )}

      {leaderboardData.length > 0 && (
        <Card className="bg-card shadow-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-card">
                  <TableHead className="w-[80px] text-center text-muted-foreground">Rank</TableHead>
                  <TableHead className="text-muted-foreground">User</TableHead>
                  <TableHead className="text-right text-muted-foreground">Points</TableHead>
                  <TableHead className="text-center text-muted-foreground">Achievements</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeaderboard.map((user) => (
                  <TableRow key={user.id} className="hover:bg-background/50 transition-colors">
                    <TableCell className="font-medium text-center text-lg">
                      {user.rank === 1 && <Trophy className="h-6 w-6 text-yellow-400 inline-block" />}
                      {user.rank === 2 && <Trophy className="h-6 w-6 text-gray-400 inline-block" />}
                      {user.rank === 3 && <Trophy className="h-6 w-6 text-orange-400 inline-block" />}
                      {user.rank > 3 ? user.rank : ''}
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
                      <div className="flex justify-center items-center space-x-2 flex-wrap gap-1">
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
      )}
    </div>
  );
}
