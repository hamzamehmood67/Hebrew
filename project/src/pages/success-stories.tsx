import { motion } from 'framer-motion';
import { Star, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stories = [
  {
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'From Beginner to Business Fluent',
    story: 'I started learning Hebrew for business opportunities in Tel Aviv. Within a year, I was able to conduct meetings entirely in Hebrew. The structured curriculum and amazing teachers made all the difference.',
    achievement: 'Now leading a tech team in Israel',
    duration: '12 months'
  },
  {
    name: 'Sarah Thompson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Connecting with Heritage',
    story: 'Learning Hebrew helped me connect with my Jewish heritage in ways I never imagined. The cultural insights and supportive community made the journey special.',
    achievement: 'Reading Torah at synagogue',
    duration: '18 months'
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Success Stories</h1>
          <p className="mt-4 text-xl text-gray-600">
            Real stories from our students who achieved their Hebrew learning goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                    <p className="text-brand-600 font-medium">{story.title}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">"{story.story}"</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Award className="h-5 w-5 mr-2 text-brand-600" />
                    {story.achievement}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-5 w-5 mr-2 text-brand-600" />
                    {story.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-gray-600">
            Ready to start your own success story?
          </p>
          <Button size="lg" className="mt-4">
            Begin Your Journey
          </Button>
        </motion.div>
      </div>
    </div>
  );
}