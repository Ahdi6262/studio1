
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { User, Mail, Edit3, Save, Camera, ShieldCheck } from "lucide-react";

// Placeholder user data
const mockUser = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  bio: "Full-stack developer passionate about open source and building cool stuff. Always learning and exploring new technologies.",
  avatarUrl: "https://picsum.photos/seed/profileAlex/200/200",
  achievements: ["Top Contributor", "Code Wizard", "Community Star"],
};

export default function ProfilePage() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [bio, setBio] = useState(mockUser.bio);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(mockUser.avatarUrl);
  const [isEditing, setIsEditing] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log({ name, email, bio, avatarFile });
    setIsEditing(false);
    // Show toast notification for success
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <Card className="bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">User Profile</CardTitle>
          <CardDescription>Manage your account details and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage src={avatarPreview || undefined} alt={name} data-ai-hint="profile avatar" />
                <AvatarFallback className="text-4xl">{name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="relative">
                  <Button type="button" variant="outline" size="sm" className="relative border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Camera className="mr-2 h-4 w-4" /> Change Avatar
                  </Button>
                  <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/png, image/jpeg, image/gif" 
                    onChange={handleAvatarChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} readOnly={!isEditing} className="pl-10 bg-background/50 read-only:bg-muted/30 read-only:cursor-default" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditing} className="pl-10 bg-background/50 read-only:bg-muted/30 read-only:cursor-default" />
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} readOnly={!isEditing} placeholder="Tell us about yourself..." className="bg-background/50 read-only:bg-muted/30 read-only:cursor-default" />
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              {isEditing ? (
                <>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">Cancel</Button>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Achievements</CardTitle>
          <CardDescription>Your badges and accomplishments in the community.</CardDescription>
        </CardHeader>
        <CardContent>
          {mockUser.achievements.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {mockUser.achievements.map((achievement, index) => (
                <Badge key={index} className="px-4 py-2 text-sm bg-primary/20 text-primary flex items-center">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  {achievement}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No achievements yet. Keep contributing!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
