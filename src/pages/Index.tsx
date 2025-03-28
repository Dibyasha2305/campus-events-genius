
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { mockEvents } from '@/services/mockData';
import { Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'popular'>('all');
  
  const filteredEvents = () => {
    switch (filter) {
      case 'upcoming':
        return mockEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'popular':
        return mockEvents.sort((a, b) => b.votes - a.votes);
      default:
        return mockEvents;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden bg-hero-pattern bg-cover bg-center h-64 flex flex-col justify-center p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover <span className="text-gradient">Campus Events</span> That <br />Match Your Interests
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              AI-powered recommendations for your academic journey
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-gradient-to-r from-campus-purple to-campus-teal hover:opacity-90">
                <Calendar className="mr-2 h-5 w-5" /> Browse Events
              </Button>
              <Button size="lg" variant="secondary">
                <Sparkles className="mr-2 h-5 w-5" /> For You
              </Button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            onClick={() => setFilter('all')}
            className={filter === 'all' ? "bg-gradient-to-r from-campus-purple to-campus-teal hover:opacity-90" : ""}
          >
            All Events
          </Button>
          <Button 
            variant={filter === 'upcoming' ? "default" : "outline"} 
            onClick={() => setFilter('upcoming')}
            className={filter === 'upcoming' ? "bg-gradient-to-r from-campus-purple to-campus-teal hover:opacity-90" : ""}
          >
            Upcoming
          </Button>
          <Button 
            variant={filter === 'popular' ? "default" : "outline"} 
            onClick={() => setFilter('popular')}
            className={filter === 'popular' ? "bg-gradient-to-r from-campus-purple to-campus-teal hover:opacity-90" : ""}
          >
            Popular
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents().map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
