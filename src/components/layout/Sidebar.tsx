
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Star, User, Vote, Image, Edit, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  icon: React.ElementType;
  to: string;
  active?: boolean;
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Events', icon: Calendar, to: '/', active: true },
    { label: 'For You', icon: Star, to: '/for-you' },
    { label: 'Saved', icon: Heart, to: '/saved' },
    { label: 'Voting', icon: Vote, to: '/voting' },
    { label: 'Posters', icon: Image, to: '/posters' },
    { label: 'Feedback', icon: Edit, to: '/feedback' },
    { label: 'Profile', icon: User, to: '/profile' },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-full bg-campus-darkAlt/80 backdrop-blur-md flex flex-col border-r border-white/10">
        <div className="p-4 flex-1">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  item.active 
                    ? "bg-campus-purple/20 text-campus-purpleLight" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="m-4 self-end"
        >
          {collapsed ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
