
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { events } from '@/services/mockData';
import { Vote, ArrowUp, ArrowDown, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Voting = () => {
  const [votedEvents, setVotedEvents] = useState([...events].sort((a, b) => b.votes - a.votes));
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleVote = (eventId: string, direction: 'up' | 'down') => {
    setVotedEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          let voteChange = 0;
          
          if (userVotes[eventId] === direction) {
            // Unvote
            voteChange = direction === 'up' ? -1 : 1;
            setUserVotes(prev => ({...prev, [eventId]: null}));
          } else if (userVotes[eventId] === null || userVotes[eventId] === undefined) {
            // New vote
            voteChange = direction === 'up' ? 1 : -1;
            setUserVotes(prev => ({...prev, [eventId]: direction}));
          } else {
            // Change vote direction (from down to up or vice versa)
            voteChange = direction === 'up' ? 2 : -2;
            setUserVotes(prev => ({...prev, [eventId]: direction}));
          }
          
          const newVotes = event.votes + voteChange;
          
          if (voteChange !== 0) {
            toast.success(`${direction === 'up' ? 'Upvoted' : 'Downvoted'} "${event.title}"`);
          }
          
          return {...event, votes: newVotes};
        }
        return event;
      }).sort((a, b) => b.votes - a.votes)
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="flex items-center gap-2">
          <Vote className="h-5 w-5 text-campus-gold" />
          <h1 className="text-2xl font-bold">Event Voting</h1>
        </section>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="popular">Popular Events</TabsTrigger>
            <TabsTrigger value="voting">Open for Voting</TabsTrigger>
          </TabsList>
          <TabsContent value="popular" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {votedEvents.slice(0, 6).map((event, index) => (
                <Card key={event.id} className={cn(
                  "overflow-hidden transition-all",
                  index === 0 && "border-campus-gold bg-gradient-to-br from-campus-navy to-campus-darkAlt"
                )}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className={cn(
                        "text-lg font-semibold",
                        index === 0 && "text-campus-gold"
                      )}>
                        {index === 0 && "🏆 "}{event.title}
                      </CardTitle>
                      <span className={cn(
                        "text-lg font-bold flex items-center gap-2", 
                        event.votes > 0 ? "text-campus-teal" : 
                        event.votes < 0 ? "text-destructive" : "text-muted-foreground"
                      )}>
                        {event.votes > 0 && '+'}{event.votes}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-muted-foreground">
                      {event.date} • {event.time} • {event.location}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-between">
                      <div className="text-xs">
                        <span className="text-campus-teal font-medium">+{event.resumePoints}</span> 
                        <span className="text-muted-foreground ml-1">resume points</span>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={cn("h-8 w-8", userVotes[event.id] === 'up' ? "text-campus-teal" : "text-muted-foreground")}
                          onClick={() => handleVote(event.id, 'up')}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={cn("h-8 w-8", userVotes[event.id] === 'down' ? "text-destructive" : "text-muted-foreground")}
                          onClick={() => handleVote(event.id, 'down')}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="voting" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {votedEvents.slice(2, 8).map((event) => (
                <Card key={event.id} className="overflow-hidden transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Timer className="h-3 w-3 mr-1" />
                          <span>Voting ends in 3 days</span>
                        </div>
                      </div>
                      <span className={cn(
                        "text-lg font-bold", 
                        event.votes > 0 ? "text-campus-teal" : 
                        event.votes < 0 ? "text-destructive" : "text-muted-foreground"
                      )}>
                        {event.votes > 0 && '+'}{event.votes}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-between items-center">
                      <div className="text-xs">
                        <span className="text-campus-teal font-medium">+{event.resumePoints}</span> 
                        <span className="text-muted-foreground ml-1">points if approved</span>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={cn("h-8 w-8", userVotes[event.id] === 'up' ? "text-campus-teal" : "text-muted-foreground")}
                          onClick={() => handleVote(event.id, 'up')}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className={cn("h-8 w-8", userVotes[event.id] === 'down' ? "text-destructive" : "text-muted-foreground")}
                          onClick={() => handleVote(event.id, 'down')}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Voting;
