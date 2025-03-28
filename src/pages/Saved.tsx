
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { events } from '@/services/mockData';
import { BookmarkCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Saved = () => {
  // Start with some mock saved events
  const [savedEvents, setSavedEvents] = useState(
    events.filter((_, index) => index % 3 === 0).map(event => ({...event, isSaved: true}))
  );

  const handleRemoveAll = () => {
    setSavedEvents([]);
    toast.success('Cleared all saved events');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="h-5 w-5 text-campus-purple" />
            <h1 className="text-2xl font-bold">Saved Events</h1>
          </div>

          {savedEvents.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRemoveAll}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear All
            </Button>
          )}
        </section>

        {savedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No saved events</h3>
            <p className="text-muted-foreground">
              Save events by clicking the heart icon on any event card
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Saved;
