import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Video, Calendar, Users, Star } from 'lucide-react';

const upcomingClasses = [
  {
    title: 'Beginner Conversation Practice',
    instructor: 'Dr. Sarah Cohen',
    time: '10:00 AM GMT',
    date: '2024-03-25',
    duration: '60 min',
    level: 'Beginner',
    spots: 8
  },
  {
    title: 'Hebrew Grammar Workshop',
    instructor: 'Prof. David Levi',
    time: '2:00 PM GMT',
    date: '2024-03-26',
    duration: '90 min',
    level: 'Intermediate',
    spots: 5
  }
];

export default function LiveClassesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Live Online Classes</h1>
          <p className="mt-4 text-xl text-gray-600">
            Interactive Hebrew lessons with expert native speakers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Classes</h2>
              <div className="space-y-6">
                {upcomingClasses.map((class_) => (
                  <motion.div
                    key={class_.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {class_.title}
                        </h3>
                        <p className="text-brand-600 font-medium">{class_.instructor}</p>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            {class_.date} at {class_.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Video className="h-4 w-4 mr-2" />
                            {class_.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-4 w-4 mr-2" />
                            {class_.level}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-2" />
                            {class_.spots} spots left
                          </div>
                        </div>
                      </div>
                      <Button>Book Now</Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Video className="h-4 w-4 mr-2 text-brand-600" />
                  HD video quality
                </li>
                <li className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-brand-600" />
                  Small group sizes (max 8)
                </li>
                <li className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 mr-2 text-brand-600" />
                  Expert native teachers
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Contact our support team for assistance with booking or technical issues.
              </p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}