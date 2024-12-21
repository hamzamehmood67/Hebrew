import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export function CultureSection() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Immerse Yourself in Israeli Culture
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Learning Hebrew is more than just language acquisition. Discover the rich traditions,
              modern lifestyle, and vibrant culture of Israel through our comprehensive cultural
              program.
            </p>
            <div className="space-y-4">
              {[
                'Virtual tours of Israeli cities',
                'Traditional and modern music workshops',
                'Israeli cooking classes',
                'Holiday celebrations and customs',
                'Contemporary Israeli media and entertainment'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-brand-500 mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </motion.div>
              ))}
            </div>
            <Button className="mt-8">Explore Cultural Programs</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl blur-xl opacity-25" />
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544207240-42895ede7c76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Israeli culture"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}