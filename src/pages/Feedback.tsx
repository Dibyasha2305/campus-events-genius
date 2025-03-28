
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { events, feedbackQuestions } from '@/services/mockData';
import { Edit, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Feedback = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleRating = (eventId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [eventId]: rating }));
  };

  const handleComment = (eventId: string, comment: string) => {
    setComments(prev => ({ ...prev, [eventId]: comment }));
  };

  const handleSubmit = (eventId: string) => {
    toast.success('Feedback submitted successfully!');
    // Reset form for this event
    setSelectedEvent(null);
    setRatings(prev => ({ ...prev, [eventId]: 0 }));
    setComments(prev => ({ ...prev, [eventId]: '' }));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="flex items-center gap-2">
          <Edit className="h-5 w-5 text-blue-500" />
          <h1 className="text-2xl font-bold">Event Feedback</h1>
        </section>

        <p className="text-muted-foreground">
          Your feedback helps improve future campus events
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
              </CardHeader>
              
              <CardContent>
                {selectedEvent === event.id ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">How would you rate this event?</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRating(event.id, rating)}
                            className={`h-8 w-8 ${ratings[event.id] === rating ? 'text-campus-gold' : 'text-muted-foreground'}`}
                          >
                            <Star className={`h-5 w-5 ${ratings[event.id] >= rating ? 'fill-campus-gold' : ''}`} />
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Any additional comments?</p>
                      <Textarea
                        placeholder="Share your thoughts..."
                        value={comments[event.id] || ''}
                        onChange={(e) => handleComment(event.id, e.target.value)}
                        className="resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">{event.description.substring(0, 100)}...</p>
                )}
              </CardContent>
              
              <CardFooter>
                {selectedEvent === event.id ? (
                  <Button 
                    onClick={() => handleSubmit(event.id)}
                    className="w-full bg-gradient-to-r from-campus-purple to-campus-purpleLight hover:opacity-90"
                    disabled={!ratings[event.id]}
                  >
                    <Send className="h-4 w-4 mr-2" /> Submit Feedback
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedEvent(event.id)}
                    className="w-full"
                  >
                    <Edit className="h-4 w-4 mr-2" /> Give Feedback
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Feedback;
