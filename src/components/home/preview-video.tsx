import { Button } from '../ui/button';
import { Play, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function PreviewVideo() {
  const navigate = useNavigate();

  const handleBrowseLessons = () => {
    navigate('/courses');
  };

  const handleStartLearning = () => {
    navigate('/reading');
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-brand-900">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              Experience Our Method
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Watch how our unique approach makes learning Hebrew natural and enjoyable
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <div className="relative max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative aspect-video bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 to-blue-500/20" />
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Hebrew lesson preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-full w-20 h-20 bg-white text-brand-600 hover:text-white hover:bg-brand-600 transition-colors duration-300"
                  >
                    <Play className="h-10 w-10 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white/20 hover:bg-white/10 group"
                onClick={handleBrowseLessons}
              >
                Browse Free Lessons
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600"
                onClick={handleStartLearning}
              >
                Start Learning Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}