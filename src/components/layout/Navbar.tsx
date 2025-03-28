
import React from 'react';
import { Bell, Calendar, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-campus-navy/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-campus-purple to-campus-teal p-1.5">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gradient">Campus<span className="font-normal">Events</span>Genius</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search events..."
              className="h-9 w-[200px] lg:w-[300px] rounded-md bg-secondary/50 border-0 pl-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-campus-purple"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-campus-purple text-[10px] font-medium flex items-center justify-center text-white">3</span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <Button className="bg-gradient-to-r from-campus-purple to-campus-purpleLight hover:opacity-90 transition-opacity">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
