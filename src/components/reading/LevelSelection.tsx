import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { BookOpen, Star, Trophy } from 'lucide-react';
import { readingLevels } from '@/data/reading-content';

interface LevelSelectionProps {
  onSelectLevel: (levelId: string) => void;
  userLevel: number;
}

export function LevelSelection({ onSelectLevel, userLevel }: LevelSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {readingLevels.map((level, index) => (
        <motion.div
          key={level.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
          <div className="relative bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-brand-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{level.title}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">Level {index + 1}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{level.description}</p>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Trophy className="h-4 w-4 mr-2" />
                {level.stories.length} stories available
              </div>

              <Button
                onClick={() => onSelectLevel(level.id)}
                disabled={index + 1 > userLevel}
                className="w-full"
              >
                {index + 1 > userLevel ? 'Locked' : 'Start Reading'}
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}