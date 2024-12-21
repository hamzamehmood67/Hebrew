import { motion } from 'framer-motion';
import { AlignLeft, BookOpen, MessageCircle, Award } from 'lucide-react';

const steps = [
  {
    icon: AlignLeft,
    title: 'Start with the Basics',
    description: 'Master the Hebrew alphabet and basic reading skills through interactive lessons.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: BookOpen,
    title: 'Build Your Vocabulary',
    description: 'Learn essential words and phrases for everyday communication.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: MessageCircle,
    title: 'Practice Speaking',
    description: 'Engage in conversations with native speakers and fellow learners.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Award,
    title: 'Achieve Fluency',
    description: 'Gain confidence and fluency through immersive learning experiences.',
    color: 'from-green-500 to-emerald-500'
  }
];

export function LearningPath() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Path to Hebrew Fluency
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Follow our proven learning path to achieve your language goals
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-brand-500 to-blue-500 rounded-2xl blur opacity-25" />
              <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${step.color} mb-5`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}