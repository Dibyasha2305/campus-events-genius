
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { userStats, events } from '@/services/mockData';
import { User, Trophy, Calendar, BookmarkCheck, Heart, Award, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const Profile = () => {
  const upcomingEvents = events.filter((_, index) => index % 4 === 0).slice(0, 2);
  
  const handleDownloadResume = () => {
    toast.success('Resume summary downloaded');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="flex items-center gap-2">
          <User className="h-5 w-5 text-campus-purple" />
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </section>

        {/* User profile summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-campus-purple to-campus-teal flex items-center justify-center text-white text-3xl font-bold mb-4">
                  JS
                </div>
                <h3 className="text-lg font-medium">John Smith</h3>
                <p className="text-sm text-muted-foreground">Computer Science • Year 3</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Resume Points</span>
                  <span className="font-medium">{userStats.resumePoints}/500</span>
                </div>
                <Progress value={userStats.resumePoints / 5} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {500 - userStats.resumePoints} more points for Gold status
                </p>
              </div>

              <Button 
                onClick={handleDownloadResume}
                variant="outline"
                className="w-full"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Download Resume Summary
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mb-2 mx-auto text-campus-teal" />
                    <div className="text-2xl font-bold">{userStats.eventsAttended}</div>
                    <p className="text-xs text-muted-foreground">Events Attended</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Trophy className="h-8 w-8 mb-2 mx-auto text-campus-gold" />
                    <div className="text-2xl font-bold">{userStats.resumePoints}</div>
                    <p className="text-xs text-muted-foreground">Resume Points</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BookmarkCheck className="h-8 w-8 mb-2 mx-auto text-campus-purple" />
                    <div className="text-2xl font-bold">{userStats.savedEvents}</div>
                    <p className="text-xs text-muted-foreground">Saved Events</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Heart className="h-8 w-8 mb-2 mx-auto text-red-500" />
                    <div className="text-2xl font-bold">{userStats.votedEvents}</div>
                    <p className="text-xs text-muted-foreground">Voted Events</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userStats.badges.map((badge, index) => (
                    <div 
                      key={index}
                      className="px-3 py-1 rounded-full bg-secondary text-sm font-medium flex items-center gap-1"
                    >
                      <Award className="h-4 w-4 text-campus-gold" />
                      {badge}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          View <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No upcoming events</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
