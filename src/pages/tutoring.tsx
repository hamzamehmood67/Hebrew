import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Globe, Star, Book, MessageCircle, Calendar } from 'lucide-react';

const tutors = [
  {
    name: 'Dr. Sarah Cohen',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specialties: ['Modern Hebrew', 'Biblical Hebrew'],
    rating: 4.9,
    price: 45,
    availability: 'Mon-Fri, 9AM-5PM GMT'
  },
  {
    name: 'Prof. David Levi',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specialties: ['Business Hebrew', 'Academic Hebrew'],
    rating: 4.8,
    price: 50,
    availability: 'Tue-Sat, 2PM-10PM GMT'
  }
];

export default function TutoringPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Private Hebrew Tutoring</h1>
          <p className="mt-4 text-xl text-gray-600">
            One-on-one lessons tailored to your learning style and goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {tutors.map((tutor, index) => (
                <motion.div
                  key={tutor.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
                          <div className="flex items-center mt-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="ml-1 font-semibold">{tutor.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${tutor.price}</p>
                          <p className="text-sm text-gray-500">per hour</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {tutor.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {tutor.availability}
                        </div>

                        <div className="flex gap-4">
                          <Button className="flex-1">Book Trial Lesson</Button>
                          <Button variant="outline" className="flex-1">View Profile</Button>
                        </div>
                      </div>
                    </div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Private Tutoring?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-brand-600 shrink-0" />
                  <span className="text-gray-600">Flexible scheduling that fits your timezone</span>
                </li>
                <li className="flex items-start">
                  <Book className="h-5 w-5 mr-3 text-brand-600 shrink-0" />
                  <span className="text-gray-600">Customized lesson plans and materials</span>
                </li>
                <li className="flex items-start">
                  <MessageCircle className="h-5 w-5 mr-3 text-brand-600 shrink-0" />
                  <span className="text-gray-600">Direct feedback and conversation practice</span>
                </li>
                <li className="flex items-start">
                  <Globe className="h-5 w-5 mr-3 text-brand-600 shrink-0" />
                  <span className="text-gray-600">Learn from anywhere in the world</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Choosing?</h3>
              <p className="text-gray-600 mb-4">
                Schedule a free consultation to find the perfect tutor for your needs.
              </p>
              <Button variant="outline" className="w-full">Schedule Consultation</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}