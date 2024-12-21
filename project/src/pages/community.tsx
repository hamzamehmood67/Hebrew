import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Calendar, MessageSquare, Video } from 'lucide-react';

const upcomingEvents = [
  {
    title: 'Hebrew Conversation Club',
    date: '2024-03-25',
    time: '18:00 GMT',
    type: 'Virtual Meetup',
    participants: 12
  },
  {
    title: 'Israeli Culture Workshop',
    date: '2024-03-28',
    time: '19:00 GMT',
    type: 'Live Workshop',
    participants: 25
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Hebrew Learning Community</h1>
          <p className="mt-4 text-xl text-gray-600">
            Connect with fellow learners and practice your Hebrew in a supportive environment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.title}
                    className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date} at {event.time}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          {event.participants} participants
                        </div>
                      </div>
                      <Button>Join Event</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Button className="w-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Join Discussion Forum
                </Button>
                <Button className="w-full flex items-center justify-center" variant="outline">
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Chat
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Conversations</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Language Partners</span>
                  <span className="font-semibold">456</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}