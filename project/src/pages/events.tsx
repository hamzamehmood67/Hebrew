import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const events = [
  {
    title: 'Hebrew Culture Workshop',
    date: '2024-03-25',
    time: '18:00 GMT',
    location: 'Online',
    type: 'Virtual Workshop',
    description: 'Explore Israeli culture, traditions, and modern lifestyle.',
    speaker: 'Dr. Sarah Cohen',
    participants: 45,
    maxParticipants: 50
  },
  {
    title: 'Conversation Practice Group',
    date: '2024-03-28',
    time: '19:00 GMT',
    location: 'Online',
    type: 'Group Session',
    description: 'Practice Hebrew conversation skills in a supportive group environment.',
    speaker: 'Maya Shapiro',
    participants: 12,
    maxParticipants: 15
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="mt-4 text-xl text-gray-600">
            Join our community events and enhance your Hebrew learning experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700">
                        {event.type}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-gray-900">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.participants}/{event.maxParticipants} participants
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Hosted by {event.speaker}
                    </div>
                    <Button>Register Now</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Event Categories
              </h3>
              <div className="space-y-2">
                {[
                  'Workshops',
                  'Conversation Groups',
                  'Cultural Events',
                  'Guest Speakers',
                  'Study Groups'
                ].map((category) => (
                  <div
                    key={category}
                    className="p-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-brand-50 hover:text-brand-700 cursor-pointer transition-colors"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Host an Event
              </h3>
              <p className="text-gray-600 mb-4">
                Share your knowledge and experience with the community.
              </p>
              <Button variant="outline" className="w-full">
                Submit Proposal
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}