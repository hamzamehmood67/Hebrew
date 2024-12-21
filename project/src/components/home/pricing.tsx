import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for beginners',
    features: [
      'Basic Hebrew alphabet lessons',
      'Common phrases practice',
      'Limited vocabulary exercises',
      'Community forum access'
    ]
  },
  {
    name: 'Essential',
    price: '$99',
    description: 'Most popular choice',
    features: [
      'All Starter features',
      'Complete beginner course',
      'Interactive pronunciation tools',
      'Progress tracking',
      'Weekly live group sessions'
    ]
  },
  {
    name: 'Professional',
    price: '$199',
    description: 'For serious learners',
    features: [
      'All Essential features',
      'Advanced grammar courses',
      'Business Hebrew modules',
      'One-on-one tutoring (2hrs/month)',
      'Certification preparation'
    ]
  },
  {
    name: 'Ultimate',
    price: '$299',
    description: 'Full immersion experience',
    features: [
      'All Professional features',
      'Unlimited one-on-one tutoring',
      'Cultural workshops',
      'Native speaker conversation practice',
      'Custom learning path',
      'Priority support'
    ]
  }
];

export function Pricing() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Flexible plans for every level of commitment
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  {tier.price !== 'Free' && <span className="ml-1 text-xl font-semibold text-gray-500">/mo</span>}
                </p>
                <p className="mt-2 text-gray-500">{tier.description}</p>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={tier.name === 'Essential' ? 'primary' : 'outline'}
                className="mt-8 w-full"
                size="lg"
              >
                {tier.price === 'Free' ? 'Start Learning' : 'Subscribe Now'}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            All plans include access to our mobile app and learning resources
          </p>
        </div>
      </div>
    </div>
  );
}