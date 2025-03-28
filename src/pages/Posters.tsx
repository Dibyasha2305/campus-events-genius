
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { events } from '@/services/mockData';
import { Image, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

const Posters = () => {
  const handleDownload = (eventTitle: string) => {
    toast.success(`Poster for "${eventTitle}" downloaded`);
  };

  const handleShare = (eventTitle: string) => {
    toast.success(`Sharing link for "${eventTitle}" copied to clipboard`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="flex items-center gap-2">
          <Image className="h-5 w-5 text-pink-500" />
          <h1 className="text-2xl font-bold">Event Posters</h1>
        </section>
        
        <p className="text-muted-foreground">
          Download and share posters for upcoming events on campus
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{event.date} • {event.time}</p>
                  <p className="text-white/80 text-sm">{event.location}</p>
                </div>
              </div>
              <CardFooter className="flex gap-2 justify-between p-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownload(event.title)}
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleShare(event.title)}
                >
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Posters;
