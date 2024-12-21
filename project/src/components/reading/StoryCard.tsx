import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Book, Clock } from 'lucide-react';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    content: string;
    level: string;
    estimatedTime: string;
  };
  onStart: (id: string) => void;
}

export function StoryCard({ story, onStart }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-brand-50 rounded-lg">
          <Book className="h-6 w-6 text-brand-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
          <p className="text-sm text-gray-500">Level: {story.level}</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{story.content}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {story.estimatedTime}
        </div>
        <Button onClick={() => onStart(story.id)}>Start Reading</Button>
      </div>
    </motion.div>
  );
}