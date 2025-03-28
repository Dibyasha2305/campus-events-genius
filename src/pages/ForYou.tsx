
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { events, recommendedEvents } from '@/services/mockData';
import { Sparkles } from 'lucide-react';

const ForYou = () => {
  // Filter events based on recommended event IDs
  const recommendedEventsList = events.filter(event => 
    recommendedEvents.some(rec => rec.id === event.id)
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-campus-gold" />
            <h1 className="text-2xl font-bold">Recommended For You</h1>
          </div>
          <p className="text-muted-foreground">
            Events tailored to your interests and past attendance
          </p>
        </section>

        {recommendedEventsList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedEventsList.map((event) => (
                <div key={event.id} className="space-y-2">
                  <EventCard event={event} />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-campus-teal">Why this is recommended:</span> {" "}
                    {recommendedEvents.find(rec => rec.id === event.id)?.reason}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No recommendations yet</h3>
            <p className="text-muted-foreground">
              Attend more events to get personalized recommendations
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ForYou;
