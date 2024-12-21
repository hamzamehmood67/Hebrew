import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Clock } from 'lucide-react';

const discussions = [
  {
    title: 'Tips for learning Hebrew verb forms',
    author: 'Sarah Cohen',
    replies: 15,
    views: 234,
    lastActivity: '2 hours ago'
  },
  {
    title: 'Best resources for Biblical Hebrew',
    author: 'David Levi',
    replies: 8,
    views: 156,
    lastActivity: '5 hours ago'
  },
  {
    title: 'Modern Hebrew slang discussion',
    author: 'Maya Shapiro',
    replies: 23,
    views: 312,
    lastActivity: '1 hour ago'
  }
];

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Community Forum</h1>
          <p className="mt-4 text-xl text-gray-600">
            Join discussions with fellow Hebrew learners
          </p>
        </motion.div>

        <div className="flex justify-end mb-6">
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
        </div>

        <div className="space-y-4">
          {discussions.map((discussion, index) => (
            <motion.div
              key={discussion.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {discussion.title}
                  </h3>
                  <p className="text-sm text-gray-500">Started by {discussion.author}</p>
                </div>
                <Button variant="outline">View Discussion</Button>
              </div>

              <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {discussion.replies} replies
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {discussion.views} views
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {discussion.lastActivity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}