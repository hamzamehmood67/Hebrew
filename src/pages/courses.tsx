import { motion } from 'framer-motion';
import { Clock, Globe, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
}

const courses: Course[] = [
  {
    id: 'beginner',
    title: 'Beginner Hebrew',
    description: 'Start your Hebrew journey with basic vocabulary and simple sentences.',
    level: 'Beginner',
    duration: '3 months',
    students: 1234,
    rating: 4.8,
    image: '/courses/beginner.jpg'
  },
  {
    id: 'intermediate',
    title: 'Intermediate Hebrew',
    description: 'Build your confidence with more complex sentences and conversations.',
    level: 'Intermediate',
    duration: '4 months',
    students: 856,
    rating: 4.9,
    image: '/courses/intermediate.jpg'
  },
  {
    id: 'advanced',
    title: 'Advanced Hebrew',
    description: 'Master Hebrew with advanced grammar, idioms, and cultural context.',
    level: 'Advanced',
    duration: '6 months',
    students: 432,
    rating: 4.7,
    image: '/courses/advanced.jpg'
  }
];

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${course.image})` }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{course.level}</span>
                </div>
              </div>

              <Button className="w-full" variant="primary">
                Start Learning
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}