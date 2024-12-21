import { Star, Award, Heart, Users, Calendar, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

const teachers = [
  {
    name: 'Dr. Sarah Cohen',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specialties: ['Modern Hebrew', 'Biblical Hebrew'],
    rating: 4.9,
    students: 1240,
    experience: '15+ years',
    bio: 'PhD in Hebrew Literature from Hebrew University of Jerusalem. Specialized in modern conversational Hebrew.'
  },
  {
    name: 'Prof. David Levi',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specialties: ['Business Hebrew', 'Academic Hebrew'],
    rating: 4.8,
    students: 890,
    experience: '12+ years',
    bio: 'Former lecturer at Tel Aviv University. Expert in business Hebrew and academic writing.'
  },
  {
    name: 'Maya Shapiro',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    specialties: ['Conversational Hebrew', 'Hebrew Culture'],
    rating: 4.9,
    students: 1560,
    experience: '10+ years',
    bio: 'Native Israeli teacher specializing in immersive conversation practice and cultural education.'
  }
];

export function TeachersSection() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Learn from Native Israeli Teachers
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our certified teachers bring decades of experience and authentic Israeli culture to your learning journey
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{teacher.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">{teacher.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-600">{teacher.bio}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {teacher.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {teacher.students} students
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          {teacher.experience}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-brand-500 to-blue-500">
                        Book a Lesson
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Video,
                  title: 'Live Online Classes',
                  description: 'Interactive sessions with real-time feedback'
                },
                {
                  icon: Calendar,
                  title: 'Flexible Scheduling',
                  description: 'Book lessons that fit your timezone'
                },
                {
                  icon: Heart,
                  title: 'Personalized Attention',
                  description: 'Custom learning plans for your goals'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-brand-100 rounded-xl text-brand-600 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}