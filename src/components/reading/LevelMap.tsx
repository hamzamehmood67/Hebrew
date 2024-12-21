import { motion } from 'framer-motion';
import { Star, Lock, Check } from 'lucide-react';

interface LevelMapProps {
  currentLevel: number;
  levels: Array<{
    id: number;
    name: string;
    description: string;
    requiredXP: number;
    completed: boolean;
    locked: boolean;
    progress: number;
  }>;
}

export function LevelMap({ currentLevel, levels }: LevelMapProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-gray-200" />
      </div>
      
      <div className="relative flex justify-between">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col items-center ${
              level.locked ? 'opacity-50' : ''
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                level.completed
                  ? 'bg-green-500'
                  : currentLevel === level.id
                  ? 'bg-brand-500'
                  : 'bg-gray-200'
              } ${level.locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {level.completed ? (
                <Check className="h-6 w-6 text-white" />
              ) : level.locked ? (
                <Lock className="h-6 w-6 text-gray-500" />
              ) : (
                <Star className="h-6 w-6 text-white" />
              )}
            </div>
            
            <div className="mt-2 text-center">
              <p className="font-semibold">{level.name}</p>
              <p className="text-sm text-gray-500">{level.progress}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}