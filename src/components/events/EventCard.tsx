
import React, { useState } from 'react';
import { Heart, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/services/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isRSVPed, setIsRSVPed] = useState(event.isRSVPed || false);
  const [isSaved, setIsSaved] = useState(event.isSaved || false);
  const [votes, setVotes] = useState(event.votes);
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed);
    if (!isRSVPed) {
      toast.success(`You've RSVP'd for ${event.title}!`, {
        description: `Added ${event.resumePoints} points to your resume booster.`,
      });
    } else {
      toast.info(`Removed RSVP for ${event.title}`);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success(`Saved ${event.title} to your collection!`);
    } else {
      toast.info(`Removed ${event.title} from your collection`);
    }
  };

  const handleVote = (direction: 'up' | 'down') => {
    if (hasVoted === direction) {
      // Unvote
      setVotes(direction === 'up' ? votes - 1 : votes + 1);
      setHasVoted(null);
    } else if (hasVoted === null) {
      // New vote
      setVotes(direction === 'up' ? votes + 1 : votes - 1);
      setHasVoted(direction);
    } else {
      // Change vote direction (from down to up or vice versa)
      setVotes(direction === 'up' ? votes + 2 : votes - 2);
      setHasVoted(direction);
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(107,70,193,0.3)] group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-campus-navy/90 to-transparent" />
        <div className="absolute bottom-4 left-4 bg-campus-purple text-white px-3 py-1 rounded-full text-xs font-medium">
          {event.category}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("absolute top-3 right-3 text-white hover:text-campus-gold transition-colors", 
            isSaved ? "text-campus-gold" : "text-white")}
          onClick={handleSave}
        >
          <Heart className={cn("h-5 w-5", isSaved ? "fill-campus-gold" : "")} />
        </Button>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{event.title}</h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
          </div>
          <div className="flex flex-col items-center gap-1 ml-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-6 w-6", hasVoted === 'up' ? "text-campus-teal" : "text-muted-foreground")}
              onClick={() => handleVote('up')}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="text-xs font-medium">{votes}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-6 w-6", hasVoted === 'down' ? "text-destructive" : "text-muted-foreground")}
              onClick={() => handleVote('down')}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)} • {event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <span className="i-lucide-map-pin h-4 w-4" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className="text-xs">
              <span className="text-campus-teal font-medium">+{event.resumePoints}</span> 
              <span className="text-muted-foreground ml-1">resume points</span>
            </div>
          </div>
          <Button 
            onClick={handleRSVP} 
            variant={isRSVPed ? "secondary" : "default"}
            className={cn(
              "transition-all",
              !isRSVPed && "bg-gradient-to-r from-campus-purple to-campus-teal hover:opacity-90"
            )}
          >
            {isRSVPed ? 'Attending' : 'RSVP'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
