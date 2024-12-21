import { motion } from 'framer-motion';
import { Zap, Users, Target, Star, Clock, Video } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Proven Methodology',
    description: 'Our structured approach combines traditional teaching methods with modern technology.'
  },
  {
    icon: Users,
    title: 'Expert Teachers',
    description: 'Learn from certified native Hebrew speakers with years of teaching experience.'
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Adaptive learning paths that adjust to your progress and goals.'
  },
  {
    icon: Star,
    title: 'Quality Content',
    description: 'Carefully crafted lessons and materials for optimal learning outcomes.'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace with 24/7 access to course materials.'
  },
  {
    icon: Video,
    title: 'Interactive Sessions',
    description: 'Engage in live classes and practice sessions with fellow learners.'
  }
];

export function WhyChooseUs() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose HebrewLearn?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the most effective way to master Hebrew
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
              <div className="relative h-full bg-white p-8 rounded-xl shadow-lg">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-brand-500 to-blue-500 rounded-lg shadow-lg mb-6">
                  <reason.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}