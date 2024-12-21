import { BookOpen, Globe, MessageCircle, Trophy, Zap, Users, Target, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'From alphabet to advanced conversation, structured learning paths for all levels.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Zap,
    title: 'AI-Powered Learning',
    description: 'Personalized learning experience adapting to your progress and needs.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Users,
    title: 'Community Practice',
    description: 'Connect with native speakers and fellow learners for real conversation practice.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Target,
    title: 'Goal-Based Learning',
    description: 'Set personal goals and track your progress with detailed analytics.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Globe,
    title: 'Modern Hebrew',
    description: 'Learn contemporary Israeli Hebrew used in daily life and business.',
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: Star,
    title: 'Gamified Experience',
    description: 'Earn points, badges, and compete with others while learning.',
    color: 'from-yellow-500 to-amber-500'
  }
];

export function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything You Need to Master Hebrew
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform combines traditional teaching methods with cutting-edge technology
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-brand-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                <div className="relative h-full bg-white p-8 rounded-2xl ring-1 ring-gray-200/50 shadow-lg hover:shadow-xl transition duration-500">
                  <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r rounded-xl shadow-lg mb-6">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}