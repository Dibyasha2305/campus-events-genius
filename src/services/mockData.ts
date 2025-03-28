
import { Calendar, Vote, Star, Image, Heart, Edit } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  tags: string[];
  image: string;
  votes: number;
  attendees: number;
  isRSVPed?: boolean;
  isSaved?: boolean;
  resumePoints?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export const categories: Category[] = [
  { id: '1', name: 'All Events', icon: Calendar, color: 'bg-campus-purple' },
  { id: '2', name: 'Popular', icon: Vote, color: 'bg-campus-gold' },
  { id: '3', name: 'Recommended', icon: Star, color: 'bg-campus-teal' },
  { id: '4', name: 'Design', icon: Image, color: 'bg-pink-500' },
  { id: '5', name: 'Saved', icon: Heart, color: 'bg-red-500' },
  { id: '6', name: 'Feedback', icon: Edit, color: 'bg-blue-500' },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Career Fair 2024',
    description: 'Connect with top tech companies and startups looking to hire students for internships and full-time positions.',
    date: '2024-06-15',
    time: '10:00 AM - 3:00 PM',
    location: 'Student Union Building',
    organizer: 'Campus Career Center',
    category: 'Career',
    tags: ['tech', 'career', 'networking'],
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&w=500&q=60',
    votes: 156,
    attendees: 450,
    resumePoints: 50
  },
  {
    id: '2',
    title: 'AI Research Symposium',
    description: 'Join leading researchers and faculty for presentations on cutting-edge AI technologies and applications.',
    date: '2024-05-20',
    time: '9:00 AM - 5:00 PM',
    location: 'Engineering Building Auditorium',
    organizer: 'Computer Science Department',
    category: 'Academic',
    tags: ['ai', 'research', 'technology'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&w=500&q=60',
    votes: 89,
    attendees: 200,
    resumePoints: 75
  },
  {
    id: '3',
    title: 'Spring Music Festival',
    description: 'Annual outdoor music festival featuring student bands and professional musicians across multiple genres.',
    date: '2024-04-28',
    time: '4:00 PM - 10:00 PM',
    location: 'Campus Quad',
    organizer: 'Student Activities Board',
    category: 'Entertainment',
    tags: ['music', 'festival', 'outdoor'],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&w=500&q=60',
    votes: 214,
    attendees: 1200,
    resumePoints: 15
  },
  {
    id: '4',
    title: 'Sustainability Workshop',
    description: 'Learn practical ways to reduce your environmental impact and help make our campus more sustainable.',
    date: '2024-05-05',
    time: '2:00 PM - 4:00 PM',
    location: 'Environmental Sciences Building',
    organizer: 'Campus Sustainability Office',
    category: 'Workshop',
    tags: ['environment', 'sustainability', 'workshop'],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&w=500&q=60',
    votes: 67,
    attendees: 120,
    resumePoints: 35
  },
  {
    id: '5',
    title: 'Hackathon 2024',
    description: '48-hour coding competition to build innovative solutions to real-world problems. Open to all skill levels.',
    date: '2024-06-02',
    time: '5:00 PM (48 hours)',
    location: 'Innovation Center',
    organizer: 'CS Club & Tech Sponsors',
    category: 'Technology',
    tags: ['coding', 'hackathon', 'competition'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&w=500&q=60',
    votes: 183,
    attendees: 350,
    resumePoints: 100
  },
  {
    id: '6',
    title: 'International Food Festival',
    description: 'Sample cuisines from around the world prepared by international student organizations.',
    date: '2024-05-12',
    time: '11:00 AM - 3:00 PM',
    location: 'Campus Dining Hall',
    organizer: 'International Student Association',
    category: 'Cultural',
    tags: ['food', 'international', 'cultural'],
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&w=500&q=60',
    votes: 128,
    attendees: 550,
    resumePoints: 20
  },
];

export const recommendedEvents = [
  {
    id: '5',
    title: 'Hackathon 2024',
    reason: 'Based on your interest in coding events'
  },
  {
    id: '2',
    title: 'AI Research Symposium',
    reason: 'Popular with Computer Science students'
  },
  {
    id: '4',
    title: 'Sustainability Workshop',
    reason: 'You attended similar workshops'
  }
];

export const userStats = {
  eventsAttended: 12,
  resumePoints: 320,
  savedEvents: 5,
  votedEvents: 8,
  badges: ['Tech Enthusiast', 'Volunteer Star', 'Networking Pro']
};

export const feedbackQuestions = [
  "How satisfied were you with this event?",
  "Was the event well-organized?",
  "Would you recommend this event to other students?",
  "What could be improved for future events?"
];
