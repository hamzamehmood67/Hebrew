import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Story } from '@/types/reading';

interface StoryProgressProps {
  story: Story;
  progress: number;
}

export function StoryProgress({ story, progress }: StoryProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Star className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-xl font-bold">{story.title}</h3>
        </div>
        <span className="text-sm text-gray-600">
          {progress}% Complete
        </span>
      </div>

      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-full bg-brand-500"
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Difficulty:</span> {story.difficulty}
        </div>
        <div>
          <span className="font-medium">Time:</span> {story.estimatedTime}
        </div>
        <div>
          <span className="font-medium">Points:</span> {story.points}
        </div>
        <div>
          <span className="font-medium">Questions:</span> {story.questions.length}
        </div>
      </div>
    </div>
  );
}