import { motion } from 'framer-motion';
import { Users, Award, Globe, BookOpen } from 'lucide-react';

const stats = [
  {
    label: 'Active Students',
    value: '50,000+',
    icon: Users,
    description: 'Learning worldwide'
  },
  {
    label: 'Success Rate',
    value: '94%',
    icon: Award,
    description: 'Student satisfaction'
  },
  {
    label: 'Native Teachers',
    value: '100+',
    icon: Globe,
    description: 'Expert instructors'
  },
  {
    label: 'Course Hours',
    value: '1,000+',
    icon: BookOpen,
    description: 'Learning content'
  }
];

export function Stats() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg border border-gray-100 bg-white p-8 shadow-lg"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 bg-gradient-to-br from-brand-100 to-brand-50 opacity-20 blur-2xl" />
                <stat.icon className="h-8 w-8 text-brand-600 mb-4" />
                <p className="text-4xl font-bold tracking-tight text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-700">{stat.label}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}